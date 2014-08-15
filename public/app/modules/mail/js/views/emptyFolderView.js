define(function (require) {
    "use strict";

    var app = require("mbApp");
    var template = require("tpl!mail-templates/emptyFolderView.tmpl");

    var EmptyFolderView = {};

    app.module('mail', function (mail, app,  Backbone, Marionette, $, _) {

        EmptyFolderView = Marionette.ItemView.extend({
            template:template,
            isPermanent:true,
            className:"empty-folder",

            ui:{
              "msgTitle":".msgTitle"
            },

            //--------------------------------------------------

            initialize:function(){

                this.mailCollection = mail.dataController.getMailCollection();
                this._bindEvents();
            },

            //--------------------------------------------------

            _bindEvents:function(){

                this.listenTo(this.mailCollection, "fetch:success", this.checkIfEmpty, this);
                this.listenTo(this.mailCollection, "update:success", this.checkIfEmpty, this);
                this.listenTo(this.mailCollection, "delete:success", this.checkIfEmpty, this);
            },

            //--------------------------------------------------

            checkIfEmpty:function(){

                var isEmpty = this.mailCollection.isEmpty();

                if(isEmpty){
                   var action = app.context.get("mail.action");
                   this.ui.msgTitle.html(app.translator.translate("mail.emptyFolder." + action.type));
                }
                this.$el.toggle(isEmpty);
            }
        });
    });

    return EmptyFolderView;
});