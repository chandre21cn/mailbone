define({

    leVersion: "@@version",
    locale: "en-us",
    deps: [],
    waitSeconds: 0,
    "paths": {
        "underscore": "lib/underscore/underscore",
        "underscore.string": "lib/underscore/underscore.string",
        "underscore.deepExtend": "lib/underscore/underscore.mixin.deepExtend",
        "jquery": "lib/jquery/jquery",
        "backbone": "lib/backbone/backbone",
        "backbone.wreqr": "lib/backbone/backbone.wreqr",
        "backbone.babysitter": "lib/backbone/backbone.babysitter",
        "backbone.localstorage": "lib/backbone/backbone.localstorage",
        "backbone.deepmodel": "lib/backbone/backbone.deepmodel",
        "marionette": "lib/backbone/backbone.marionette",
        "text": "lib/require/require.text",
        "json": "lib/require/require.json",
        "mustache": "lib/mustache/mustache",
        "mbApp": "app/setup/app",
        "tpl": "lib/require/require.tpl",
        "css": "lib/require/require.css",
        "onDemandLoader": "app/assets/js/lib-extensions/requirejs/require.loadOnDemand",
        "tmpl": "lib/require/tmpl",
        "templateCache": "lib/require/templateCache",
        "assets-static-data":"app/assets/data",

        "assets-enums": "app/assets/enums",
        "assets-ui-components":"app/assets/ui/components",
        "assets-base-collections": "app/assets/js/base-collections",
        "assets-base-models": "app/assets/js/base-models",
        "assets-decorators": "app/assets/js/decorators",
        "assets-storage": "app/assets/js/resolvers/storage",
        "assets-resolvers": "app/assets/js/resolvers",
        "assets-plugins": "app/assets/js/plugins",
        "assets-extensions": "app/assets/js/lib-extensions",
        "mail-module": "app/modules/mail/mail",
        "tasks-module": "app/modules/tasks/tasks",
        "assets-i18n": "app/assets/js/resolvers/i18n",

        "frame":"app/core/frame/frame",
        "frame-views":  "app/core/frame/js/views",
        "frame-templates":"app/core/frame/ui/templates",
        "frame-controllers":"app/core/frame/js/controllers",
        "frame-collections":"app/core/frame/js/collections",
        "frame-models":"app/core/frame/js/models",
        "frame-storage":"app/core/frame/js/storage",
        "common-settings": "app/core/settings",
        "common-context": "app/core/context",

        "mailApp": "app/modules/mail",
        "mail-data": "app/modules/mail/data",
        "mail-views": "app/modules/mail/js/views",
        "mail-templates":"app/modules/mail/ui/templates",
        "mail-routers":"app/modules/mail/js/routers",
        "mail-models":"app/modules/mail/js/models",
        "mail-controllers":"app/modules/mail/js/controllers",
        "mail-mocks":"app/modules/mail/mocks",
        "mail-collections":"app/modules/mail/js/collections",
        "mail-storage":"app/modules/mail/js/storage",
        "mail-utils":"app/modules/mail/js/utils",

        "tasks": "app/modules/tasks",
        "tasks-data":"app/modules/tasks/data",
        "tasks-models": "app/modules/tasks/js/models",
        "tasks-collections": "app/modules/tasks/js/collections",
        "tasks-views": "app/modules/tasks/js/views",
        "tasks-templates":"app/modules/tasks/ui/templates",
        "tasks-controllers":"app/modules/tasks/js/controllers",
        "tasks-routers":"app/modules/tasks/js/routers",
        "tasks-storage":"app/modules/tasks/js/storage"
    },
    "shim": {
    },
    tpl: {
        "templateExtension": ""
    }
});
