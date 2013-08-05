(function () {
    "use strict";

    // The top-level namespace. All public Maestro classes and modules will be attached to this.
    this.Maestro = {};

    // Extend the default Backbone Router / View / Model / Collection
    Maestro.Router = Backbone.Router.extend({
        before: function () { },

        after: function () { },

        route: function(route, name, callback) {
            var originalRoute = Backbone.Router.prototype.route;

            if (!_.isRegExp(route)) route = this._routeToRegExp(route);

            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }

            if (!callback) {
                callback = this[name];
            }

            return Backbone.Router.prototype.route.call(this, route, name, function () {
                this.before();
                callback.apply(this, arguments);
                this.after();
            });
        }

    });

    Maestro.View = Backbone.View.extend({
        initialize: function (options) {
            var view = this;

            view.options = options;

            // Fetch the layout as early as possible, and pass a promise so
            // we don't try to render a view before the layout is in the DOM
            view.layoutReady = Maestro.Template.fetch(view.Mixin.layout, function (tmpl) {
                // FIXME: Make this only insert when changing modules and not hardcoded
                if ($("#panel-" + view.Mixin.module).length === 0) {
                    $(tmpl({
                        module: view.Mixin.module
                    })).css({ y: "-100%"})
                       .insertBefore("#panel-domain")
                       .transition({ y: 0 }, 750, 'easeInOutCubic');

                    $(".view", "#panel-" + view.Mixin.module).spin({
                        color: "rgba(44,62,80,0.6)",
                        width: 4,
                        length: 8,
                        radius: 8,
                        hwaccel: true
                    });

                    // FIXME: Don't hardcode this
                    $("#panel-domain").transition({ y: "100%" }, 750, 'easeInOutCubic');
                }
            })
        },

        // Called AFTER the view is rendered and the DOM is ready again
        // Can be overridden by the individual view
        after: function () {
            var view = this;

            // TODO: Cleanup how we do things after render
            $(".canvas-pie-chart", view.$el.selector).easyPieChart({
              animate: 500,
              scaleColor: false,
              lineWidth: 5,
              // rotate: -90,
              lineCap: "round",
              size: 100,
              trackColor: "#bdc3c7",
              barColor: "#2980b9"
            });
        },
        
        
        render: function (options) {
            var view = this;
            options = options || {};

            // FIXME: This is probably really slow. Due to the element not being in the DOM
            // When we instantiate the object, backbone removed the el... Hence the reselecting
            Maestro.Template.fetch(view.template, function (tmpl) {
                // Wait until the layout has been fetched before we try to DOM insert
                view.layoutReady.done(function() {
                    $(view.$el.selector).html(
                        tmpl(options.json)
                    ).css({opacity: 0}).transition({ opacity: 1 }, 200);

                    // Run the view specific afterRender
                    if (_.isFunction(view.after)) {
                        view.after();
                    }
                });
            });

            // Backbone convention
            return view;
        },

        // Munges data into a format we can render. Must override in each view
        serialize: function () { }
    });

    Maestro.Model = Backbone.Model.extend({ });

    Maestro.Collection = Backbone.Collection.extend({
        // For conveinience, if the first argument is a function, treat it as a callback
        // Rather than passing an object with a success function, which will always raise
        // the question of "where is error handling" (answer: it's automagically done)
        fetch: function (options) {
            var collection = this;

            if ( _.isFunction(options) ) {
                var callback = options;
                Backbone.Collection.prototype.fetch.call(collection).done(function () {
                    callback(collection);
                });
            }
        }
    });

    // Our own Module getters & settings
    Maestro.Module = {
        // FIXME: we need a method to check if a module exists
        // If no name specified, or it doesn't exist - return all modules
        get: function (module) {
            if (Maestro.Module._private[module]) {
                return Maestro.Module._private[module];
            }

            return Maestro.Module._private;
        },

        // Registers a module, and all it's routes
        register: function (module) {
            // If this module has already been created, return it so we keep adding to it
            if (Maestro.Module._private[module]) {
                return Maestro.Module._private[module];
            }

            // If not, create a blank object with some meta information, and return that
            Maestro.Module._private[module] = {};
            return Maestro.Module._private[module];
        },

        // FIXME: Close over this, but keep a getter for all modules
        _private: {}
    }

    // Template related functions
    Maestro.Template = {
        fetch: function (path, callback) {
            // Instant synchronous way of getting the template, if it exists in our cache
            if (Maestro.Template._private[path]) {
                return callback(Maestro.Template._private[path]);
            }

            return $.get(path, function (contents) {
                var tmpl = _.template(contents);
                Maestro.Template._private[path] = tmpl;

                callback(tmpl);
            });
        },

        // Store for our compiled templates
        _private: {}
    }

    // Keep active application instances namespaced under an app object.
    Maestro.App = _.extend({}, Backbone.Events);

    // kick-off all initialization, everything up to this point should be definitions.
    $(function ($) {
        // Shorthand the application namespace
        var app = Maestro.App;

        // Load every module into the main router
        var Router = Backbone.Router.extend({
            initialize: function () {
                // Underscore each is super super slow. Only use it where readability is needed
                // http://jsperf.com/jquery-each-vs-for-loop/234

                // We want to recurse down through each module to add the Meta object
                // This is so we can always know what module we are in, among other things
                
                // FIXME: This is utterly heinous
                var modules = _.keys(Maestro.Module.get());
                for (var i = 0; i < modules.length; i++) {
                    var module = modules[i];
                    var ModuleData = Maestro.Module.get(module);

                    var subModules = _.keys(Maestro.Module.get(module));
                    for (var j = 0; j < subModules.length; j++) {
                        var submodule = subModules[j];

                        // Can't Mixin to the Mixin...
                        // FIXME: Routers should get mixins too, but are at a different nesting level
                        if (submodule == "Router" || submodule == "Mixin") {
                            continue;
                        }

                        var contents = _.keys(ModuleData[submodule]);
                        for (var x = 0; x < contents.length; x++) {
                            if (ModuleData.Mixin){
                                ModuleData[submodule][contents[x]] = ModuleData[submodule][contents[x]].extend({
                                    Mixin: _.extend(ModuleData.Mixin, { module: module })
                                });
                            }
                        }
                    };

                    this[ module ] = new ModuleData.Router();
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
        $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
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
