(function (Documentation) {
    "use strict";

    Documentation.Model = {
        Route: Harbour.Model.extend({
            idAttribute: "id",
            parse: function (response) {
                console.log(response);
                return response;
            }
        })
    };

})(Harbour.Module.get("documentation"));
