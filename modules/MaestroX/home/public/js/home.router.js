(function (Home) {
    "use strict";

    Home.Router = Maestro.Router.extend({
        routes: {
            "": "index",
        },

        index: function () {
            var setup = {
                layout: "",
                views: [
                
                ]
            };

            _.each(setup.views, function (view, index) {
                console.log(index, view);
            });
        }
    });

})(Maestro.Module.register("home"));
