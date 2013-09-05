(function (Hosts) {
    "use strict";

    Hosts.Collection = {
        List: Harbour.Collection.extend({
            model: Hosts.Model.List,
            url: "/api/hosts"
        })
    }

})(Harbour.Module.register("hosts"));

