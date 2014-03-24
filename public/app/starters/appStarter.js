define(function (require) {
    "use strict";

    var app = require("mbApp");
    var Backbone = require("backbone");
    var MarionetteExt = require("lib-extensions/marionette/marionette.ext");
    var localStorage = require("backbone.localstorage");
    var Translator = require("i18n/translator");
    var Context = require("assets-models/context");
    var Settings = require("assets-models/settings");
    var Modules = require("app/assets/js/lib-extensions/requirejs/require.loadByType!modules");
    var ThemesController = require("assets-controllers/themesController");
    var FrameLayoutController = require("frame-controllers/frameLayoutController");

    //------------------------------------------
    // init
    //------------------------------------------

    app.on("initialize:before", function () {

        app.vent = new Backbone.Wreqr.EventAggregator();

        app.translator = Translator;
        app.context = new Context();
        app.settings = new Settings();
        app.frame = new FrameLayoutController();
        app.themesController = new ThemesController();
    });

    //------------------------------------------
    // start
    //------------------------------------------

    app.on("start", function () {

        app.settings.fetch({
            success: function () {
                loadTheme();
                setLayout();
                startHistory();
            }
        });
    });

    //--------------------------------------------------

    var loadTheme = function () {

        app.vent.once("onCssLoaded", removeSplashScreen);
        app.themesController.loadTheme(app.settings.get("selectedTheme"));
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