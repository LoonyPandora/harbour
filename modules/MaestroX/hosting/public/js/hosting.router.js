(function (Hosting) {
    "use strict";

    Hosting.Router = Maestro.Router.extend({
        routes: {
            "": "index",
        },

        module: Hosting.Meta.module,
        layout: "/core/layouts/collection-list.html",

        index: function () {
            var setup = {
                views: [
                    new Hosting.View.List()
                ]
            };

            _.each(setup.views, function (view, index) {
                console.log("Hello");
                view.serialize();
            });
        }
    });

})(Maestro.Module.register("hosting"));
