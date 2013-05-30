(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/griditem_tmpl'
	],
	function( Backbone, GriditemTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Griditem ItemView");
			},
			
			tagName: 'tr',

	    	template: {
				type: 'handlebars',
				template: GriditemTmpl
			},

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {
				"click .p-code": "handleItemClick"
			},

			/* on render callback */
			onRender: function() {},

			handleItemClick: function( e ) {
				e.preventDefault();

				console.log("clicked product code: " + this.model.get("product_code"));
			}
		});

	});
}).call( this );