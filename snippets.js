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


/*
* parseColor - Parse a color
* added 2011 Alex Wilson(arexkun)
* e.g.
*   parseColor("rgb(255,127,0)") //[255,127,0]
*   parseColor("#FF7F00") //[255,127,0]
*   parseColor("hsl(30,100%,50%)") //[255,127.5,0]
*/
parseColor=function(cache, t) {
    function d(a, b, c) {
        return (c += c < 0 ? 1 : c > 1 ? -1 : 0, c < 1 / 6 ? a + (b - a) * 6 * c : c < .5 ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a) * 255
    }
    return function (color, f, g, h, i) {
        return cache[color] = cache[color] ||
          /rgba?\((.+)\)/.test(color)? (color = b.exec(color)[1].split(","), [~~color[0], ~~color[1], ~~color[2]])
        : /^#/.test(color)? (color = ~~ ("0x" + color.slice(1)), [color % t, (color /= t, color % t), (color /= t, color % t)].reverse())
        : (color=/hsla?\(([0-9]+),([0-9]+)%?,([0-9]+)%?/.exec(color)) ? (g = +color[1] / 360, h = +color[2] / 100, i = color[3] / 100, h == 0 ? [i, i, i]
        : (h = i < .5 ? i * (1 + h) : i + h - i * h, i = 2 * i - h, [d(i, h, g + 1 / 3), d(i, h, g), d(i, h, g - 1 / 3)]))
        : [0, 0, 0]
    }
}({},256)