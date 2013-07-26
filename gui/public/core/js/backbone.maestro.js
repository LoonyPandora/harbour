(function () {
    "use strict";

    // The top-level namespace. All public Maestro classes and modules will be attached to this.
    this.Maestro = {};

    // Extend the default Backbone Router / View / Model / Collection
    Maestro.Router = Backbone.Router.extend({ });

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

}).call(this);
