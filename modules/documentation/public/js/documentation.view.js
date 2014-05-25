(function (Documentation) {
    "use strict";

    Documentation.View = {
        Blank: Harbour.View.extend({ template: "" }),

        CollectionList: Harbour.View.extend({
            template: "/modules/documentation/templates/collection-list.html",
            el: ".collection-list.view",

            viewHelper: {
                isActive: function (route) {
                    var matchEnd = new RegExp(route + "$");

                    if ( Backbone.history.fragment.match(matchEnd) ) {
                        return "active";
                    }
                }
            },

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
                            routes: routes.toJSON(),
                            viewHelper: view.viewHelper
                        }
                    })
                });
            }
        })

    };

})(Harbour.Module.register("documentation"));
