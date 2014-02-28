define(function (require) {
    "use strict";

    var ContactsStorage = function (_orderBy) {

        var _localStorage = window.localStorage;

        //----------------------------------------------------------
        // findAll
        //---------------------------------------------------------

        var findAll = function (model,options) {

            var contacts = _localStorage.getItem('contacts');
            return typeof(contacts) === 'string' ? JSON.parse(contacts) : [];
        };

        return{
            findAll: findAll
        };
    };

    return ContactsStorage;
});