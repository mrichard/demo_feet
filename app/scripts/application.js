(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'views/item/navigation',
		'models/productModel',
		'views/composite/gridview'
	],

	function( Backbone, Communicator, Navigation, ProductModel, GridView ) {
		console.log("application.js setup");

		var App = new Backbone.Marionette.Application();

		/* Add application regions here */
		App.addRegions({
			navRegion: "#nav",
			contentRegion: "#content"
		});

		/* Add initializers here */
		App.addInitializer( function () {
			console.log("Marionette AMD application has started");

			// create the product model (note this has a nested resource collection hanging off it)
			var myModel = new ProductModel();

			// show the nav bar view
			this.navRegion.show( new Navigation({ model: myModel }) );

			// show the content region
			this.contentRegion.show( new GridView({ model: myModel, collection: myModel.resource }))
		});

		return App;
	});
}).call( this );