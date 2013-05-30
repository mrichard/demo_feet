(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'views/item/griditem',
		'hbs!tmpl/composite/gridview_tmpl'
	],
	function( Backbone, Griditem, GridviewTmpl  ) {

		/* Return a CompositeView class definition */
		return Backbone.Marionette.CompositeView.extend({
		
			initialize: function() {
				console.log("initialize a Gridview CompositeView");

				this.listenTo( this.model, 'change', this.render, this);
				this.listenTo( this.collection, 'sort', this.render, this);

				console.log( this );
			},
			
	    	itemView: Griditem,
	    	
	    	template: {
				type: 'handlebars',
				template: GridviewTmpl
			},	    	

	    	/* ui selector cache */
	    	ui: {
	    		tableBody: "tbody",
	    		bn: '#bn',
	    		pc: '#pc',
	    		dep: '#dep',
	    		div: '#div',
	    		grp: '#grp'
	    	},

	    	/* where are we appending the items views */
	    	appendHtml: function(collectionView, itemView, index){
				this.ui.tableBody.append(itemView.el);
			},

			/* Ui events hash */
			events: {
				'click th': 'handleSort'
			},

			/* on render callback */
			onRender: function() {},

			handleSort: function(e) {
				var id = $( e.currentTarget ).attr("id");
				console.log( id );
				this.collection.sortKey = id;

				this.collection.sort();

				console.log( this.collection );

			}
		});

	});
}).call( this );
