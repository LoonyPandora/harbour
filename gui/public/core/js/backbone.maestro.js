(function () {
    "use strict";

    // The top-level namespace. All public Maestro classes and modules will be attached to this.
    this.Maestro = {};

    // Extend the default Backbone Router / View / Model / Collection
    Maestro.Router = Backbone.Router.extend({
        initialize: function () {
            // Underscore each is super super slow. Only use it where readability is needed
            // http://jsperf.com/jquery-each-vs-for-loop/234

            // Add each modules router to the main router
            var modules = _.keys(Maestro.Module.get());
            for (var i = 0; i < modules.length; i++) {
                var Home = Maestro.Module.get(modules[i]);
                this[ modules[i] ] = new Home.Router();
            }
        }
    });

    Maestro.View = Backbone.View.extend({ });

    Maestro.Model = Backbone.Model.extend({ });

    Maestro.Collection = Backbone.Collection.extend({ });

    // Our own Module getters & settings
    Maestro.Module = {
        // If no name specified, or it doesn't exist - return all modules
        get: function (name) {
            if (Maestro.Module._privateList[name]) {
                return Maestro.Module._privateList[name];
            }

            return Maestro.Module._privateList;
        },

        register: function (name) {
            // If this module has already been created, return it.
            if (Maestro.Module._privateList[name]) {
                return Maestro.Module._privateList[name];
            }

            // If not, create a blank object and return that
            Maestro.Module._privateList[name] = {};
            return Maestro.Module._privateList[name];
        },

        // FIXME: Close over this, but keep a getter for all modules
        _privateList: {}
    }

    // Keep active application instances namespaced under an app object.
    Maestro.App = _.extend({}, Backbone.Events);


    // kick-off all initialization, everything up to this point should be definitions.
    $(function ($) {
        // Shorthand the application namespace
        var app = Maestro.App;
    
        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        app.router = new Maestro.Router();
    
        // Trigger the initial route and enable HTML5 History API support
        Backbone.history.start({
            pushState: true
        });
    
        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router.  If the link has a data-bypass
        // attribute, bypass the delegation completely.
        $(document).on("click", "a:not([data-bypass])", function (evt) {
            // Get the anchor href and protcol
            var href = $(this).attr("href");
            var protocol = this.protocol + "//";
    
            // Ensure the protocol is not part of URL, meaning its relative.
            if (href && href.slice(0, protocol.length) !== protocol) {
                // Stop the default event to ensure the link will not cause a page refresh.
                evt.preventDefault();

                // This uses the default router defined above, and not any routers
                // that may be placed in modules.  To have this work globally (at the
                // cost of losing all route events) you can change the following line
                // to: Backbone.history.navigate(href, true);
                app.router.navigate(href, true);
            }
        });
    });

}).call(this);
