/*!
* snippets.js - just a collection of random js
*  If adding to this list via a pull reqeust, be sure to add your
*  name and/or github name, and the year, like:
*   added 2011 Jake Weary (jakeweary)
*  Code in this file is unlicensed. Copy and paste away.
*/



/*!
* circularMod - modulus with negative support for things like arrays
* added 2011 Dan Heberden (danheberden)
* updated by Corey Frang (gnarf37)
* e.g.
*   var test = [ 0, 1, 2, 3, 4, 5 ];
*   circularMod(   7, test.length ); // 1
*   circularMod(  -4, test.length ); // 2
*   circularMod( 141, test.length ); // 3
*   circularMod( -92, test.length ); // 4
*/
function circularMod( value, mod ) {
    value %= mod;
    return value < 0 ? mod + value : value;
}


/*!
* parseColor - Parse a color
* added 2011 Alex Wilson(arexkun)
* e.g.
*   parseColor("rgb(255,127,0)") //[255,127,0]
*   parseColor("#FF7F00") //[255,127,0]
*   parseColor("hsl(30,100%,50%)") //[255,127.5,0]
*/
parseColor=function(cache, t) {
    function d(a, b, c, v) {

        v=a+(b-a);

        c+=~c?c>1?-1:0:1;
        return (c < 1 / 6 ? v * 6 * c : c < .5 ? b : c < 2 / 3 ? v * (2 / 3 - c) * 6 : a)*255;
    }
    return function (color, f, g, h, i) {
        return cache[color] = cache[color] ||
          (/^r/.test(color))? (i=color.slice(4,-1).split(","), [+i[0], +i[1], +i[2]])
        : /^#/.test(color)? (color = + ("0x" + color.slice(1)), [color % t, (color /= t) % t, (color /= t) % t].reverse())
        : (color=/l\((\d+),(\d+),(\d+)/.exec(color)) ? (g = +color[1] / 360, h = +color[2] / 100, i = color[3] / 100, h == 0 ? [i, i, i]
        : (h = i < .5 ? i * (1 + h) : i + h - i * h, i = 2 * i - h, [d(i, h, g + 1 / 3), d(i, h, g), d(i, h, g - 1 / 3)]))
        : [0, 0, 0]
    }
}({},256);


/*!
* numLexSort - Sorts numbers numerically, the rest lexicographically
* added 2011 Dan Heberden (danheberden)
* demo http://jsfiddle.net/danheberden/jBsNd/
* e.g.
*   var test = [ 9, "23zy", "9c", "bar", "9a", "23", "foo", [0,1], -4 ];
*   sorted = test.sort( numLexSort );
*   // results [ -4, 9, "9a", "9c", "23", "23zy", "bar", "foo", [0,1] ];
*/
var numLexSort = (function( undefined ) {
  var rSep = /^(-?\d+)?([^\d]+)?$/,
      rValid = /(st|mb)/;
  return function( a, b ) {
    var vA = rValid.test( typeof a ),
        vB = rValid.test( typeof b ),
        vLex = !vA && !vB && [ a, b ].sort()[0],
        sA = vA && ( "" + a ).match( rSep ),
        sB = vB && ( "" + b ).match( rSep ),
        sLex = sA && sB && ( sA[2] !== sB[2] ) &&
                  ( sA[2] === undefined ? sA[2] :
                    sB[2] === undefined ? sB[2] :
                    [ sA[2], sB[2] ].sort()[0] ),
        sNum = sA && sB && ( sA[1] === undefined && sB[1] !== undefined  ? 1 :
                             sB[1] === undefined && sA[1] !== undefined  ? -1 :
                             sA[1] - sB[1] );
        return ( !vA && !vB ) ? vLex === a ? -3 : 3 :
                !vA ? 3 :
                !vB ? -3 :
                sNum ? sNum :
                sLex === sA[2] ? -2 :
                sLex === sB[2] ? 2 : 0;
  };
})();


/*!
 * isPrime - Determines if provided number is prime or not
 * added 2011 Dan Heberden (danheberden)
 * Special thanks to @gnarf37
 * @param Number number to check for prime
 * @return Boolean true if number is prime, false if not
 */
function isPrime( num ) {
  for ( var limit = Math.floor( Math.sqrt( num ) ), check = 2; check <= limit; check++ ) {
    if ( !( num % check ) ) {
      return false;
    }
  }
  return num > 1;
}

/*!
 * pad - Pads a string or number to a set length
 * added 2011 Dan Heberden (danheberden)
 * @param wat What to to pad
 * @param len How many chars/spaces/whatever to pad
 * @param padWith What to pad with (falsy pads with 0)
 * @param clip Clip the result to len chars
 * @return String Padded/Clipped string of wat
 *
 * example:
 *    pad( 123, 5 ); // 00123
 *    pad( 9, 3, "-" ); // --9
 *    pad( 12345, 2 ); // 12345
 *    pad( 12345, 2, 0, true ); // 12
 */
function pad( wat, len, padWith, clip ) {
  // get how many chars to pad & make num a string
  len -= (wat += "").length;
  // build the string of n+1 necessary pad chars
  return new Array( len > 0 ? len+1 : 0 ).join( padWith || 0 ) +
    // if clipping (we're at a negative len) slice it
    (clip ? [].slice.call( wat, 0, len ).join('') : wat);
}
