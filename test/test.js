'use strict';

// MODULES //

var tape = require( 'tape' );
var repeat = require( 'utils-repeat-string' );
var rpad = require( 'utils-right-pad-string' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var binaryString = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/bits_1e-200_1e-308.json' );
var medium = require( './fixtures/bits_-1e3_1e3.json' );
var large = require( './fixtures/bits_1e200_1e308.json' );
var subnormal = require( './fixtures/bits_1e-308_5e-324.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof binaryString === 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `+0`, the function returns a string of all zeros', function test( t ) {
	var expected = repeat( '0', 64 );
	t.equal( binaryString( 0 ), expected, 'returns all 0s' );
	t.end();
});

tape( 'if provided `-0`, the function returns a string of all zeros except for the sign bit', function test( t ) {
	var expected = rpad( '1', 64, '0' );
	t.equal( binaryString( -0 ), expected, 'returns all 0s except the sign bit' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns a string where all exponent bits are 1s and everything else are 0s', function test( t ) {
	var expected;

	expected = '0';
	expected += repeat( '1', 11 );
	expected += repeat( '0', 52 );

	t.equal( binaryString( pinf ), expected, 'returns bit string for +infinity' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns a string where the sign bit is 1, all exponent bits are 1s, and everything else are 0s', function test( t ) {
	var expected;

	expected = '1';
	expected += repeat( '1', 11 );
	expected += repeat( '0', 52 );

	t.equal( binaryString( ninf ), expected, 'returns bit string for -infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns a string where the sign bit may be either 1 or 0, all exponent bits are 1s, and the fraction cannot be all 0s', function test( t ) {
	var actual;
	var frac;
	var exp;

	exp = repeat( '1', 11 );
	frac = repeat( '0', 52 );

	actual = binaryString( NaN );

	t.ok( actual[0] === '0' || actual[1] === '1', 'sign bit is either 1 or 0' );
	t.equal( actual.substring( 1, 12 ), exp, 'all 1s for exponent' );
	t.notEqual( actual.substring( 12 ), frac, 'fraction does not equal all 0s' );
	t.end();
});

tape( 'the function returns literal bit representations for small values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = binaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for medium values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = binaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for large values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = binaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});

tape( 'the function returns literal bit representations for subnormal values', function test( t ) {
	var expected;
	var str;
	var x;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		str = binaryString( x[ i ] );
		t.equal( str, expected[ i ], 'returns bit literal for ' + x[ i ] );
	}
	t.end();
});
