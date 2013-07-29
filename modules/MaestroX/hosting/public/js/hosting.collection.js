(function (Hosting) {
    "use strict";

    Hosting.Collection = {
        List: Maestro.Collection.extend({
            model: Hosting.Models.List,
            url: "/api/hosting"
        })
    }

})(Maestro.Module.register("hosting"));

