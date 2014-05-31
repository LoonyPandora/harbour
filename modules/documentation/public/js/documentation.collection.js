(function (Documentation) {
    "use strict";

    Documentation.Collection = {
        Routes: Harbour.Collection.extend({
            model: Documentation.Model.Route,
            url: "/api/documentation/route",
            parse: function (response) {
                var models = _.map(response.routes, function (model) {
                    var labels = _.map(model.methods, function (method) {
                        return {
                            title: method,
                            type: "default"
                        };
                    });

                    return {
                        id: model.route,
                        title: model.route,
                        labels: _.sortBy(labels, "title")
                    }
                });

                return _.sortBy(models, "title");
            }
        })
    };

})(Harbour.Module.get("documentation"));
