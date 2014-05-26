(function (Documentation) {
    "use strict";

    Documentation.Collection = {
        Routes: Harbour.Model.extend({
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
                        labels: labels
                    }
                });

                var displayCollection = {
                    title: "Routes",
                    models: _.sortBy(models, "title")
                }

                return displayCollection;
            }
        })
    };

})(Harbour.Module.get("documentation"));
