(function (Hosting) {
    "use strict";

    Hosting.View = {
        List: Maestro.View.extend({
            template: "",
            el: "#panel-hosting .view.collection-list",

            serialize: function () {
                var view = this;

                var foo = new Hosting.Collection.List();
                foo.fetch().done(function () {
                    view.render({
                        json: {
                            foo: "bar",
                            hello: "world"
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

