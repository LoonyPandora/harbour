(function (Hosting) {
    "use strict";

    Hosting.Model = {
        List: Harbour.Model.extend({
            idAttribute: "id"
        })
    };

})(Harbour.Module.register("hosting"));

