define(function (require) {
    "use strict";

    var App = require("mbApp");
    var ContactsRouter = {};

    App.module('contacts', function (contacts, App, Backbone, Marionette, $, _) {

        ContactsRouter = Marionette.AppRouter.extend({
            appRoutes: {
                "contacts": "contacts"
            },

            route: function(route, name, callback) {
                return Backbone.Router.prototype.route.call(this, route, name, function() {
                    this.before();
                    callback.apply(this, arguments);
                });
            },

            before: function(){
                App.layoutController.changeSubLayout("contacts");
            }

        });
    });

    return ContactsRouter;
});



