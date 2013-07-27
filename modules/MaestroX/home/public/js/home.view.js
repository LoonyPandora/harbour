(function (Home) {
    "use strict";

    Home.View = {
        Header: Maestro.View.extend({
            template: "",
            el: "#title.view",

            serialize: function (render) {
                var foo = {}
                foo.fetch().done(function () {
                    render({
                        json: {
                            foo: "bar",
                            hello: "world"
                        }
                    })
                }).fail(function () {
                    view.template = "error";
                    render();
                });
            }
        })
    };

})(Maestro.Module.register("home"));

