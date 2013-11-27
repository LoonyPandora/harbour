(function (Session) {
    "use strict";

    Session.View = {
        ModuleList: Harbour.View.extend({
            template: "/core/templates/module-list.html",
            el: "#module-list",

            serialize: function () {
                return {
                    modules: [{
                        url: "url",
                        name: "name",
                        icon: "hello" 
                    }]
                }
            }

        }),

        SectionTitle: Harbour.View.extend({

        }),
    };

})(Harbour.Module.register("session"));
