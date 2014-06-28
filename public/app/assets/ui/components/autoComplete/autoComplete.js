define(function (require) {
    "use strict";

    var Marionette = require("marionette");
    var FilterCollectionDecorator = require("assets-decorators/FilterCollectionDecorator");
    var AutoCompleteModel = require("assets-ui-component/autoComplete/js/models/autoCompleteModel");
    var AutoCompleteItemView = require("assets-ui-component/autoComplete/js/views/AutoCompleteItemView");
    var AutoCompleteCompositeView = require("assets-ui-component/autoComplete/js/views/autoCompleteCompositeView");
    var AutoCompleteCollection = require("assets-ui-component/autoComplete/js/collections/autoCompleteCollection");
    var AutoCompleteFilterModel = require("assets-ui-component/autoComplete/js/models/autoCompleteFilterModel");

    var AutoComplete = Marionette.Controller.extend({

        initialize: function (options) {

            this.el = options.el;
            this.vent = options.vent;
            this.maxItems = options.maxItems || 5;
            this.filterModel = options.filterModel || new AutoCompleteFilterModel();
            this.collection = new FilterCollectionDecorator(new AutoCompleteCollection(options.items || []), this.filterModel);

            this.listenTo(this.vent, 'input:change', this.onInputChange, this);
        },

        //----------------------------------------------------
        // onFilterChange
        //----------------------------------------------------

        onInputChange: function (input, options) {

            options = options || {};

            if (_.isEmpty(input)) {
                this.collection.filterAll();
            } else {
                this.filterModel.setInput(input);
                this.collection.filterBy({
                    maxItems: this.maxItems,
                    mandatoryItems: options.addSearchKey ? [new AutoCompleteModel({text: input, value: input, type: AutoComplete.TYPES.SEARCH})] : []
                });
            }
        },

        //----------------------------------------------------
        // show
        //----------------------------------------------------

        show: function () {
            this.collection.filterAll();

            this.autoCompleteTableView = new AutoCompleteCompositeView({
                vent: this.vent,
                collection: this.collection,
                el: this.el
            });
            this.autoCompleteTableView.render();
        }
    });

    AutoComplete.TYPES = AutoCompleteItemView.TYPES;

    return AutoComplete;
});
