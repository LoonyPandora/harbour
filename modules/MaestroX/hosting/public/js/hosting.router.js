(function (Hosting) {
    "use strict";

    Hosting.Router = Maestro.Router.extend({
        routes: {
            "hosting": "index",
        },

        index: function () {
            var setup = {
                views: [
                    new Hosting.View.List(),
                    new Hosting.View.AddButton(),
                    new Hosting.View.Header(),
                    new Hosting.View.SubNav({ section: "dns" })
                ]
            };

            _.each(setup.views, function (view, index) {
                view.serialize();
            });
        }
    });

})(Maestro.Module.register("hosting"));
