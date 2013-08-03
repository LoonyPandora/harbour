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
                    new Hosting.View.AddButton(),
                    new Hosting.View.Header()
                ]
            };

            _.each(setup.views, function (view, index) {
                view.serialize();
            });
        }
    });

})(Maestro.Module.register("hosting"));
