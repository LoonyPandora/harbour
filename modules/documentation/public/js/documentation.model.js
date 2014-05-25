(function (Documentation) {
    "use strict";

    Documentation.Model = {
        Route: Harbour.Model.extend({
            idAttribute: "route"
            // urlRoot: "/documentation/routes"
        })
    };

})(Harbour.Module.register("documentation"));
