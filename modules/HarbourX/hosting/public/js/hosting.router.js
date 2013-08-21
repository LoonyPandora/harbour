(function (Hosting) {
    "use strict";

    Hosting.Router = Harbour.Router.extend({
        routes: {
            "hosting": "index",
        },

        index: function () {
            _.each([
                new Hosting.View.List(),
                new Hosting.View.AddButton(),
                new Hosting.View.Header(),
                new Hosting.View.Home(),
                new Hosting.View.ModuleList(),
                new Hosting.View.SubNav({ section: "dns" })
            ], function (view, index) {
                view.serialize();
            });
        }
    });

})(Harbour.Module.register("hosting"));
