(function (Session) {
    "use strict";

    Session.Router = Harbour.Router.extend({
        routes: {
            "":""
            "login": "index",
        },

        index: function () {
            console.log("hello");
        }
    });

})(Harbour.Module.register("session"));
