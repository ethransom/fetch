/*
 * Fetch - A simple asset preloader
 * v1.0 - 3/13/2012
 * Copyright (c) 2012 Ethan Ransom
 * derethanhausen [at] gmail.com
 * Licensed under the MIT license
*/

var Fetch = (function () {
	var version = '1.0';

	// used to keep track of loading progress
	var toLoad = 0;
	var haveLoaded = 0;

	var assets = {};
	
	var loaders = {};
	
	// mini internal event system
	var subscribers = {};
	var on = function ( event, callback ) {
		// Subcribes callbacks to events
		if( !subscribers[event] )
			subscribers[event] = [];

		subscribers[event].push( callback );
	};
	var trigger = function ( event, arg ) {
		// Private. Used internally to trigger callbacks.
		if( !subscribers[event] )
			return;
			
		for( var i = 0; i < subscribers[event].length; i++ ) {
			subscribers[ event ][ i ]( arg );
		}
	};
	
	var updateLoader = function () {
		// Does the math necessary to update loader state. 
		// Calls the update callback to (presumably) update the GUI.
		// If the loading is complete, call the done callback.
		var percent = (haveLoaded / toLoad);

		trigger('update', percent );
		
		if( percent >= 1 )
			trigger('done');
	};
	
	var callback = function () {
		// called by loader functions when an asset is loaded
		haveLoaded++;
		updateLoader();
	}
	
	var load = function (list) {
		// Triggers the loading of assets using pre-defined "loader" functions.
		// See the README for example usage
		for( var type in list ) {
			assets[type] = {};
			if( loaders[type] ) {
					// each asset type has many sub assets, load each one using loader function
					for( var i = 0; i < list[type].length; i++ ) {
						assets[type][ list[type][i] ] = loaders[type]( list[type][i], callback );
						toLoad++;
					}
			} else {
				throw new Error("No loader for type: " + type );
			}
		}
		
		updateLoader();
	};
	
	var loader = function (name, loader) {
		if( name && !loader )
			return typeof loaders[name] !== "undefined";

		// defines a loader
		loaders[name] = loader;
	};
	
	var asset = function ( type, name ) {
		// Returns an asset. If the asset is not found, and there is a corresponding loader, it will load a "fresh" copy of the asset.
		a = false;
		try {
			// attempt to fetch the image from cache
			a = assets[type][name];
			if( !a )
				throw "Asset not in cache!";
		} catch (e) {
			// try to load a fresh one, or just die
			if( !loaders[type] )
				throw new Error("No loader for type: " + type );
			a = loaders[type]( name, function () {} );
			console.log( e + ' Loaded fresh: ' + name );
		}
		return a;
	};
	
	// resets Fetch to a pristine state
	// useful for testing
	var reset = function () {
		toLoad = 0;
		haveLoaded = 0;
		assets = {};
		subscribers = {};

		updateLoader();
	};

	// expose only public methods and vars
	return {
		'reset': reset,
		'version': version,
		'load': load,
		'loader': loader,
		'asset': asset,
		'on': on
	};
})();

// Pre-implemented loader functions for commonly used asset types (images and scripts)

Fetch.loader('image',function ( url, callback ) {
	var img = new Image();
	img.onload = callback;
	img.src = url;
	return img;
});

Fetch.loader('script', function ( url, callback ) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.onreadystatechange = function () {
		if (this.readyState === 'complete') 
			callback();
	}
	script.onload = callback;
	script.src = url;
	head.appendChild(script);
	return true;
});