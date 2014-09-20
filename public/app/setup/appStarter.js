define(function (require) {
    "use strict";

    require("mail-module");
    require("tasks-module");
    require("backbone.localstorage");
    require("mailbone-extensions/marionette/marionette.extensions");

    var app = require("mbApp");
    var Backbone =  require("backbone");
    var Translator = require("i18n/translator");
    var AppRouter =  require("app/setup/appRouter");
    var Context = require("common-context/context");
    var Settings = require("common-settings/settings");
    var SettingsController = require("common-settings/settingsController");
    var FrameLayoutController = require("frame-controllers/frameLayoutController");


    //------------------------------------------
    // init
    //------------------------------------------

    app.on("before:start", function () {

        app.router = new AppRouter();
        app.translator = Translator;
        app.context = new Context();
        app.settings = new Settings();
        app.frame = new FrameLayoutController();
        app.settingsController = new SettingsController();
    });

    //------------------------------------------
    // start
    //------------------------------------------

    app.on("start", function () {

        app.channel.vent.once("onSettingsLoaded", onSettingsLoaded);
        app.settingsController.fetch();
    });

    //------------------------------------------

    var onSettingsLoaded =function(){

        setLayout();
        startHistory();
        removeSplashScreen();
    };

    //------------------------------------------

    var setLayout = function () {

        app.addRegions({
            mainRegion: '.mb'
        });

        app.frame.setLayout(app.mainRegion);
    };

    //------------------------------------------

    var startHistory = function () {

        if (Backbone.history) {
            Backbone.history.start();
        }
    };

    //-------------------------------------------

    var removeSplashScreen = function () {

        $(".spinner").hide();
        $(".mb").show();
    };

    return {};
});