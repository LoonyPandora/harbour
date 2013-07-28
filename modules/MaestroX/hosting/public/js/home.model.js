(function (Home) {
    "use strict";


    Home.Models = {
        Stuff: Maestro.Model.extend({
            idAttribute: "id"
        })
    };

})(Maestro.Module.register("home"));

