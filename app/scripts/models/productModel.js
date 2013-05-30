(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'collections/resources'
		], 
		function( Backbone, ResourceCollection ) {

			/* Return a model class definition */
			return Backbone.Model.extend({
				initialize: function() {
					console.log("initialize a ProductModel model");

					this.resource = new ResourceCollection( [] );
					this.on('change', this.setCollection, this);
				},

				defaults: {
					"pageNumber": 1
				},

				url: function() {
					return '/api/' + this.get("pageNumber");
				},

				setCollection: function() {
					var rawArray = this.get("resource");
					this.resource.set( rawArray );
					this.unset("resource", {silent: true});
				}

		});
	});
}).call( this );