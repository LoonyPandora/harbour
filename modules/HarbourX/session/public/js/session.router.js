(function (Session) {
    "use strict";

    Session.Router = Harbour.Router.extend({
        routes: {
            "":"index",
            "login": "login"
        },

        index: function () {
            _.each([
                new Session.View.ModuleList()
            ], function (view, index) {
                view.render();
            });
        },
        
        login: function () {
            console.log("login route");
        }
    });

})(Harbour.Module.register("session"));
