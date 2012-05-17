#Fetch - A simple asset preloader

----------

Loading of assets with fetch is done with `loader` functions. Fetch has two loaders included: 

- `script` - Used for loading scripts
- `image` - Used for loading images

Writing your own loaders enables you to load just about anything, in any way you want to:

	Fetch.loader('sound',function (url, callback) {
		// We'll see where the url param comes from in a moment
		var a = new Audio();
		a.src = url;

		// The callback param is a function that should 
		// be called when this particullar asset is loaded
		a.addEventListener('canplaythrough', callback, false);

		// Returning the asset will allow us to use it later
		return a;
	});

The loading of assets is triggered thusly:

	Fetch.load({
		'sound': [	// name of the loader to use
			'sounds/bark.ogg',	// path to the asset
			'sounds/meow.ogg'	// These are passed to the loader
		]
	});

Once assets have been loaded, they will need to be worked with. Accessing assets is as easy as:

	Fetch.asset('type','original/asset/path');

If we were to use the sound example, our code would look like this:

	Fetch.asset('sound','sounds/bark.ogg');
	// Returns an Audio object, ready to be played

You will probably want to display some sort of progress to the user (think GMail). 

	Fetch.on('update', function ( progress ) {
		// progress is a percent value, eg: .59 for 59%
		$('#progress').width( progress * 500 );
	});

You can be notified when all the assets are done loading and ready to be used.

	Fetch.on('done', function () {
		// Launch your code here
	});

If you ever need it, calling `Fetch.reset` will reset Fetch to its original state.

Check out `demo.html` for a complete example.

----------

> Copyright (c) 2012 Ethan Ransom. MIT Licensed.