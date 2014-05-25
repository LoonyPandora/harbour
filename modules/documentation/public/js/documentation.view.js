(function (Documentation) {
    "use strict";

    Documentation.View = {
        Blank: Harbour.View.extend({ template: "" }),

        CollectionList: Harbour.View.extend({
            template: "/modules/documentation/templates/collection-list.html",
            el: ".collection-list.view",

            serialize: function (options) {
                var view = this;
                _.extend(view.options, options);

                var deferred = _.map([
                    new Documentation.Collection.Routes()
                ], function (collection){
                    return collection.fetch();
                });

                $.when.apply($, deferred).done(function (routes) {
                    view.render({
                        json: {
                            routes: routes.toJSON()
                        }
                    })
                });
            }
        })

    };

})(Harbour.Module.register("documentation"));
