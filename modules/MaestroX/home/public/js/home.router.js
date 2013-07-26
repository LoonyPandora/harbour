(function (Home) {
    "use strict";

    Home.Router = Backbone.Router.extend({
        routes: {
            "": "index",
        },

        index: function () {

        }
    });

})(Maestro.Module.register("home"));
