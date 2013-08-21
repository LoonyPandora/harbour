(function (Hosting) {
    "use strict";

    Hosting.Collection = {
        List: Harbour.Collection.extend({
            model: Hosting.Model.List,
            url: "/api/hosting"
        })
    }

})(Harbour.Module.register("hosting"));

