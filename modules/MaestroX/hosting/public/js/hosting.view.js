(function (Hosting) {
    "use strict";

    Hosting.View = {
        List: Maestro.View.extend({
            template: "/core/templates/list.html",
            el: "#panel-hosting .view.collection-list",

            serialize: function () {
                var view = this;

                var collection = new Hosting.Collection.List();
                collection.fetch().done(function () {
                    view.render({
                        json: {
                            accounts: collection.toJSON()
                        }
                    })
                }).fail(function () {
                    view.render({
                        withError: "Couldn't fetch foobar"
                    });
                });
            }
        })
    };

})(Maestro.Module.register("hosting"));

