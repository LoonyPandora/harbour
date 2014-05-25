(function (Session) {
    "use strict";

    Session.Router = Harbour.Router.extend({
        routes: {
            "" : "index",
            "login" : "login"
        },

        index: function () {

        },

        login: function () {
            console.log("login route");
        }
    });

})(Harbour.Module.register("session"));
