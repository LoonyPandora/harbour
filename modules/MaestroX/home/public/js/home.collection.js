(function (Home) {
    "use strict";

    Home.Collection = {
        Stuff: Maestro.Collection.extend({
            model: Home.Models.Domain,
            url: "/api/domain",
            parse: function (response) {
                return response.domain;
            },
            comparator: function (service) {
                return service.get("expires").unix();
            }

        })
    }

})(Maestro.Module.register("home"));

