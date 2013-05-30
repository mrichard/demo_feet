(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone'
		], 
		function( Backbone ) {

			/* Return a collection class definition */
			return Backbone.Collection.extend({
				initialize: function() {
					console.log("initialize a Resources collection");
				},

				comparator: function( item ) {
					console.log( item.collection.sortKey );
					return item.get( item.collection.sortKey );
				}
	  		});
	});
}).call( this );
