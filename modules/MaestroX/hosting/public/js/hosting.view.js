(function (Hosting) {
    "use strict";

    Hosting.View = {
        List: Maestro.View.extend({
            template: "/core/templates/list.html",
            el: "#panel-hosting .view.collection-list",

            serialize: function () {
                var view = this;

                var foo = new Hosting.Collection.List();
                foo.fetch().done(function () {
                    view.render({
                        json: {
                            sections: [
                                {
                                    title: "Hosting",
                                    items: [
                                        {
                                            name: "foobar.com",
                                            expires: "2014-07-01",
                                            aliases: [
                                                "asdf.co.uk",
                                                "example.org"
                                            ]
                                        }
                                    ]
                                }
                            ]
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

