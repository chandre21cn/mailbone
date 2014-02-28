define(function (require) {
    "use strict";

    var app = require("mbApp");
    var Marionette = require("marionette");
    var template = require("tpl!mail-templates/settingsView.tmpl");

    var SettingsView = {};

    app.module('mail', function (mail, mb,  Backbone, Marionette, $, _) {

        SettingsView = Marionette.ItemView.extend({
            template:template,

            ui: {
                btnDark:".darkTheme",
                btnDust: ".dustTheme"
            },

            events: {
                "change .emails_per_page": "onPageSizeChange"
            },

            //----------------------------------------------------------------------

            onRender:function(){
                this.$el.on("click", "div.themeBox", this.onThemeClick);
            },

            //----------------------------------------------------------------------

            onPageSizeChange:function(e){
                app.settingsController.getSettings().set("mail.pageSize", 12);
            },

            //----------------------------------------------------------------------

            onThemeClick:function(e){

                var target = $(e.currentTarget || e.srcElement);
                var theme = target.attr("data-name");

                app.settingsController.getSettings().set("selectedTheme", theme);
                app.settingsController.update(function(){
                    app.themesController.loadTheme(theme);
               });
            }
        });
    });


//
//    this.listenTo(newEngagement, "validated:invalid", function() {  //validation
//        alert(1);
//    });

    return SettingsView;
});