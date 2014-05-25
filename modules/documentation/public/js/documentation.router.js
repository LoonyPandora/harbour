(function (Documentation) {
    "use strict";

    var WebUI = Harbour.Module.get("webui");

    Documentation.Router = Harbour.Router.extend({
        routes: {
            "documentation"             : "index",
            "documentation/*routeName"  : "showRoute",
        },

        index: function () {
            console.log("running doc 'index' route");

            _.each([
                new Documentation.View.CollectionList(),
                new Documentation.View.Blank({ el: ".collection-list-footer.view" }),
                new Documentation.View.Blank({ el: ".subnav.view" }),
                new Documentation.View.Blank({ el: ".content.view" }),
                // new Documentation.View.SectionTitle({ title: "Documentation - Harbour" }),
                new WebUI.View.PageTitle({ title: "Documentation - Harbour" })
            ], function (view, index) {
                view.serialize();
            });
        },

        showRoute: function (routeName) {
            console.log("running doc 'route' route", routeName);

            _.each([
                new Documentation.View.CollectionList(),
                new Documentation.View.Blank({ el: ".collection-list-footer.view" }),
                new Documentation.View.Blank({ el: ".subnav.view" }),
                new Documentation.View.Blank({ el: ".content.view" }),
                new Documentation.View.Blank({ el: ".section-title.view" }),
                new WebUI.View.PageTitle()
            ], function (view, index) {
                view.serialize({
                    title: "Documentation - " + routeName
                });
            });
        },
        
    });

})(Harbour.Module.register("documentation"));
