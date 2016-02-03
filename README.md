Bits
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns a string giving the literal bit representation of a [double-precision floating-point number][ieee754].


## Installation

``` bash
$ npm install math-float64-bits
```


## Usage

``` javascript
var bits = require( 'math-float64-bits' );
```

#### bits( x )

Returns a `string` giving the literal bit representation of a [double-precision floating-point number][ieee754].

``` javascript
var str = bits( 4 );
// returns '0100000000010000000000000000000000000000000000000000000000000000'

str = bits( Math.PI );
// returns '0100000000001001001000011111101101010100010001000010110100011000'

str = bits( -1e308 );
// returns '1111111111100001110011001111001110000101111010111100100010100000'
```

The `function` handles [subnormals][subnormals].

``` javascript
str = bits( -3.14e-320 );
// returns '1000000000000000000000000000000000000000000000000001100011010011'

str = bits( 5e-324 );
// returns '0000000000000000000000000000000000000000000000000000000000000001'
```

The `function` handles special values.

``` javascript
str = bits( 0 );
// returns '0000000000000000000000000000000000000000000000000000000000000000'

str = bits( -0 );
// returns '1000000000000000000000000000000000000000000000000000000000000000'

str = bits( NaN );
// returns '0111111111111000000000000000000000000000000000000000000000000000'

str = bits( Number.POSITIVE_INFINITY );
// returns '0111111111110000000000000000000000000000000000000000000000000000'

str = bits( Number.NEGATIVE_INFINITY );
// returns '1111111111110000000000000000000000000000000000000000000000000000'
```


## Examples

``` javascript
var round = require( 'math-round' );
var pow = require( 'math-power' );
var smallest = require( 'const-smallest-float64' );
var bits = require( 'math-float64-bits' );

var frac;
var sign;
var exp;
var b;
var x;
var i;

// Convert random numbers to literal bit representations...
for ( i = 0; i < 100; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	frac = Math.random() * 10;
	exp = round( Math.random()*100 );
	if ( Math.random() < 0.5 ) {
		exp = -exp;
	}
	x = sign * frac * pow( 2, exp );
	b = bits( x );
	console.log( b );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float64-bits.svg
[npm-url]: https://npmjs.org/package/math-float64-bits

[build-image]: http://img.shields.io/travis/math-io/float64-bits/master.svg
[build-url]: https://travis-ci.org/math-io/float64-bits

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float64-bits/master.svg
[coverage-url]: https://codecov.io/github/math-io/float64-bits?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float64-bits.svg
[dependencies-url]: https://david-dm.org/math-io/float64-bits

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float64-bits.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float64-bits

[github-issues-image]: http://img.shields.io/github/issues/math-io/float64-bits.svg
[github-issues-url]: https://github.com/math-io/float64-bits/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[ieee754]: https://en.wikipedia.org/wiki/IEEE_754-1985
[subnormals]: https://en.wikipedia.org/wiki/Denormal_number
