(function (WebUI) {
    "use strict";

    WebUI.View = {
        Blank: Harbour.View.extend({}),

        ModuleList: Harbour.View.extend({
            template: "/modules/webui/templates/module-list.html",
            el: "#module-list",

            serialize: function () {
                var view = this;

                var modules = new WebUI.Collection.GUIModules();

                modules.fetch().done(function (collection) {
                    view.render({
                        json: {
                            modules: collection.toJSON()
                        }
                    })
                })
            }
        }),

        CollectionList: Harbour.View.extend({
            template: "/modules/webui/templates/collection-list.html",
            el: ".collection-list.view",

            viewHelper: {
                isActive: function (route) {
                    var matchEnd = new RegExp(route + "/\\w+" + "$");

                    if ( Backbone.history.fragment.match(matchEnd) ) {
                        return "active";
                    }
                }
            },

            serialize: function () {
                var view = this;

                var deferred = _.map(view.collections, function (collection) {
                    return collection.fetch();
                });

                $.when.apply($, deferred).done(function () {
                    // Create an array of all the collections that were added
                    var collections = _.map(view.collections, function (collection) {
                        return collection.toJSON();
                    });

                    view.render({
                        json: {
                            baseURL: view.baseURL,
                            collectionTitles: view.collectionTitles,
                            collections: collections,
                            viewHelper: view.viewHelper
                        }
                    })
                });
            }
        }),

        PageTitle: Harbour.View.extend({
            template: "/modules/webui/templates/header.html",
            el: "title.view",

            serialize: function () {
                var view = this;

                return view.render({
                    json: {
                        title: view.title
                    }
                });
            }
        }),

        Subnav: Harbour.View.extend({
            template: "/modules/webui/templates/subnav.html",
            el: ".subnav.view",

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

                // Render the subnavigation bar
                view.render({
                    json: {
                        viewHelper: view.viewHelper,
                        baseURL: view.baseURL,
                        sections: view.subviews
                    }
                });

                var activeSubviews =  _.where(view.subviews, { url: view.activeSubview });

                // We only render the currently visible subview, as they all render into the same view
                _.each(activeSubviews, function (view, index) {
                    view.serialize();
                });
            }
        }),
    };

})(Harbour.Module.get("webui"));
