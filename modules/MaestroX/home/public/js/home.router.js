(function (Home) {
    "use strict";

    Home.Router = Maestro.Router.extend({
        routes: {
            "": "index",
        },

        index: function () {
            console.log("index");
        }
    });

})(Maestro.Module.register("home"));
