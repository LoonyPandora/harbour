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
                    // Return if we've already got the data in memory. This is a completed promise.
                    if (collection.length) {
                        return collection;
                    }

                    // If we have filtered the collection, we WANT to return something empty
                    if (collection.filtered) {
                        return collection;
                    }

                    // Default is to connect to the server and fetch the collection
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
            },

            // Wire up the filter box
            after: function () {
                var view = this;

                // Save a complete copy of the collections, before any searches are done
                if (_.size(view.allCollections) === 0) {
                    view.allCollections = _.clone(view.collections);
                }

                var $searchBox = $(view.$el.selector).parent().find("input");

                // FIXME: Turning it off before re-attaching is a workaround for double attaching the event
                $searchBox.off("keyup").on("keyup", function (event) {
                    var pattern = new RegExp($searchBox.val(), "i");

                    // Generate the list of models that match what we've searched for
                    var matchingModels = [];
                    _.each(view.allCollections, function (collection) {
                        matchingModels.push(collection.search($searchBox.val(), "title")
                            // Filter out ones that don't match & are undefined
                            .filter(function(models) {
                                return models;
                            })
                        );
                    });

                    // Create new collections containing just the models we've matched
                    // use the models collection attribute to bless it into the same collection
                    // We know we have at least one matching model, that's why we always access the first in the list
                    var filteredCollections = _.map(matchingModels, function(modelList) {
                        if (_.size(modelList) > 0) {
                            return new modelList[0].collection.constructor(modelList);
                        }
                    }).filter(function(collections) {
                        return collections;
                    });

                    view.collections = filteredCollections;
                    view.serialize();
                })
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
