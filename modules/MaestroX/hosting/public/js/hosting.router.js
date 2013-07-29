(function (Hosting) {
    "use strict";

    Hosting.Router = Maestro.Router.extend({
        routes: {
            "": "index",
        },

        index: function () {
            var setup = {
                views: [
                    new Hosting.View.List()
                ]
            };

            _.each(setup.views, function (view, index) {
                view.serialize();
            });
        }
    });

})(Maestro.Module.register("hosting"));
