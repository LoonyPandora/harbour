(function (Hosting) {
    "use strict";

    Hosting.View = {
        Header: Maestro.View.extend({
            template: "/core/templates/header.html",
            el: "#title.view",

            serialize: function () {
                var view = this;

                view.render({
                    json: {
                        title: "Hello"
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

                // 1. Fetch Layout
                // 2. Add Spinners to Views in Layout
                // 3. Fetch Collection
                // 4. Fetch Relevant Template(s)
                // 5. Remove spinners from layout
                // 6. Render data with templates into Layout
                collection.fetchAll(function () {
                    view.render({
                        json: {
                            accounts: collection.toJSON()
                        }
                    });
                })
            }
        })
    };

})(Maestro.Module.register("hosting"));

