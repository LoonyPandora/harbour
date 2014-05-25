(function (WebUI) {
    "use strict";

    WebUI.View = {
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

        PageTitle: Harbour.View.extend({
            template: "/modules/webui/templates/header.html",
            el: "title.view",

            serialize: function (options) {
                var view = this;
                _.extend(view.options, options);

                return view.render({
                    json: {
                        title: view.options.title
                    }
                });
            }
        })
    };

})(Harbour.Module.register("webui"));
