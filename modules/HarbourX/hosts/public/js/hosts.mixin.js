(function (Hosts) {
    "use strict";

    Hosts.Mixin = {
        // FIXME: XSS injection possible on icon.
        icon: "&#xf0a0;",
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

})(Harbour.Module.register("hosts"));
