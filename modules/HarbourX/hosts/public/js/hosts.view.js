(function (Hosts) {
    "use strict";

    Hosts.View = {
        Header: Harbour.View.extend({

        }),

        ModuleList: Harbour.View.extend({
        }),

        AddButton: Harbour.View.extend({
        }),

        SubNav: Harbour.View.extend({
            template: "/core/templates/subnav.html",
            el: "#panel-hosts .view.subnav",

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

                view.render({
                    json: {
                        sections: sectionList
                    }
                });
            }
        }),

        Home: Harbour.View.extend({
            template: "/modules/hosting/templates/home.html",
            el: "#panel-hosts .view.content",

            serialize: function () {
                var view = this;

                view.render({
                    json: {
                        
                    }
                });
            }
        }),

        List: Harbour.View.extend({
            template: "/core/templates/collection-list.html",
            el: "#panel-hosts .view.collection-list",

            serialize: function () {
                var view = this;
                var collection = new Hosts.Collection.List();

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

})(Harbour.Module.register("hosts"));

