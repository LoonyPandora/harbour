(function (Hosting) {
    "use strict";

    Hosting.Mixin = {
        layout: "/core/layouts/collection-list.html",
        subnav: {
            "home": {
                title: "Home",
                icon: "home"
            },
            "dns": {
                title: "DNS",
                icon: "globe"
            },
            "really-long-section": {
                title: "Really Long Section Name",
                icon: "file"
            },
            "apps": {
                title: "Apps",
                icon: "play-circle"
            },
        }
    };

})(Maestro.Module.register("hosting"));
