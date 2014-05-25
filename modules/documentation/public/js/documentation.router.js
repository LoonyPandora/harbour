(function (Documentation) {
    "use strict";

    Documentation.Router = Harbour.Router.extend({
        routes: {
            "" : "index"
        },

        index: function () {

        },
    });

})(Harbour.Module.register("documentation"));
