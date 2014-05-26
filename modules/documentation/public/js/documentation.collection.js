(function (Documentation) {
    "use strict";

    Documentation.Collection = {
        Routes: Harbour.Model.extend({
            model: Documentation.Model.Route,
            url: "/api/documentation/route",
            parse: function (response) {
                return _.sortBy(response.routes, "route");
            }
        })
    };

})(Harbour.Module.get("documentation"));
