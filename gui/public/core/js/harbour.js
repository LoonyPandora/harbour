(function () {
    "use strict";

    // The top-level namespace. All public Harbour classes and modules will be attached to this.
    this.Harbour = {};

    // Extend the default Backbone Router / View / Model / Collection
    Harbour.Router = Backbone.Router.extend({
        before: function () {
            // Render things that aren't part of a layout
            var WebUI = Harbour.Module.get("webui");
            var view = new WebUI.View.ModuleList()

            view.serialize();
        },

        after: function () { },

        route: function (route, name, callback) {
            var originalRoute = Backbone.Router.prototype.route;

            if (!_.isRegExp(route)) {
                route = this._routeToRegExp(route);
            }

            if (_.isFunction(name)) {
                callback = name;
                name = "";
            }

            if (!callback) {
                callback = this[name];
            }

            return originalRoute.call(this, route, name, function () {
                this.before();
                callback.apply(this, arguments);
                this.after();
            });
        }

    });

    Harbour.View = Backbone.View.extend({
        initialize: function (options) {
            var view = this;

            // Remove any delegated events for new instances of a view
            $(view.$el.selector).off();
            $(view.$el.selector).children().off();

            _.extend(view, options);

            // If there is no layout (e.g it's a session-based view) - just skip it.
            // We need to return a resolved promise to make it look like we returned a layou
            if (!view.Mixin.layout) {
                var dfd = new jQuery.Deferred();
                dfd.resolve();
                view.layoutReady = dfd.promise();
                return;
            }

            // Fetch the layout as early as possible, and pass a promise so
            // we don't try to render a view before the layout is in the DOM
            view.layoutReady = Harbour.Template.fetch(view.Mixin.layout, function (tmpl) {
                // FIXME: Make this only insert when changing modules and not hardcoded
                if ($("#panel-" + view.Mixin.module).length === 0) {
                    $(tmpl({
                        module: view.Mixin.module
                    })).css({ y: "-100%"})
                       .insertAfter("#module-list")
                       .transition({ y: 0 }, 750, "easeInOutCubic");

                    $(".view", "#panel-" + view.Mixin.module).spin({
                        color: "rgba(44,62,80,0.6)",
                        width: 4,
                        length: 8,
                        radius: 8,
                        hwaccel: true
                    });

                    // FIXME: Don't hardcode this
                    // $("#panel-domain").transition({ y: "100%" }, 750, "easeInOutCubic");
                }
            });
        },

        // Called AFTER the view is rendered and the DOM is ready again
        // Can be overridden by the individual view
        after: function () {
            var view = this;
        },


        render: function (options) {
            var view = this;
            options = options || {};

            // FIXME: This is probably really slow. Due to the element not being in the DOM
            // When we instantiate the object, backbone removed the el... Hence the reselecting
            function doRender (tmpl) {
                // Wait until the layout has been fetched before we try to DOM insert
                view.layoutReady.done(function () {
                    $(view.$el.selector).html(
                        tmpl(options.json)
                    );

                    // Run the view specific afterRender
                    if (_.isFunction(view.after)) {
                        view.after();
                    }
                });
            }

            // Rended empty string if we have no template and just want to blank the section
            if (!view.template) {
                doRender(function() {
                    $(view.$el.selector).hide(0);
                    return "";
                });
            } else {
                Harbour.Template.fetch(view.template, function (tmpl) {
                    doRender(tmpl);
                    $(view.$el.selector).show(0);
                });
            }

            // Backbone convention
            return view;
        },

        // Munges data into a format we can render. Must override in each view
        // Unless you want to render an empty page of course
        serialize: function () {
            this.render({json:""});
        }
    });

    Harbour.Model = Backbone.Model.extend({ });

    Harbour.Collection = Backbone.Collection.extend({ });

    // Our own Module getters & settings
    Harbour.Module = {
        get: function (module) {
            // Return all modules if no module specified
            if (!module) {
                return Harbour.Module._private;
            }

            // If it has already been created, return it
            if (Harbour.Module._private[module]) {
                return Harbour.Module._private[module];
            }

            // If all else fails, create it.
            Harbour.Module._private[module] = {};
            return Harbour.Module._private[module];
        },

        // FIXME: Close over this, but keep a getter for all modules
        _private: {}
    };

    // Template related functions
    Harbour.Template = {
        fetch: function (path, callback) {
            // Instant synchronous way of getting the template, if it exists in our cache
            if (Harbour.Template._private[path]) {
                var dfd = new jQuery.Deferred();

                dfd.resolve(
                    callback(Harbour.Template._private[path])
                );

                return dfd.promise();
            }

            return $.get(path, function (contents) {
                var tmpl = _.template(contents);
                Harbour.Template._private[path] = tmpl;

                callback(tmpl);
            });
        },

        // Store for our compiled templates
        _private: {}
    };

    // Keep active application instances namespaced under an app object.
    Harbour.App = _.extend({}, Backbone.Events);

    // kick-off all initialization, everything up to this point should be definitions.
    $(function ($) {
        // Shorthand the application namespace
        var app = Harbour.App;

        // Load every module into the main router
        var Router = Backbone.Router.extend({
            initialize: function () {
                // Underscore each is super super slow. Only use it where readability is needed
                // http://jsperf.com/jquery-each-vs-for-loop/234

                // We want to recurse down through each module to add the Meta object
                // This is so we can always know what module we are in, among other things

                // FIXME: This is utterly heinous
                var modules = _.keys(Harbour.Module.get());
                for (var i = 0; i < modules.length; i++) {
                    var module = modules[i];
                    var ModuleData = Harbour.Module.get(module);

                    var subModules = _.keys(Harbour.Module.get(module));
                    for (var j = 0; j < subModules.length; j++) {
                        var submodule = subModules[j];

                        // Can't Mixin to the Mixin...
                        // FIXME: Routers should get mixins too, but are at a different nesting level
                        if (submodule === "Router" || submodule === "Mixin") {
                            continue;
                        }

                        var contents = _.keys(ModuleData[submodule]);
                        for (var x = 0; x < contents.length; x++) {
                            if (ModuleData.Mixin) {
                                ModuleData[submodule][contents[x]] = ModuleData[submodule][contents[x]].extend({
                                    Mixin: _.extend(ModuleData.Mixin, { module: module })
                                });
                            }
                        }
                    }

                    this[module] = new ModuleData.Router();
                }
            }
        });
    
        // Define the master router, which has loaded all sub routers above
        app.router = new Router();
    
        // Trigger the initial route and enable HTML5 History API support
        Backbone.history.start({ pushState: true, root: "/" });
    
        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router.  If the link has a data-bypass
        // attribute, bypass the delegation completely.
        $(document).on("click", "a[href]:not([data-bypass])", function (evt) {
            // Get the absolute anchor href.
            var $this = $(this);
            var href = { prop: $this.prop("href"), attr: $this.attr("href") };

            // Get the absolute root.
            var root = location.protocol + "//" + location.host + "/";

            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop.slice(0, root.length) === root) {
                // Stop the default event to ensure the link will not cause a page refresh.
                evt.preventDefault();

                // `Backbone.history.navigate` is sufficient for all Routers and will
                // trigger the correct events. The Router's internal `navigate` method
                // calls this anyways.  The fragment is sliced from the root.
                Backbone.history.navigate(href.attr, true);
            }
        });
    });

}).call(this);
