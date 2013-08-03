(function (Hosting) {
    "use strict";

    Hosting.View = {
        Header: Maestro.View.extend({
            template: "/core/templates/header.html",
            el: "#title.view",

            serialize: function () {
                this.render({
                    json: {
                        title: "Hello"
                    }
                });
            }
        }),

        AddButton: Maestro.View.extend({
            template: "/core/templates/add-account.html",
            el: "#panel-hosting .view.collection-list-footer",

            serialize: function () {
                this.render({
                    json: {
                        buttonText: "New Account"
                    }
                });
            }
        }),

        List: Maestro.View.extend({
            template: "/core/templates/list.html",
            el: "#panel-hosting .view.collection-list",

            serialize: function () {
                var view = this;
                var collection = new Hosting.Collection.List();

                collection.fetch(function () {
                    view.render({
                        json: {
                            accounts: collection.toJSON()
                        }
                    });
                });
            }
        })
    };

})(Maestro.Module.register("hosting"));

