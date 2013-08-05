(function (Session) {
    "use strict";

    Session.Router = Maestro.Router.extend({
        routes: {
            "login": "index",
        },

        index: function () {
            console.log("hello");
        }
    });

})(Maestro.Module.register("session"));
