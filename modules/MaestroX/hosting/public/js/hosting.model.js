(function (Hosting) {
    "use strict";

    Hosting.Model = {
        List: Maestro.Model.extend({
            idAttribute: "id"
        })
    };

})(Maestro.Module.register("hosting"));

