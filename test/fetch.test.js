describe('Fetch', function(){
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
});