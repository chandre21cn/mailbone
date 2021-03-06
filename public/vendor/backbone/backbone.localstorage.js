(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["underscore", "backbone"], function (_, Backbone) {
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else {
        factory(_, Backbone);
    }
}(this, function (_, Backbone) {

    "use strict";

    var DELAY_TIME = 50;

    //**************************************
    // LocalStorage
    //**************************************

// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Hold reference to Underscore.js and Backbone.js in the closure in order
// to make things work even if they are removed from the global namespace

// Generate four random hex digits.
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

// Generate a pseudo-GUID by concatenating random hexadecimal.
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
    Backbone.LocalStorage = window.Store = function(name) {
        this.name = name;
        var store = this.localStorage().getItem(this.name);
        this.records = (store && store.split(",")) || [];
    };

    _.extend(Backbone.LocalStorage.prototype, {

        // Save the current state of the **Store** to *localStorage*.
        save: function() {
            this.localStorage().setItem(this.name, this.records.join(","));
        },

        // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
        // have an id of it's own.
        create: function(model) {
            if (!model.id) {
                model.id = guid();
                model.set(model.idAttribute, model.id);
            }
            this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
            this.records.push(model.id.toString());
            this.save();
            return this.find(model);
        },

        // Update a model by replacing its copy in `this.data`.
        update: function(model) {
            this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
            if (!_.include(this.records, model.id.toString()))
                this.records.push(model.id.toString()); this.save();
            return this.find(model);
        },

        // Retrieve a model from `this.data` by id.
        find: function(model) {
            return this.jsonData(this.localStorage().getItem(this.name+"-"+model.id));
        },

        // Return the array of all models currently in storage.
        findAll: function() {
            return _(this.records).chain()
                .map(function(id){
                    return this.jsonData(this.localStorage().getItem(this.name+"-"+id));
                }, this)
                .compact()
                .value();
        },

        // Delete a model from `this.data`, returning it.
        destroy: function(model) {
            if (model.isNew())
                return false
            this.localStorage().removeItem(this.name+"-"+model.id);
            this.records = _.reject(this.records, function(id){
                return id === model.id.toString();
            });
            this.save();
            return model;
        },

        destroyAll:function(collection){

        },

        localStorage: function() {
            return localStorage;
        },

        // fix for "illegal access" error on Android when JSON.parse is passed null
        jsonData: function (data) {
            return data && JSON.parse(data);
        }

    });


    //*********************************************
    // localSync
    //*********************************************


    var localSync = function (method, model, options) {

        var that = this, delayTime = DELAY_TIME;

        if (options && options.delayTime && _.isFinite(options.delayTime)) {
            delayTime = options.delayTime;
        }
        setTimeout(function () {
            execLocalSync.apply(that, [method, model, options]);
        }, delayTime);
    };

    //-------------------------------------------
    // execLocalSync
    //------------------------------------------

    var execLocalSync = function (method, model, options) {

        var store = model.localStorage || model.collection.localStorage;

        var resp, errorMessage, syncDfd = $.Deferred && $.Deferred(); //If $ is having Deferred - use it.

        try {
            switch (method) {
                case "read":
                    resp = model.id != undefined ? store.find(model) : store.findAll(model, options);
                    break;
                case "create":
                    resp = store.create(model);
                    break;
                case "update":
                    resp = model.id != undefined ? store.update(model) : store.updateBulk(model, options);
                    break;
                case "delete":
                    resp = model.id != undefined ? store.destroy(model) : store.destroyAll(model, options);
                    break;
            }

        } catch (error) {
            if (error.code === DOMException.QUOTA_EXCEEDED_ERR && window.localStorage.length === 0) {
                errorMessage = "Private browsing is unsupported";
            } else {
                errorMessage = error.message;
            }
        }

        //----------------------------------

        if (resp) {
            model.trigger("sync", model, resp, options);
            if (options && options.success) {
                if (Backbone.VERSION === "0.9.10") {
                    options.success(model, resp, options);
                } else {
                    options.success(resp);
                }
            }

            if (syncDfd) {
                syncDfd.resolve(resp);
            }
        } else {
            errorMessage = errorMessage ? errorMessage : "Record Not Found";

            model.trigger("error", model, errorMessage, options);
            if (options && options.error) {
                if (Backbone.VERSION === "0.9.10") {
                    options.error(model, errorMessage, options);
                } else {
                    options.error(errorMessage);
                }
            }
            if (syncDfd) {
                syncDfd.reject(errorMessage);
            }
        }

        if (options && options.complete) {
            options.complete(resp);
        }

        return syncDfd && syncDfd.promise();
    };


    //**********************************************
    // Override Backbone.sync
    //**********************************************


    var ajaxSync = Backbone.sync;

    var getSyncMethod = function (model) {
        if (model.localStorage || (model.collection && model.collection.localStorage)) {
            return localSync;
        }
        return ajaxSync;
    };

    Backbone.sync = function (method, model, options) {
        getSyncMethod(model).apply(this, [method, model, options]);
    };

    return Backbone.LocalStorage;
}));