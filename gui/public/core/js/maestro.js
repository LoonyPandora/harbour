(function () {
    "use strict";

    // The top-level namespace. All public Maestro classes and modules will be attached to this.
    this.Maestro = {};

    // Extend the default Backbone Router / View / Model / Collection
    Maestro.Router = Backbone.Router.extend({ });

    Maestro.View = Backbone.View.extend({
        render: function () {
            var view = this;

            

        }
    });

    Maestro.Model = Backbone.Model.extend({ });

    Maestro.Collection = Backbone.Collection.extend({ });

    // Our own Module getters & settings
    Maestro.Module = {
        // If no name specified, or it doesn't exist - return all modules
        get: function (name) {
            if (Maestro.Module._private[name]) {
                return Maestro.Module._private[name];
            }

            return Maestro.Module._private;
        },

        // Registers a module, and all it's routes
        register: function (name) {
            // If this module has already been created, return it.
            if (Maestro.Module._private[name]) {
                return Maestro.Module._private[name];
            }

            // If not, create a blank object and return that
            Maestro.Module._private[name] = {};
            return Maestro.Module._private[name];
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

                callback( tmpl );
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

                var modules = _.keys(Maestro.Module.get());
                for (var i = 0; i < modules.length; i++) {
                    var Module = Maestro.Module.get(modules[i]);
                    this[ modules[i] ] = new Module.Router();
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
