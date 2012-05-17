describe('Fetch', function(){
	beforeEach( function(){
		Fetch.loader('string', function( string, callback ){
			callback();
			
			return string;
		});
		
		Fetch.loader('neverLoads', function(){} );
	});

	afterEach( function(){
		Fetch.reset();
	});

	it('has a version number', function(){
		expect( Fetch.version ).to.match(/[0-9]+\.[0-9]+/);
	});
	
	describe('#loader', function(){
		it('must be exposed', function(){
			expect(Fetch.loader).to.be.an('function');
		});
		
		it('must create a functional loader', function(){
			Fetch.loader('test', function(string, callback){
				callback();
			});

			expect( Fetch.loader('test') ).to.be.ok();
		});

		it('checks for the existance of a loader when called with only a loader name', function(){
			expect( Fetch.loader('string') ).to.be.ok();
			expect( Fetch.loader('doesNotExist') ).to.not.be.ok();
		});
	});
	
	describe('#on', function(){
		it('must be exposed', function(){
			expect( Fetch.on ).to.be.an('function');
		});
		
		describe('done event', function(){
			it('must trigger when all assets have finished loading', function(done){
				Fetch.on('done', done);
				
				Fetch.load({
					'string': ['a','b','c','d']
				});
			});
		});
		
		describe('update event', function(){
			it('must trigger with a 100 percent value when loading is complete', function(done){
				var doneLoading = false;
				Fetch.on('done', function(){
					doneLoading = true;
				});
				
				Fetch.on('update', function(percent){
					if ( doneLoading ) {
						expect( percent ).to.be(1);
					}
				});
				
				Fetch.load({
					'string': ['a','b','c']
				});
			});			
			
			it('must trigger each time an asset loads and when load is called', function(done){
				var assetsLoaded = 0;
				var assets = ['a','b','c'];
				
				Fetch.on('update', function(percent){
					assetsLoaded++;
				});
				
				Fetch.on('done', function(){
					expect( assetsLoaded ).to.equal( assets.length + 1 ); 
				});
				
				Fetch.load({
					'string': assets
				});
			});
		});
	});
	
	describe('#asset', function(){
		it('must be exposed', function(){
			expect( Fetch.asset ).to.be.an('function');
		});
		
		it('must retrive an asset', function(){
			var s = 'foo';

			Fetch.load({
				'string': [s]
			}); 
			
			expect( Fetch.asset('string',s) ).to.equal(s);
		});
	});
	
	describe('#load', function(){
		it('must be exposed', function(){
			expect( Fetch.load ).to.be.an('function');
		});

		it('must correctly trigger the loading of assets', function(done){
			Fetch.on('done', done);
 
			Fetch.load({
				'string': ['foo']
			}); 
		});
	});

	describe('#reset', function(){
		it('must be exposed', function(){
			expect( Fetch.reset ).to.be.an('function');
		});
		
		it('must clear all assets', function(){
		});
	});
});

describe('Included Loaders', function(){
	it('must include script, and image', function() {
		expect( Fetch.loader('image') ).to.be.ok();
		expect( Fetch.loader('script') ).to.be.ok();
	});

	describe('image', function(){
		it('must load a remote image', function(done){
			Fetch.on('done', done);

			Fetch.load({
				'image': ['http://upload.wikimedia.org/wikipedia/en/7/7b/Image_in_Glossographia.png']
			}); 
		});		

		it('must load a local image', function(done){
			Fetch.on('done', done);

			Fetch.load({
				'image': ['fixtures/chicken.jpg']
			}); 
		});
	});
	
	describe('script', function(){
		it('must load a remote script', function(done){
			Fetch.on('done', done);

			Fetch.load({
				'script': ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js']
			}); 
		});		
		
		it('must load a local script', function(done){
			Fetch.on('done', done);

			Fetch.load({
				'script': ['fixtures/pi.js']
			}); 
		});
	});
});