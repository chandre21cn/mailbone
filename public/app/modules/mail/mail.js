define(function (require) {
    "use strict";

    var app = require("mbApp");

    app.module('mail', function (mail, App,  Backbone, Marionette, $, _) {

        require("mail-storage/mailStorageInitializer");

        var MainLayoutController = require("mail-controllers/mailMainLayoutController");
        var DataController = require("mail-controllers/mailDataController");
        var ActionsController = require("mail-controllers/mailActionsController");
        var Router = require("mail-routers/mailRouter");
        var RouterController = require("mail-controllers/mailRouterController");

        //------------------------------------------
        // init
        //------------------------------------------

        this.addInitializer(function (options) {
            this.channel = Backbone.Wreqr.radio.channel("mail");
            this.dataController = new DataController();
            this.actionsController = new ActionsController();
            this.mainLayoutController = new MainLayoutController(options);
            this.router = new Router({ controller: new RouterController() });
        });

        //------------------------------------------
        // setLayout
        //------------------------------------------

        this.setLayout =function(){
            return this.mainLayoutController.setViews();
        };
    });

    return app.module("mail");
});