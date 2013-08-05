(function (Session) {
    "use strict";

    Session.Model = {
        GUIModules: Maestro.Model.extend({
            // parse: function (response, options) {
                // var module = Maestro.Module.get(response);


                // return response;
                // Extend the response with the stuff we get from the mixin
                // Only returns modules that should be visible in the GUI

                // console.log(response);
                // 
                // if (module.Mixin && module.Mixin.icon) {
                //     console.log(module.Mixin.icon);
                //     return _.extend({
                //         module: module
                //     }, module.Mixin);
                // }
                // 
                // return false;

            // }
        })
    };

})(Maestro.Module.register("session"));
