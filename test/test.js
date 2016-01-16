'use strict';

// MODULES //

var test = require( 'tape' );
var bits = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof bits === 'function', 'main export is a function' );
	t.end();
});
