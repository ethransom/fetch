describe('Fetch', function(){
	beforeEach( function(){
		Fetch.loader('timeout', function( string, callback ){
			setTimeout( 0, callback );
		});
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
		});

		it('checks for the existance of a loader when called with only a loader name', function(){
			expect( Fetch.loader('timeout') ).to.be.ok();
			expect( Fetch.loader('doesNotExist') ).to.not.be.ok();
		});
	});
	
	describe('#on', function(){
		it('must be exposed', function(){
			expect( Fetch.on ).to.be.an('function');
		});
	});
	
	describe('#asset', function(){
		it('must be exposed', function(){
			expect( Fetch.asset ).to.be.an('function');
		});
	});
	
	describe('#load', function(){
		it('must be exposed', function(){
			expect( Fetch.load ).to.be.an('function');
		});
	});

	describe('#reset', function(){
		it('must be exposed', function(){
			expect( Fetch.reset ).to.be.an('function');
		});
	});
});