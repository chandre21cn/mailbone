define(function (require) {
    "use strict";

    var app = require("mbApp");
    var Marionette = require("marionette");
    var template = require("tpl!mail-templates/composeView.tmpl");

    var ActionView ={};

    app.module('mail', function (mail, mb,  Backbone, Marionette, $, _) {
        ActionView = Marionette.ItemView.extend({
            template: template,
            className: 'composeView',

            ui: {
                inputTo: ".to",
                inputCc: ".cc",
                inputBcc: ".bcc",
                inputSubject: ".subject",
                inputEditor: ".compose-editor",
                addCc: '.addCc',
                addBcc: '.addBcc',
                ccLine: '.ccLine',
                bccLine: '.bccLine',
                header:".compose-header"
            },

            events: {
                "change .to": "onToChange",
                "change .cc": "onCcChange",
                "change .bcc": "onBccChange",
                "change .subject": "onSubjectChange",
                "blur .compose-editor": "onBodyBlur",
                "click .addCc": "showCc",
                "click .addBcc": "showBcc"
            },

            initialize:function(){

            },

            //-----------------------------------------------------------------

            onToChange: function(){
                this.model.set('to',this.ui.inputTo.val());
            },

            //-----------------------------------------------------------------

            onCcChange: function(){
                this.model.set('cc',this.ui.inputCc.val());
            },

            //-----------------------------------------------------------------

            onBccChange: function(){
                this.model.set('bcc',this.ui.inputBcc.val());
            },

            //-----------------------------------------------------------------

            onSubjectChange: function(){
                this.model.set('subject',this.ui.inputSubject.val());
            },

            //-----------------------------------------------------------------

            onBodyBlur: function(){
                this.model.set('body',this.ui.inputEditor.html());
            },

            //-----------------------------------------------------------------

            showCc: function(){
                this.ui.ccLine.show();
                this.ui.addCc.hide();
                this.ui.inputEditor.css('top', parseInt(this.ui.header.css('height'),10) + 25 + 'px') ;
            },

            //-----------------------------------------------------------------

            showBcc: function(){
                this.ui.bccLine.show();
                this.ui.addBcc.hide();
                this.ui.inputEditor.css('top', parseInt(this.ui.header.css('height'),10) + 25 + 'px') ;
            },

            //-----------------------------------------------------------------

            onInvalid: function (model, errors) {
                alert("5656");
            }
        });
    });

    return ActionView;
});