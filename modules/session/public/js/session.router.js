(function (Session) {
    "use strict";

    Session.Router = Harbour.Router.extend({
        routes: {
            "" : "index",
            "login" : "login"
        },

        index: function () {
            this.navigate("NotJenkins", { trigger: true, replace: true });
        },

        login: function () {
            console.log("login route");
        }
    });

})(Harbour.Module.register("session"));
