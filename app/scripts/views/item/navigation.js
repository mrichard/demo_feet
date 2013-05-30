(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'hbs!tmpl/item/navigation_tmpl'
	],
	function( Backbone, NavigationTmpl  ) {

		/* Return a ItemView class definition */
		return Backbone.Marionette.ItemView.extend({
		
			initialize: function() {
				console.log("initialize a Navigation ItemView");
			},
			
	    	template: {
				type: 'handlebars',
				template: NavigationTmpl
			},

	    	/* ui selector cache */
	    	ui: {
	    		input: "input"
	    	},

			/* Ui events hash */
			events: {
				"click button": "handleSubmit"
			},

			/* on render callback */
			onRender: function() {},

			handleSubmit: function( e ){
				console.log("handleSubmit")
				e.preventDefault();

				this.model.set( "pageNumber", this.ui.input.val() );

				this.model.fetch({
					success: function( model ) {
						console.log("fetch complete");
						console.log( model );
					}
				});
				
			}
		});

	});
}).call( this );