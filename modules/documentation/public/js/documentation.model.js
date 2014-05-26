(function (Documentation) {
    "use strict";

    Documentation.Model = {
        Route: Harbour.Model.extend({
            idAttribute: "route"
        })
    };

})(Harbour.Module.get("documentation"));
