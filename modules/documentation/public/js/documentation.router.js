(function (Documentation) {
    "use strict";

    var WebUI = Harbour.Module.get("webui");

    Documentation.Router = Harbour.Router.extend({
        routes: {
            "documentation"                    : "index",
            "documentation/*routeName/builds"  : "subviewBuilds",
            "documentation/*routeName/stars"   : "subviewStars",
            "documentation/*routeName"         : "showRoute",
        },

        index: function () {
            _.each([
                new Documentation.View.CollectionList(),
                new WebUI.View.Blank({ el: ".collection-list-footer.view" }),
                new WebUI.View.Blank({ el: ".subnav.view" }),
                new WebUI.View.Blank({ el: ".content.view" }),
                new WebUI.View.PageTitle({ el: ".section-title.view", title: "Documentation - Harbour" }),
                new WebUI.View.PageTitle({ title: "Documentation - Harbour" })
            ], function (view, index) {
                view.serialize();
            });
        },

        subviewBuilds: function (routeName) { this.showRoute(routeName, "builds") },
        subviewStars:  function (routeName) { this.showRoute(routeName, "stars")  },

        showRoute: function (routeName, subview) {
            _.each([
                new Documentation.View.CollectionList(),
                new WebUI.View.Blank({ el: ".collection-list-footer.view" }),
                new WebUI.View.PageTitle({ el: ".section-title.view",  title: "/" + routeName }),
                new WebUI.View.PageTitle({ title: "Documentation - " + routeName }),
                new WebUI.View.Subnav({
                    baseURL: "documentation/"+routeName,
                    activeSubview: subview,
                    subviews: [
                        new WebUI.View.PageTitle({
                            url: "builds",
                            icon: "cogs",
                            title: "Builds",
                            el: ".content.view"
                        }),
                        new WebUI.View.PageTitle({
                            url: "stars",
                            icon: "star",
                            title: "Stars",
                            el: ".content.view"
                        })
                    ]
                })
            ], function (view, index) {
                view.serialize();
            });
        },
        
    });

})(Harbour.Module.register("documentation"));
