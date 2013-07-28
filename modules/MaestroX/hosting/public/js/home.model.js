(function (Home) {
    "use strict";


    Home.Models = {
        Hosting: Maestro.Model.extend({
            idAttribute: "id"
        })
    };

})(Maestro.Module.register("home"));

