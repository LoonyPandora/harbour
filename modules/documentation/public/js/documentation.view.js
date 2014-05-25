(function (Documentation) {
    "use strict";

    Documentation.View = {
        CollectionList: Harbour.View.extend({
            template: "/modules/documentation/templates/collection-list.html",
            el: ".collection-list.view",

            viewHelper: {
                isActive: function (route) {
                    // FIXME: Doesn't match when you are on a subview
                    var matchEnd = new RegExp(route + "$");

                    if ( Backbone.history.fragment.match(matchEnd) ) {
                        return "active";
                    }
                }
            },

            serialize: function () {
                var view = this;

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
