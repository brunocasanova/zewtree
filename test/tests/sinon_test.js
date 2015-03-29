var chai = require( 'chai' );

chai.should();

var sinon = require( 'sinon' );

var Test = {
	do: function( thing ){
		return "no"
	}
};

describe( 'sinon', function(){

	it( 'should stub a method', function(){
		Test.do( "thing" ).should.equal( "no" );

		sinon.stub( Test, "do", function(){
			return "yes";
		});

		Test.do( "thing" ).should.equal( "yes" );

		Test.do.restore();
		Test.do( "thing" ).should.equal( "no" );
	});

	it( 'should validate if a function is called', function(){
		sinon.stub( Test, "do", function(){
			return "yes";
		});

		Test.do.calledOnce.should.be.false

		Test.do( "thing" ).should.equal( "yes" );
		Test.do.calledOnce.should.be.true;

		Test.do.restore();
	});

	it( 'should validate a functions parameters', function(){

		sinon.stub( Test, "do", function ( thing ){
			thing.should.equal( "thing" );
			return "yes";
		});

		Test.do( "thing" ).should.equal( "yes" );
		Test.do.calledOnce.should.be.true;

		Test.do.restore();
	});

});