(function (Documentation) {
    "use strict";

    var WebUI = Harbour.Module.get("webui");

    Documentation.Router = Harbour.Router.extend({
        routes: {
            "documentation"                      : "index",
            "documentation/*routeName/test"      : "subviewTest",
            "documentation/*routeName/input"     : "subviewInput",
            "documentation/*routeName/output"    : "subviewOutput",
            "documentation/*routeName/errors"    : "subviewErrors",
            "documentation/*routeName/reference" : "subviewReference",
            "documentation/*routeName"           : "showRoute",
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

        // Can't capture these items, as we are using a splat - documentation can have forward slashes
        // Normally wouldn't be this messy if we can be sure captures won't have slashes
        subviewTest:      function (routeName) { this.showRoute(routeName, "test")      },
        subviewInput:     function (routeName) { this.showRoute(routeName, "input")     },
        subviewOutput:    function (routeName) { this.showRoute(routeName, "output")    },
        subviewErrors:    function (routeName) { this.showRoute(routeName, "errors")    },
        subviewReference: function (routeName) { this.showRoute(routeName, "reference") },

        showRoute: function (routeName, subview) {
            // We want to always navigate to a default subview if we have a subnav
            if (!subview) {
                this.navigate("documentation/"+routeName+"/test", { replace: true });
            }

            // All views that are dependent on a parent, in order they will appear in the navbar
            var subviews = [
                new WebUI.View.PageTitle({
                    url: "test",
                    icon: "bolt",
                    title: "Test",
                    el: ".content.view"
                }),
                new WebUI.View.PageTitle({
                    url: "input",
                    icon: "sign-in",
                    title: "Input",
                    el: ".content.view"
                }),
                new WebUI.View.PageTitle({
                    url: "output",
                    icon: "sign-out",
                    title: "Output",
                    el: ".content.view"
                }),
                new WebUI.View.PageTitle({
                    url: "errors",
                    icon: "bomb",
                    title: "Errors",
                    el: ".content.view"
                }),
                new WebUI.View.PageTitle({
                    url: "reference",
                    icon: "book",
                    title: "Full Docs",
                    el: ".content.view"
                })
            ]

            _.each([
                new Documentation.View.CollectionList(),
                new WebUI.View.Blank({ el: ".collection-list-footer.view" }),
                new WebUI.View.PageTitle({ el: ".section-title.view",  title: "/" + routeName }),
                new WebUI.View.PageTitle({ title: "Documentation - " + routeName }),
                new WebUI.View.Subnav({
                    baseURL: "documentation/"+routeName,
                    activeSubview: subview,
                    subviews: subviews
                })
            ], function (view, index) {
                view.serialize();
            });
        },
        
    });

})(Harbour.Module.register("documentation"));
