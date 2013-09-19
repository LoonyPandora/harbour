(function (Session) {
    "use strict";

    Session.Collection = {
        GUIModules: Harbour.Collection.extend({
            parse: function (response) {

                // Remove any modules that aren't supposed to be visible to the user
                var output = [];
                _.each(response, function (moduleName) {
                    var module = Harbour.Module.get(moduleName);

                    if (module.Mixin && module.Mixin.icon) {
                        output.push(_.extend({
                            module: moduleName,
                            url: "/" + moduleName
                        }, module.Mixin));
                    }
                });

                return output;
            },

            model: Session.Model.GUIModules,
            url: "/api/session/modules"
        })
    };

})(Harbour.Module.register("session"));
