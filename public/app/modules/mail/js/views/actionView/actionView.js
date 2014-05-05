define(function (require) {
    "use strict";

    var app = require("mbApp");
    var _s = require("underscore.string");
    var template = require("tpl!mail-templates/actionView.tmpl");
    var PagerView = require("mail-views/actionView/_pagerView");
    var MoveToView = require("mail-views/actionView/_moveToView");
    var MoreActionsView = require("mail-views/actionView/_moreActionsView");

    var ActionView = {};

    app.module('mail', function (mail, mb, Backbone, Marionette, $, _) {
        ActionView = Marionette.ItemView.extend({
            template: template,
            className: 'actionView',

            initialize: function (options) {

                this.listenTo(app.context, 'change:router.state', this.showRelevantItems, this);
                this.listenTo(mail.vent, "change:messageSubject", this.onMessageSubjectChange, this);
                this.listenTo(mail.dataController.getMailCollection(), "change:selection", this.showRelevantItems, this);
            },

            ui: {
                actionListRegion: ".action-list-section",
                btnSelect: ".btnSelect",
                btnMoveTo: ".btnMoveTo",
//                btnSend: ".btnSend",
                btnRefresh: ".btnRefresh",
//                btnSaveNow: ".btnSaveNow",
//                btnDiscard: ".btnDiscard",
                btnDelete: ".btnDelete",
                btnMore: ".btnMore",
                pagerRegion: ".pager",
                lblSettings: ".lblSettings",
                lblCompose:".lblCompose",
                btnSettings: ".btnSettings",
                btnDiscardDrafts: ".btnDiscardDrafts",
                btnDeleteForever: ".btnDeleteForever",
                btnNotSpam: ".btnNotSpam"
            },

            events: {
                "click .btnSettings": function () {
                    mail.router.navigate("settings", {trigger: true});
                },
                "click .selectAll": function () {
                    mail.vent.trigger("actions", {actionType: 'select', selectBy: "all"});
                },
                "click .selectNone": function () {
                    mail.vent.trigger("actions", {actionType: "select", selectBy: "none"});
                },
                "click .selectRead": function () {
                    mail.vent.trigger("actions", {actionType: "select", selectBy: "read"});
                },
                "click .selectUnread": function () {
                    mail.vent.trigger("actions", {actionType: "select", selectBy: "unread"});
                },
                "click .btnDelete": function () {
                    mail.vent.trigger("actions", {actionType: 'moveTo', target: 'trash'});
                },
                "click .btnNotSpam": function () {
                    mail.vent.trigger("actions", {actionType: 'moveTo', target: 'inbox'});
                },
                "click .btnDeleteForever": function () {
                    mail.vent.trigger("actions", {actionType: 'delete'});
                },
//                "click .btnSend": function () {
//                    mail.vent.trigger("newMail", {actionType: 'send'});
//                },
//                "click .btnDiscard": function () {
//                    mail.vent.trigger("newMail", {actionType: 'discard'});
//                },
                "click .btnDiscardDrafts": function () {
                    mail.vent.trigger("actions", {actionType: 'delete'});
                }
            },

            //------------------------------------------------------
            // customTemplateHelpers
            //------------------------------------------------------

            customTemplateHelpers: function () {

                return{
                    action: _s.capitalize(app.context.get("router.state.action"))
                };
            },

            //------------------------------------------------------
            // onRender
            //------------------------------------------------------

            onRender: function () {

                this.pagerView = new PagerView({
                    el: this.ui.pagerRegion
                });
                this.pagerView.render();

                this.moreActionsView = new MoreActionsView({
                    el: this.ui.btnMore
                });
                this.moreActionsView.render();

                this.moveToView = new MoveToView({
                    el: this.ui.btnMoveTo
                });
                this.moveToView.render();
            },

            //------------------------------------------------------
            // showRelevantItems
            //------------------------------------------------------

            showRelevantItems: function () {

                var action = app.context.get("router.state.action");

                this.hideAll();

                switch (action) {
                    case "compose":
                        this.showItems(["lblCompose"]);
                        break;
                    case "settings":
                        this.showItems(["lblSettings"]);
                        break;
                    default:
                        this.showListOptions(action);
                        break;
                }
            },

            //---------------------------------------------------------

            showListOptions: function (action) {

                this.showItems(["btnSelect", "pagerRegion"]);

                if (!_.isEmpty(mail.dataController.getMailCollection().getSelected())) {

                    switch (action) {
                        case "draft":
                            this.showItems(["btnSelect", "btnDiscardDrafts", "btnNotSpam", "btnMore"]);
                            break;
                        case "spam":
                            this.showItems(["btnSelect", "btnDeleteForever", "btnMore"]);
                            break;
                        case "trash":
                            this.showItems(["btnSelect", "btnDeleteForever", "btnMore"]);
                            break;
                        default:
                            this.showItems(["btnSelect", "btnDelete", "btnMoveTo", "btnMore"]);
                            break;
                    }
                }
            },

            //-------------------------------------------------------

            hideAll:function(){
                this.showItems(["lblCompose", "lblSettings", "btnRefresh", "btnSelect", "btnMore", "btnSelect", "btnDelete", "btnMoveTo", "btnDeleteForever", "btnDiscardDrafts", "btnNotSpam", "pagerRegion"], false);
            },

            //------------------------------------------------------

            showItems: function (items, show) {

                show = _.isBoolean(show) ? show : true;

                _.each(items, _.bind(function (item) {
                    this.ui[item].toggle(show);
                }, this));
            },

            //---------------------------------------------------------
            // onMessageSubjectChange
            //---------------------------------------------------------

            onMessageSubjectChange:function(subject){

                if(_.isString(subject)){
                    this.ui.lblCompose.text(subject);
                }
            }
        });
    });

    return ActionView;
});