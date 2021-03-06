define(function (require) {
    "use strict";

    var map = require("app/map");

    var MODULE_FLAG = 'modules';
    var I18N_FLAG = 'i18n';
    var CONFIG_FLAG = 'config';

    var loadModules = function (paths) {

        for (var component in map.components) {
            if(map.components[component].type == 'MODULE'){
                paths.push(map.components[component].root + '/' + map.components[component].name);
            }
        }
    };

    var loadI18N = function (paths, name) {

        var locale = "en-us",
            params = name.split("?");

        if(_.isArray(params) && params.length > 0){
           locale = params[1];
        }

        for (var component in map.components) {
            paths.push(map.components[component].root + '/ui/i18n/' + locale);
        }
    };

    var loadConfigs = function (paths) {

        for (var component in map.components) {
            paths.push(map.components[component].root + '/config');
        }
    };

    return {

        load : function (name, req, onload, config) {

            var paths = [];

            if (name.indexOf(MODULE_FLAG) !== -1) {
                loadModules(paths);
            }
            else if (name.indexOf(I18N_FLAG) !== -1) {
                loadI18N(paths, name);
            }
            else if (name.indexOf(CONFIG_FLAG) !== -1) {
                loadConfigs(paths);
            }

            req(paths, function () {
                onload(arguments);
            });
        }
    };
});