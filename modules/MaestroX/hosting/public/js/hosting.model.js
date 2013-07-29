(function (Hosting) {
    "use strict";

    Hosting.Models = {
        List: Maestro.Model.extend({
            idAttribute: "id"
        })
    };

})(Maestro.Module.register("hosting"));

