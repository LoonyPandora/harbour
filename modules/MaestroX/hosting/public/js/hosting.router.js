(function (Hosting) {
    "use strict";

    Hosting.Router = Maestro.Router.extend({
        routes: {
            "hosting": "index",
        },

        index: function () {
            _.each([
                new Hosting.View.List(),
                new Hosting.View.AddButton(),
                new Hosting.View.Header(),
                new Hosting.View.SubNav({ section: "dns" })
            ], function (view, index) {
                view.serialize();
            });
        }
    });

})(Maestro.Module.register("hosting"));
