define(function (require) {
    "use strict";

    var Marionette = require("marionette");
    var DialogView = require("assets-ui-components/dialog/js/views/dialogView1");

    var AutoComplete = Marionette.Controller.extend({

        initialize: function (options) {

            this.el = options.el;
            this.vent = options.vent;
            this.title = options.title || "",
            this.insideView = options.insideView;
        },

        //----------------------------------------------------
        // show
        //----------------------------------------------------

        show: function () {

            this.dialogView = new DialogView({
                vent: this.vent,
                el: this.el,
                title:this.title,
                zindex:1000,
                insideView:this.insideView
            });
            this.dialogView.render();
        }
    });

    return AutoComplete;
});
