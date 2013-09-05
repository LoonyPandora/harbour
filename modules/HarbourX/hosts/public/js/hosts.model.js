(function (Hosts) {
    "use strict";

    Hosts.Model = {
        List: Harbour.Model.extend({
            idAttribute: "id"
        })
    };

})(Harbour.Module.register("hosts"));

