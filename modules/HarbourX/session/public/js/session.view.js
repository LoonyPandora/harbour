(function (Session) {
    "use strict";

    Session.View = {
        ModuleList: Harbour.View.extend({
            template: "/core/templates/module-list.html",
            el: "#module-list",

            serialize: function () {
                var view = this;

                var modules = new Session.Collection.GUIModules();

                modules.fetch().done(function (collection) {
                    view.render({
                        json: {
                            modules: collection.toJSON()
                        }
                    })
                })
            }
        })
    };

})(Harbour.Module.register("session"));
