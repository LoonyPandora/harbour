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

        SubNav: Maestro.View.extend({
            template: "/core/templates/subnav.html",
            el: "#panel-hosting .view.subnav",

            serialize: function () {
                var view = this;

                // Put a url property in the list of subnav items which is the same as the key
                // Makes the template simpler if we just pass an array
                var sectionList =_.map(view.Mixin.subnav, function (value, key) {
                    if (key === view.options.section) {
                        value.active = "active";
                    }

                    var base = Backbone.history.fragment;
                    if (base.indexOf("/") !== -1) {
                        base = base.substring(0, base.lastIndexOf("/"));
                    }

                    value.url = base + "/" + key;
                    return value;
                });

                this.render({
                    json: {
                        sections: sectionList
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

