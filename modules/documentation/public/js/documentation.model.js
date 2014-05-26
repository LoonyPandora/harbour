(function (Documentation) {
    "use strict";

    Documentation.Model = {
        Route: Harbour.Model.extend({
            idAttribute: "id",
            parse: function (response) {
                return response;
            }
        })
    };

})(Harbour.Module.get("documentation"));
