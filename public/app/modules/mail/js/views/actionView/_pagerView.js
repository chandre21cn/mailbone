define(function (require) {
    "use strict";

    var app = require("mbApp");
    var template = require("tpl!mail-templates/pagerView.tmpl");

    var PagerView = {};

    app.module('mail', function (mail, app, Backbone, Marionette, $, _) {
        PagerView = Marionette.ItemView.extend({

            template: template,
            className: 'pageInfoView',
            pageInfo: {},

            ui: {
                container:".pagerInnerContainer",
                btnNewer: ".btnNewer",
                btnOlder: ".btnOlder",
                lblTotal: ".total",
                lblFrom: ".lblForm",
                lblTo: ".lblTo"
            },

            events: {
                "click .btnNewer": "showNewerItems",
                "click .btnOlder": "showOlderItems"
            },

            //------------------------------------------------------
            // initialize
            //------------------------------------------------------

            initialize: function () {

                this.collection = mail.dataController.getMailCollection();
                this.listenTo(this.collection, "change:metadata",this.onCollectionMetadataChange, this);
            },

            //------------------------------------------------------
            // onCollectionMetadataChange
            //------------------------------------------------------

            onCollectionMetadataChange: function () {

                if(_.isObject(this.collection.metadata) && this.collection.metadata.total > 0){

                    this.updatePageInfo();
                    this.adjustButtons();
                    this.adjustLabels();
                    this.updateUrlWithoutNavigate();
                    this.ui.container.show();
                }else{
                    this.ui.container.hide();
                }
            },

            //-----------------------------------------------------

            updatePageInfo:function(){

                var metadata = this.collection.metadata;

                this.pageInfo.total = metadata.total;
                this.pageInfo.currPage = metadata.currPage + 1;
                this.pageInfo.from = metadata.from + 1;
                this.pageInfo.to = Math.min(metadata.total, metadata.to + 1);
            },

            //-----------------------------------------------------

            adjustButtons: function(){

                this.ui.btnNewer.toggleClass("disable",this.pageInfo.from === 1);
                this.ui.btnOlder.toggleClass("disable",this.pageInfo.to >= this.pageInfo.total);
            },

            //-----------------------------------------------------

            adjustLabels: function(){

                this.ui.lblFrom.text(this.pageInfo.from);
                this.ui.lblTo.text(Math.min(this.pageInfo.to, this.pageInfo.total));
                this.ui.lblTotal.text(this.pageInfo.total);
            },

            //-----------------------------------------------------

            updateUrlWithoutNavigate:function(){

                var param = this.pageInfo.currPage > 1 ? ("/p" + this.pageInfo.currPage.toString()) : "";
                mail.router.navigate(app.context.get("mail.action.type") + param);
            },

            //------------------------------------------------------
            // on buttons click
            //------------------------------------------------------

            showNewerItems: function () {

                if (this.pageInfo.from > 1){
                    this.navigate(this.pageInfo.currPage - 1);
                }
            },

            //----------------------------------------------------

            showOlderItems: function () {

                if (this.pageInfo.to < this.pageInfo.total){
                    this.navigate(this.pageInfo.currPage + 1);
                }
            },

            //----------------------------------------------------

            navigate: function(page){

                var action = app.context.get("mail.action");
                var search = action.params.query ? "/" + action.params.query : "";
                mail.router.navigate(action.type + search + "/p" + page.toString(), { trigger: true });
            }
        });
    });

    return PagerView;
});