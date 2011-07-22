/* snippets.js - just a collection of random js
*  If adding to this list via a pull reqeust, be sure to add your
*  name and the year, like:
*   added 2011 Jake Weary
*  Code in this file is unlicensed. Copy and paste away.
*/



/*
* circularMod - modulus with negative support for things like arrays
* added 2011 Dan Heberden
* e.g.
*   var test = [ 0, 1, 2, 3, 4, 5 ];
*   circularMod(   7, test.length ); // 1
*   circularMod(  -4, test.length ); // 2
*   circularMod( 141, test.length ); // 3
*   circularMod( -92, test.length ); // 4
*/
function circularMod( x, mod ) {
  return x < 0 ? mod - ( Math.abs( x ) % mod) : x % mod;
}

