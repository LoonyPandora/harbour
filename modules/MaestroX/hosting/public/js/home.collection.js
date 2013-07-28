(function (Home) {
    "use strict";

    Home.Collection = {
        Hosting: Maestro.Collection.extend({
            model: Home.Models.Hosting,
            url: "/api/hosting"
        })
    }

})(Maestro.Module.register("home"));

