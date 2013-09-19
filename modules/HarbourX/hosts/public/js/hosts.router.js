(function (Hosts) {
    "use strict";

    Hosts.Router = Harbour.Router.extend({
        routes: {
            "hosts": "index",
        },

        index: function () {
            _.each([
                new Hosts.View.List(),
                new Hosts.View.AddButton(),
                new Hosts.View.Header(),
                new Hosts.View.Home(),
                new Hosts.View.ModuleList(),
                new Hosts.View.SubNav({ section: "dns" })
            ], function (view) {
                view.serialize();
            });
        }
    });

})(Harbour.Module.register("hosts"));
