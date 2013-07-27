(function (Home) {
    "use strict";

    Home.Router = Maestro.Router.extend({
        routes: {
            "": "index",
        },

        index: function () {
            var setup = {
                layout: "/core/layouts/collection-list.html",
                views: [
                    new Home.View.Header()
                ]
            };

            _.each(setup.views, function (view, index) {
                view.initialize();
            });
        }
    });

})(Maestro.Module.register("home"));
