(function (Hosting) {
    "use strict";

    Hosting.Router = Maestro.Router.extend({
        routes: {
            "": "index",
        },

        index: function () {
            var setup = {
                views: [
                    new Hosting.View.List(),
                    new Hosting.View.Header(),
                    new Hosting.View.AddButton()
                ]
            };

            _.each(setup.views, function (view, index) {
                view.serialize();
            });
        }
    });

})(Maestro.Module.register("hosting"));
