var murmurhashJs = {exports: {}};

var murmurhash3_gc = {exports: {}};

/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash 
 */

(function (module) {
	function murmurhash3_32_gc(key, seed) {
		var remainder, bytes, h1, h1b, c1, c2, k1, i;
		
		remainder = key.length & 3; // key.length % 4
		bytes = key.length - remainder;
		h1 = seed;
		c1 = 0xcc9e2d51;
		c2 = 0x1b873593;
		i = 0;
		
		while (i < bytes) {
		  	k1 = 
		  	  ((key.charCodeAt(i) & 0xff)) |
		  	  ((key.charCodeAt(++i) & 0xff) << 8) |
		  	  ((key.charCodeAt(++i) & 0xff) << 16) |
		  	  ((key.charCodeAt(++i) & 0xff) << 24);
			++i;
			
			k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
			k1 = (k1 << 15) | (k1 >>> 17);
			k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

			h1 ^= k1;
	        h1 = (h1 << 13) | (h1 >>> 19);
			h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
			h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
		}
		
		k1 = 0;
		
		switch (remainder) {
			case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
			case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
			case 1: k1 ^= (key.charCodeAt(i) & 0xff);
			
			k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
			k1 = (k1 << 15) | (k1 >>> 17);
			k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
			h1 ^= k1;
		}
		
		h1 ^= key.length;

		h1 ^= h1 >>> 16;
		h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= h1 >>> 13;
		h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
		h1 ^= h1 >>> 16;

		return h1 >>> 0;
	}

	{
	  module.exports = murmurhash3_32_gc;
	} 
} (murmurhash3_gc));

var murmurhash3_gcExports = murmurhash3_gc.exports;

var murmurhash2_gc = {exports: {}};

/**
 * JS Implementation of MurmurHash2
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} str ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */

(function (module) {
	function murmurhash2_32_gc(str, seed) {
	  var
	    l = str.length,
	    h = seed ^ l,
	    i = 0,
	    k;
	  
	  while (l >= 4) {
	  	k = 
	  	  ((str.charCodeAt(i) & 0xff)) |
	  	  ((str.charCodeAt(++i) & 0xff) << 8) |
	  	  ((str.charCodeAt(++i) & 0xff) << 16) |
	  	  ((str.charCodeAt(++i) & 0xff) << 24);
	    
	    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	    k ^= k >>> 24;
	    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

		h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

	    l -= 4;
	    ++i;
	  }
	  
	  switch (l) {
	  case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
	  case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
	  case 1: h ^= (str.charCodeAt(i) & 0xff);
	          h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	  }

	  h ^= h >>> 13;
	  h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	  h ^= h >>> 15;

	  return h >>> 0;
	}

	{
	  module.exports = murmurhash2_32_gc;
	} 
} (murmurhash2_gc));

var murmurhash2_gcExports = murmurhash2_gc.exports;

var murmur3 = murmurhash3_gcExports;
var murmur2 = murmurhash2_gcExports;

murmurhashJs.exports = murmur3;
var murmur3_1 = murmurhashJs.exports.murmur3 = murmur3;
murmurhashJs.exports.murmur2 = murmur2;

/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.

 Copyright (c) 2022 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

// 
const F2 =  0.5 * (Math.sqrt(3.0) - 1.0);
const G2 =  (3.0 - Math.sqrt(3.0)) / 6.0;
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
// I'm really not sure why this | 0 (basically a coercion to int)
// is making this faster but I get ~5 million ops/sec more on the
// benchmarks across the board or a ~10% speedup.
const fastFloor = (x) => Math.floor(x) | 0;
const grad2 = /*#__PURE__*/ new Float64Array([1, 1,
    -1, 1,
    1, -1,
    -1, -1,
    1, 0,
    -1, 0,
    1, 0,
    -1, 0,
    0, 1,
    0, -1,
    0, 1,
    0, -1]);
// double seems to be faster than single or int's
// probably because most operations are in double precision
const grad3 = /*#__PURE__*/ new Float64Array([1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,
    -1, 0, -1,
    0, 1, 1,
    0, -1, 1,
    0, 1, -1,
    0, -1, -1]);
/**
 * Creates a 2D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction2D}
 */
function createNoise2D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating this yields a little ~3% performance improvement.
    const permGrad2x = new Float64Array(perm).map(v => grad2[(v % 12) * 2]);
    const permGrad2y = new Float64Array(perm).map(v => grad2[(v % 12) * 2 + 1]);
    return function noise2D(x, y) {
        // if(!isFinite(x) || !isFinite(y)) return 0;
        let n0 = 0; // Noise contributions from the three corners
        let n1 = 0;
        let n2 = 0;
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * F2; // Hairy factor for 2D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else {
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = ii + perm[jj];
            const g0x = permGrad2x[gi0];
            const g0y = permGrad2y[gi0];
            t0 *= t0;
            // n0 = t0 * t0 * (grad2[gi0] * x0 + grad2[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
            n0 = t0 * t0 * (g0x * x0 + g0y * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = ii + i1 + perm[jj + j1];
            const g1x = permGrad2x[gi1];
            const g1y = permGrad2y[gi1];
            t1 *= t1;
            // n1 = t1 * t1 * (grad2[gi1] * x1 + grad2[gi1 + 1] * y1);
            n1 = t1 * t1 * (g1x * x1 + g1y * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = ii + 1 + perm[jj + 1];
            const g2x = permGrad2x[gi2];
            const g2y = permGrad2y[gi2];
            t2 *= t2;
            // n2 = t2 * t2 * (grad2[gi2] * x2 + grad2[gi2 + 1] * y2);
            n2 = t2 * t2 * (g2x * x2 + g2y * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
    };
}
/**
 * Creates a 3D noise function
 * @param random the random function that will be used to build the permutation table
 * @returns {NoiseFunction3D}
 */
function createNoise3D(random = Math.random) {
    const perm = buildPermutationTable(random);
    // precalculating these seems to yield a speedup of over 15%
    const permGrad3x = new Float64Array(perm).map(v => grad3[(v % 12) * 3]);
    const permGrad3y = new Float64Array(perm).map(v => grad3[(v % 12) * 3 + 1]);
    const permGrad3z = new Float64Array(perm).map(v => grad3[(v % 12) * 3 + 2]);
    return function noise3D(x, y, z) {
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y + z) * F3; // Very nice and simple skew factor for 3D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0; // The x,y,z distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // X Y Z order
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // X Z Y order
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        }
        else { // x0<y0
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Z Y X order
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Y Z X order
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = ii + perm[jj + perm[kk]];
            t0 *= t0;
            n0 = t0 * t0 * (permGrad3x[gi0] * x0 + permGrad3y[gi0] * y0 + permGrad3z[gi0] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1]];
            t1 *= t1;
            n1 = t1 * t1 * (permGrad3x[gi1] * x1 + permGrad3y[gi1] * y1 + permGrad3z[gi1] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2]];
            t2 *= t2;
            n2 = t2 * t2 * (permGrad3x[gi2] * x2 + permGrad3y[gi2] * y2 + permGrad3z[gi2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = ii + 1 + perm[jj + 1 + perm[kk + 1]];
            t3 *= t3;
            n3 = t3 * t3 * (permGrad3x[gi3] * x3 + permGrad3y[gi3] * y3 + permGrad3z[gi3] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
    };
}
/**
 * Builds a random permutation table.
 * This is exported only for (internal) testing purposes.
 * Do not rely on this export.
 * @private
 */
function buildPermutationTable(random) {
    const tableSize = 512;
    const p = new Uint8Array(tableSize);
    for (let i = 0; i < tableSize / 2; i++) {
        p[i] = i;
    }
    for (let i = 0; i < tableSize / 2 - 1; i++) {
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    for (let i = 256; i < tableSize; i++) {
        p[i] = p[i - 256];
    }
    return p;
}

class Registry {
    data;
    constructor() {
        this.data = new Map();
    }
    entries() {
        return this.data.entries();
    }
    get(identifier) {
        return this.data.get(identifier);
    }
    register(identifier, object) {
        this.data.set(identifier, object);
    }
    keys() {
        return this.data.keys();
    }
    values() {
        return this.data.values();
    }
    async setup() {
    }
}

class IndexedRegistry extends Registry {
    idsToItems = new Map();
    get(id) {
        if (typeof id == 'string')
            return super.get(id);
        return this.idsToItems.get(id);
    }
    async setup() {
        this.idsToItems = new Map();
        let id = 0;
        for (const [name, item] of this.entries()) {
            item.bindRegistryKeys(id, name);
            this.idsToItems.set(id, item);
            id++;
        }
    }
}

var Registries;
(function (Registries) {
    Registries.blocks = new IndexedRegistry();
    Registries.entities = new Registry();
    Registries.fields = new Registry();
    Registries.textures = new IndexedRegistry();
    Registries.blockModels = new IndexedRegistry();
})(Registries || (Registries = {}));

var MathUtils;
(function (MathUtils) {
    function map(value, min, max, newMin, newMax) {
        return (value - min) * (newMax - newMin) / (max - min) + newMin;
    }
    MathUtils.map = map;
})(MathUtils || (MathUtils = {}));

class Vector2D {
    x;
    y;
    constructor(x = 0, y = 0) {
        if (typeof x !== 'number')
            throw new TypeError('x must be a number');
        if (typeof y !== 'number')
            throw new TypeError('y must be a number');
        if (isNaN(x))
            throw new TypeError('x must not be NaN');
        if (isNaN(y))
            throw new TypeError('y must not be NaN');
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x + x, this.y + y);
            }
            else {
                return this._set(this.x + x, this.y + x);
            }
        }
        else {
            return this._set(this.x + x.x, this.y + x.y);
        }
    }
    subtract(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x - x, this.y - y);
            }
            else {
                return this._set(this.x - x, this.y - x);
            }
        }
        else {
            return this._set(this.x - x.x, this.y - x.y);
        }
    }
    reverseSubtract(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x - this.x, y - this.y);
            }
            else {
                return this._set(x - this.x, x - this.y);
            }
        }
        else {
            return this._set(x.x - this.x, x.y - this.y);
        }
    }
    complexMultiply(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x - this.y * y, this.x * y + this.y * x);
            }
            else {
                return this._set(this.x * x, this.y * x);
            }
        }
        else {
            return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x);
        }
    }
    scalarMultiply(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x, this.y * y);
            }
            else {
                return this._set(this.x * x, this.y * x);
            }
        }
        else {
            return this._set(this.x * x.x, this.y * x.y);
        }
    }
    scalarDivide(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x / x, this.y / y);
            }
            else {
                return this._set(this.x / x, this.y / x);
            }
        }
        else {
            return this._set(this.x / x.x, this.y / x.y);
        }
    }
    reverseScalarDivide(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x / this.x, y / this.y);
            }
            else {
                return this._set(x / this.x, x / this.y);
            }
        }
        else {
            return this._set(x.x / this.x, x.y / this.y);
        }
    }
    dot(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this.x * x + this.y * y;
            }
            else {
                return this.x * x + this.y * x;
            }
        }
        else {
            return this.x * x.x + this.y * x.y;
        }
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return Math.sqrt(this.distanceSquaredTo(x, y));
            }
            else {
                return Math.sqrt(this.distanceSquaredTo(x, x));
            }
        }
        else {
            return Math.sqrt(this.distanceSquaredTo(x.x, x.y));
        }
    }
    distanceSquaredTo(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
            }
            else {
                return (this.x - x) * (this.x - x) + (this.y - x) * (this.y - x);
            }
        }
        else {
            return (this.x - x.x) * (this.x - x.x) + (this.y - x.y) * (this.y - x.y);
        }
    }
    normalize() {
        return this.scalarDivide(this.length());
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    toString() {
        return `${this.constructor.name} { ${this.x}, ${this.y} }`;
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

class ImmutableVector2D extends Vector2D {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
    _set(x, y) {
        return new ImmutableVector2D(x, y);
    }
    set(x, y) {
        throw new Error("Cannot set immutable vector");
    }
}

class Vector3 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    set(x, y, z) {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        else {
            throw new TypeError("Invalid arguments");
        }
        return this;
    }
    add(x, y, z) {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x += x;
            this.y += y;
            this.z += z;
        }
        else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x += x.x;
            this.y += x.y;
            this.z += x.z;
        }
        else {
            throw new TypeError("Invalid arguments");
        }
        return this;
    }
    plus(x, y, z) {
        return this.clone().add(x, y, z);
    }
    subtract(x, y, z) {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }
        else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x -= x.x;
            this.y -= x.y;
            this.z -= x.z;
        }
        else {
            throw new TypeError("Invalid arguments");
        }
        return this;
    }
    minus(x, y, z) {
        return this.clone().subtract(x, y, z);
    }
    multiply(x, y, z) {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x *= x;
            this.y *= y;
            this.z *= z;
        }
        else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x *= x.x;
            this.y *= x.y;
            this.z *= x.z;
        }
        else if (typeof x == "number" && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x *= x;
            this.y *= x;
            this.z *= x;
        }
        else {
            throw new TypeError("Invalid arguments");
        }
        return this;
    }
    times(x, y, z) {
        return this.clone().multiply(x, y, z);
    }
    divide(x, y, z) {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            this.x /= x;
            this.y /= y;
            this.z /= z;
        }
        else if (x instanceof Vector3 && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x /= x.x;
            this.y /= x.y;
            this.z /= x.z;
        }
        else if (typeof x == "number" && typeof y == 'undefined' && typeof z == 'undefined') {
            this.x /= x;
            this.y /= x;
            this.z /= x;
        }
        else {
            throw new TypeError("Invalid arguments");
        }
        return this;
    }
    over(x, y, z) {
        return this.clone().divide(x, y, z);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    normalize() {
        this.divide(this.length());
        return this;
    }
    unit() {
        return this.clone().normalize();
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
    static from(vector2, format) {
        return new Vector3(!isNaN(+format[0]) ? +format[0] : vector2[format[0]], !isNaN(+format[1]) ? +format[1] : vector2[format[1]], !isNaN(+format[2]) ? +format[2] : vector2[format[2]]);
    }
    equals(other, epsilon) {
        if (typeof epsilon == 'number')
            return Math.abs(this.x - other.x) <= epsilon && Math.abs(this.y - other.y) <= epsilon && Math.abs(this.z - other.z) <= epsilon;
        else
            return this.x == other.x && this.y == other.y && this.z == other.z;
    }
}
(function (Vector3) {
    class Handled {
        vector;
        listeners;
        constructor(vector, ...listeners) {
            this.vector = vector;
            this.listeners = listeners;
        }
        sendUpdate(original) {
            for (const listener of this.listeners) {
                listener(original, this);
            }
        }
        on(event, listener) {
            this.listeners.push(listener);
            return this;
        }
        get x() {
            return this.vector.x;
        }
        get y() {
            return this.vector.y;
        }
        get z() {
            return this.vector.z;
        }
        set x(value) {
            this.vector.x = value;
        }
        set y(value) {
            this.vector.y = value;
        }
        set z(value) {
            this.vector.z = value;
        }
        set(x, y, z) {
            const original = this.vector.clone();
            this.vector.set(x, y, z);
            this.sendUpdate(original);
            return this;
        }
        add(x, y, z) {
            const original = this.vector.clone();
            this.vector.add(x, y, z);
            this.sendUpdate(original);
            return this;
        }
        plus(x, y, z) {
            return this.vector.plus(x, y, z);
        }
        subtract(x, y, z) {
            const original = this.vector.clone();
            this.vector.subtract(x, y, z);
            this.sendUpdate(original);
            return this;
        }
        minus(x, y, z) {
            return this.vector.minus(x, y, z);
        }
        multiply(x, y, z) {
            const original = this.vector.clone();
            this.vector.multiply(x, y, z);
            this.sendUpdate(original);
            return this;
        }
        times(x, y, z) {
            return this.vector.times(x, y, z);
        }
        divide(x, y, z) {
            const original = this.vector.clone();
            this.vector.divide(x, y, z);
            this.sendUpdate(original);
            return this;
        }
        over(x, y, z) {
            return this.vector.over(x, y, z);
        }
        dot(vector) {
            return this.vector.dot(vector);
        }
        length() {
            return this.vector.length();
        }
        lengthSquared() {
            return this.vector.lengthSquared();
        }
        normalize() {
            const original = this.vector.clone();
            this.vector.normalize();
            this.sendUpdate(original);
            return this;
        }
        unit() {
            return this.vector.unit();
        }
        *[Symbol.iterator]() {
            yield this.vector.x;
            yield this.vector.y;
            yield this.vector.z;
        }
        clone() {
            return this.vector.clone();
        }
        toString() {
            return this.vector.toString();
        }
        equals(other, epsilon) {
            return this.vector.equals(other, epsilon);
        }
    }
    Vector3.Handled = Handled;
    function handle(vector) {
        return new Handled(vector);
    }
    Vector3.handle = handle;
    function immutable(vector) {
        return new Handled(vector, () => {
            throw new Error("Cannot modify immutable vector");
        });
    }
    Vector3.immutable = immutable;
    function validated(vector) {
        return new Handled(vector, (original, current) => {
            if (typeof current.x !== 'number' || isNaN(current.x) || typeof current.y !== 'number' || isNaN(current.y) || typeof current.z !== 'number' || isNaN(current.z)) {
                current.set(original);
                console.warn("Invalid vector components " + current + ", reverting to " + original);
            }
        });
    }
    Vector3.validated = validated;
    function floor(vector) {
        return new Vector3(Math.floor(vector.x), Math.floor(vector.y), Math.floor(vector.z));
    }
    Vector3.floor = floor;
    function ceil(vector) {
        return new Vector3(Math.ceil(vector.x), Math.ceil(vector.y), Math.ceil(vector.z));
    }
    Vector3.ceil = ceil;
    function round(vector) {
        return new Vector3(Math.round(vector.x), Math.round(vector.y), Math.round(vector.z));
    }
    Vector3.round = round;
})(Vector3 || (Vector3 = {}));

/**
 * A `ChunkDataReferencer` converts between indexes and
 * positions in chunk data for given chunk dimensions.
 *
 * * The `index()` method converts a position to an
 * index in chunk data.
 * * The `position()` method converts an index in chunk
 * data to a position, based on the underlying `x()`,
 * `y()`, and `z()` methods.
 * * The `dimensions` property is a 3D vector containing
 * the dimensions of the chunk.
 * * The `cells` property is the total number of cells
 * in a chunk, equal to `dimensions.x * dimensions.y *
 * dimensions.z`.
 */
var ChunkDataReferencer;
(function (ChunkDataReferencer) {
    /**
     * The dimensions of the chunk as a 3D vector.
     */
    ChunkDataReferencer.dimensions = Vector3.immutable(new Vector3(16, 64, 16));
    /**
     * Returns the total number of cells in a chunk.
     */
    ChunkDataReferencer.cells = ChunkDataReferencer.dimensions.x * ChunkDataReferencer.dimensions.y * ChunkDataReferencer.dimensions.z;
    function index(x, y, z) {
        if (x instanceof Vector3) {
            y = x.y;
            z = x.z;
            x = x.x;
        }
        else {
            if (y === undefined || z === undefined)
                throw new Error(`Invalid arguments`);
        }
        if (x < 0 || x >= this.dimensions.x || y < 0 || y >= this.dimensions.y || z < 0 || z >= this.dimensions.z)
            throw new Error(`Coordinates are out of bounds`);
        return x + (z << 4) + (y << 8);
    }
    ChunkDataReferencer.index = index;
    /**
     * Computes the x position of a specified chunk
     * data index. This can be used with the `y()` and
     * `z()` methods to get the complete position
     * without creating a vector.
     */
    function x(index) {
        return index & 0b1111;
    }
    ChunkDataReferencer.x = x;
    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    function y(index) {
        return index >> 8;
    }
    ChunkDataReferencer.y = y;
    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    function z(index) {
        return (index >> 4) & 0b1111;
    }
    ChunkDataReferencer.z = z;
    /**
     * Computes the position of a specified chunk data
     * index. Equivalent to calling `x()`, `y()`, and
     * `z()`, then assembling a `Vector3D` from the
     * components.
     *
     * The method is the opposite of `index()`.
     */
    function position(index) {
        return new Vector3(this.x(index), this.y(index), this.z(index));
    }
    ChunkDataReferencer.position = position;
    function isOutOfBounds(position) {
        return position.x < 0 || position.x >= this.dimensions.x || position.y < 0 || position.y >= this.dimensions.y || position.z < 0 || position.z >= this.dimensions.z;
    }
    ChunkDataReferencer.isOutOfBounds = isOutOfBounds;
})(ChunkDataReferencer || (ChunkDataReferencer = {}));
window['cdr'] = ChunkDataReferencer;

class IndexedRegistryItem {
    registeredId;
    registeredName;
    bindRegistryKeys(id, name) {
        this.registeredId = id;
        this.registeredName = name;
    }
    getRegisteredId() {
        return this.registeredId;
    }
    getRegisteredName() {
        return this.registeredName;
    }
}

class BlockPrototype extends IndexedRegistryItem {
}

/**
 * The ChunkDataFields allows multiple fields to be allocated
 * before creating chunks.
 *
 * * Fields may be allocated in the `Registry.Fields` map.
 * * A map of `ChunkDataField` objects can be instantiated
 * using the `initialize()` method.
 */
var ChunkDataFields;
(function (ChunkDataFields) {
    function initialize() {
        const fields = new Map();
        for (const [id, field] of Registries.fields.entries()) {
            fields.set(id, field.instantiate());
        }
        return fields;
    }
    ChunkDataFields.initialize = initialize;
})(ChunkDataFields || (ChunkDataFields = {}));

class ChunkData {
    fields;
    chunk = null;
    entities = new Set();
    updates = new Set();
    constructor(fields = ChunkDataFields.initialize()) {
        this.fields = fields;
    }
    setParentChunk(chunk) {
        this.chunk = chunk;
    }
    getEntities() {
        return new Set(...this.entities.entries());
    }
    getChunk() {
        return this.chunk;
    }
    addEntity(entity) {
        this.entities.add(entity);
    }
    removeEntity(entity) {
        this.entities.delete(entity);
    }
    getField(id) {
        if (!this.fields.has(id)) {
            throw new Error(`Field id '${id}' is not allocated`);
        }
        return this.fields.get(id);
    }
    getBlockId(x, y, z) {
        if (x instanceof BlockPosition) {
            return this.getField('blockId').get(x.getLocalPosition());
        }
        else if (x instanceof Vector3) {
            return this.getField('blockId').get(x);
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return this.getField('blockId').get(x, y, z);
        }
        else if (typeof x === 'number') {
            return this.getField('blockId').get(x);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    getBlock(x, y, z) {
        if (x instanceof BlockPosition) {
            return Registries.blocks.get(this.getBlockId(x));
        }
        else if (x instanceof Vector3) {
            return Registries.blocks.get(this.getBlockId(x));
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return Registries.blocks.get(this.getBlockId(x, y, z));
        }
        else if (typeof x === 'number') {
            return Registries.blocks.get(this.getBlockId(x));
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    setBlockId(x, y, z, block) {
        if (x instanceof BlockPosition && typeof y == 'number') {
            const localPostion = x.getLocalPosition();
            this.setBlockId(localPostion, y);
        }
        else if (x instanceof Vector3 && typeof y === 'number') {
            this.getField('blockId').set(x, y);
            this.updates.add(ChunkDataReferencer.index(x));
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && typeof block == 'number') {
            this.getField('blockId').set(x, y, z, block);
            this.updates.add(ChunkDataReferencer.index(x, y, z));
        }
        else if (typeof x == 'number' && typeof y == 'number') {
            this.getField('blockId').set(x, y);
            this.updates.add(x);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    setBlock(x, y, z, block) {
        if (x instanceof BlockPosition && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getRegisteredId());
        }
        else if (x instanceof Vector3 && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getRegisteredId());
        }
        else if (typeof x === 'number' && typeof y == 'number' && typeof z == 'number' && block instanceof BlockPrototype) {
            this.setBlockId(x, y, z, block.getRegisteredId());
        }
        else if (typeof x == 'number' && typeof y == 'number') {
            this.setBlockId(x, y);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    getBlockUpdates() {
        return this.updates;
    }
    async tickChunkData() {
        for (const update of this.updates) {
            const position = ChunkDataReferencer.position(update);
            const blockPrototype = this.getBlock(position);
            blockPrototype.whenTicked(new BlockPosition(position, this));
        }
        this.updates.clear();
    }
}

class ChunkInterface {
    unloadChunk() { }
    setupChunk() { }
    async tickChunk() { }
}
(function (ChunkInterface) {
    class NonPlaceholder extends ChunkInterface {
        isPlaceholder() { return false; }
    }
    ChunkInterface.NonPlaceholder = NonPlaceholder;
    class Placeholder extends ChunkInterface {
        isPlaceholder() { return true; }
    }
    ChunkInterface.Placeholder = Placeholder;
})(ChunkInterface || (ChunkInterface = {}));

class BaseChunk extends ChunkInterface.NonPlaceholder {
    position;
    world = null;
    chunkData;
    constructor() {
        super();
    }
    getPosition() {
        return this.position;
    }
    getWorld() {
        return this.world ?? null;
    }
    getChunkData() {
        return this.chunkData;
    }
    bindWorld(world, position) {
        this.world = world;
        this.position = new ImmutableVector2D(position.x, position.y);
    }
    unloadChunk() {
        if (!this.world)
            throw new Error("Cannot unload unbound chunk");
        for (const entity of this.chunkData.getEntities()) {
            this.world.entityIdMapping.delete(entity.getUniqueId());
        }
    }
    setupChunk() {
        if (!this.world)
            throw new Error("Cannot setup unbound chunk");
        this.chunkData = new ChunkData();
    }
    async tickChunk() {
        await this.chunkData.tickChunkData();
    }
    loadState = {
        current: Infinity,
        target: Infinity
    };
}

class PlaceholderChunk extends ChunkInterface.Placeholder {
    position;
    world = null;
    constructor() {
        super();
    }
    getPosition() {
        return this.position;
    }
    getWorld() {
        return this.world ?? null;
    }
    getChunkData() {
        throw new Error("Chunk data does not exist on placeholder");
    }
    bindWorld(world, position) {
        this.world = world;
        this.position = position;
    }
    unloadChunk() { }
    setupChunk() { }
    async tickChunk() { }
    loadState = {
        current: 0,
        target: 0
    };
}

class ChunkLoadQueue {
    world;
    chunks = [];
    constructor(world) {
        this.world = world;
        // TODO: Only for development
        (window.__dev__ ??= {}).clq = this;
    }
    has(state) {
        return this.chunks[state] && this.chunks[state].length > 0;
    }
    add(chunk) {
        const loadState = chunk.loadState;
        if (!this.chunks[loadState.current]) {
            this.chunks[loadState.current] = [];
        }
        if (!this.chunks[loadState.current].includes(chunk)) {
            this.chunks[loadState.current].push(chunk);
        }
    }
    remove(chunk) {
        const loadState = chunk.loadState;
        let array = this.chunks[loadState.current];
        array.splice(array.indexOf(chunk), 1);
    }
    entries() {
        return this.chunks;
    }
}

class World {
    entityIdMapping;
    chunks;
    loader;
    queue;
    constructor() {
        this.entityIdMapping = new Map();
        this.chunks = new Map();
        this.queue = new ChunkLoadQueue(this);
        // TODO: Only for development
        (window.__dev__ ??= {}).world = this;
    }
    getWorldLoader() {
        return this.loader;
    }
    setWorldLoader(loader) {
        this.loader = loader;
        loader.bindWorld(this);
    }
    getChunkLoadQueue() {
        return this.queue;
    }
    createChunk(x, z) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }
        const chunk = new BaseChunk();
        chunk.bindWorld(this, new ImmutableVector2D(x, z));
        chunk.setupChunk();
        return chunk;
    }
    getChunk(x, z) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }
        return this.chunks.get(x + '.' + z) || null;
    }
    addEntity(entity) {
        this.entityIdMapping.set(entity.getUniqueId(), entity);
        const entityPosition = entity.getPosition();
        const chunkX = Math.floor(entityPosition.x / ChunkDataReferencer.dimensions.x);
        const chunkZ = Math.floor(entityPosition.z / ChunkDataReferencer.dimensions.z);
        const chunk = this.getChunk(chunkX, chunkZ) || this.loadChunk(chunkX, chunkZ);
        entity.setWorld(this);
        if (!chunk.isPlaceholder()) {
            chunk.getChunkData().addEntity(entity);
            entity.setParentChunk(null);
        }
        else {
            entity.setParentChunk(chunk);
        }
        return entity;
    }
    removeEntity(entity) {
        entity.setWorld(null);
        this.entityIdMapping.delete(entity.getUniqueId());
    }
    _validateDisconnectedEntities() {
        for (const entity of this.entityIdMapping.values()) {
            if (!entity.getParentChunk()) {
                console.warn("Entity is not in a chunk\n", entity);
            }
        }
    }
    async tick(delta) {
        for (const entity of this.entityIdMapping.values()) {
            await entity.tickEntity(delta);
        }
        for (const [_id, chunk] of this.chunks) {
            await chunk.tickChunk();
        }
        this._validateDisconnectedEntities();
    }
    setChunk(x, z, chunk) {
        if (x instanceof Vector2D) {
            chunk = z;
            z = x.y;
            x = x.x;
        }
        else if (typeof z !== 'number') {
            throw new Error("Invalid arguments");
        }
        if (chunk === undefined) {
            throw new Error("Invalid arguments");
        }
        const old = this.getChunk(x, z);
        if (old) {
            old.unloadChunk();
        }
        this.chunks.set(x + '.' + z, chunk);
        chunk.bindWorld(this, new ImmutableVector2D(x, z));
    }
    loadChunk(x, z, target) {
        if (x instanceof Vector2D) {
            target = z;
            z = x.y;
            x = x.x;
        }
        else if (typeof z !== 'number') {
            throw new Error("Invalid arguments");
        }
        const chunk = this.getChunk(x, z);
        if (chunk) {
            return chunk;
        }
        if (!this.loader) {
            throw new Error("Cannot load chunk: World has no loader");
        }
        const placeholder = new PlaceholderChunk();
        this.setChunk(new ImmutableVector2D(x, z), placeholder);
        placeholder.loadState.target = target ?? Infinity;
        this.queue.add(placeholder);
        return placeholder;
    }
}

class BlockPosition {
    position;
    reference;
    constructor(x, y, z, reference) {
        if (x instanceof Vector3) {
            if (y instanceof World || y instanceof ChunkData) {
                this.position = x;
                this.reference = y;
            }
            else {
                throw new Error("Invalid arguments");
            }
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && reference instanceof World) {
            this.position = new Vector3(x, y, z);
            this.reference = reference;
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && reference instanceof ChunkData) {
            this.position = new Vector3(x, y, z);
            this.reference = reference;
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    getGlobalPosition() {
        if (this.reference instanceof World) {
            return this.position.clone();
        }
        else {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get global position of disconnected ChunkData");
            }
            const position = chunk.getPosition();
            return this.position.clone().add(Vector3.from(position, "x0y"));
        }
    }
    getLocalPosition() {
        if (this.reference instanceof ChunkData) {
            return this.position.clone();
        }
        else {
            return this.position.clone().subtract(Vector3.from(this.getChunkPosition(), 'x0y'));
        }
    }
    getChunkPosition() {
        if (this.reference instanceof ChunkData) {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get global position of disconnected ChunkData");
            }
            return chunk.getPosition();
        }
        else {
            const chunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
            const chunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);
            return new ImmutableVector2D(chunkX, chunkZ);
        }
    }
    getWorld() {
        if (this.reference instanceof World) {
            return this.reference;
        }
        else {
            const chunk = this.reference.getChunk();
            if (!chunk || !chunk.getWorld()) {
                throw new Error("Cannot get world of disconnected ChunkData");
            }
            return chunk.getWorld();
        }
    }
    getChunkData() {
        if (this.reference instanceof ChunkData) {
            return this.reference;
        }
        else {
            const position = this.getChunkPosition();
            const chunk = this.getWorld().getChunk(position);
            if (!chunk) {
                throw new Error("Cannot get chunk data of disconnected world");
            }
            return chunk.getChunkData();
        }
    }
    getChunk() {
        if (this.reference instanceof ChunkData) {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get chunk of disconnected ChunkData");
            }
            return chunk;
        }
        else {
            const position = this.getChunkPosition();
            const chunk = this.getWorld().getChunk(position);
            if (!chunk) {
                throw new Error("Cannot get chunk not in world");
            }
            return chunk;
        }
    }
}

/**
 * A ChunkDataField is an object where data for each
 * block in a chunk can be contained.
 */
class ChunkDataField {
    get(x, y, z) {
        if (typeof x == 'number' && typeof y == 'undefined') {
            return this._get(x);
        }
        else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            return this._get(ChunkDataReferencer.index(x, y, z));
        }
        else if (x instanceof Vector3) {
            return this._get(ChunkDataReferencer.index(x));
        }
        else if (x instanceof BlockPosition) {
            return this.get(x.getLocalPosition());
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    set(x, y, z, value) {
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof value != 'undefined') {
            return this._set(ChunkDataReferencer.index(x, y, z), value);
        }
        else if (x instanceof Vector3) {
            return this._set(ChunkDataReferencer.index(x), y);
        }
        else if (x instanceof BlockPosition) {
            return this._set(ChunkDataReferencer.index(x.getLocalPosition()), y);
        }
        else if (typeof x == 'number') {
            return this._set(x, y);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
}

/**
 * Represents a field for any size of `number`.
 */
class ChunkDataNumberField extends ChunkDataField {
    type;
    array;
    constructor(type) {
        super();
        this.type = type;
        this.array = ChunkDataNumberField.typedArray(type, ChunkDataReferencer.cells);
    }
    _get(index) {
        if (this.type == "u4" || this.type == "i4") {
            const item = this.array[Math.floor(index / 2)];
            if (index % 2 == 0) {
                return item & 0x0F;
            }
            else {
                return item >> 4;
            }
        }
        else if (this.type == "u64" || this.type == "i64") {
            return Number(this.array[index]);
        }
        else {
            return this.array[index];
        }
    }
    _set(index, value) {
        if (this.type == "u4" || this.type == "i4") {
            const itemIndex = Math.floor(index / 2);
            const item = this.array[itemIndex];
            if (index % 2 == 0) {
                this.array[itemIndex] = (item & 0xF0) | value;
            }
            else {
                this.array[itemIndex] = (item & 0x0F) | (value << 4);
            }
        }
        else if (this.type == "u64" || this.type == "i64") {
            this.array[index] = BigInt(value);
        }
        else {
            this.array[index] = value;
        }
    }
    /**
     * Create a typed array of a given `ChunkDataNumberType` and length.
     */
    static typedArray(type, length) {
        if (type == "u4")
            return new Uint8Array(length / 2);
        if (type == "u8")
            return new Uint8Array(length);
        if (type == "u16")
            return new Uint16Array(length);
        if (type == "u32")
            return new Uint32Array(length);
        if (type == "u64")
            return new BigUint64Array(length);
        if (type == "i8")
            return new Int8Array(length);
        if (type == "i16")
            return new Int16Array(length);
        if (type == "i32")
            return new Int32Array(length);
        if (type == "i64")
            return new BigInt64Array(length);
        if (type == "f32")
            return new Float32Array(length);
        if (type == "f64")
            return new Float64Array(length);
        throw new Error(`Unknown array type: ${type}`);
    }
}

/**
 * Represents an allocation of a field for any size of `number`.
 */
class ChunkDataNumberAllocation {
    type;
    /**
     * Constructs a new `ChunkDataNumberAllocation`
     * object with a given number type, represented
     * as a `ChunkDataNumberType`.
     */
    constructor(type) {
        this.type = type;
    }
    instantiate() {
        return new ChunkDataNumberField(this.type);
    }
}

var NoiseUtils;
(function (NoiseUtils) {
    function square(value, exponent) {
        return Math.sign(value) * (1 - (1 - Math.abs(value)) ** exponent);
    }
    NoiseUtils.square = square;
    function scaledNoise2D(noise, scale) {
        return (x, y) => noise(x / scale, y / scale);
    }
    NoiseUtils.scaledNoise2D = scaledNoise2D;
    function scaledNoise3D(noise, scale) {
        return (x, y, z) => noise(x / scale, y / scale, z / scale);
    }
    NoiseUtils.scaledNoise3D = scaledNoise3D;
    function octavedNoise2D(count) {
        let noises = [];
        for (let i = 0; i < count; i++) {
            noises.push(createNoise2D());
        }
        return (x, y) => {
            let value = 0;
            let denomenator = 0;
            for (let i = 0; i < count; i++) {
                value += noises[i](x * i, y * i) / (i + 1);
                denomenator += 1 / (i + 1);
            }
            return value / denomenator;
        };
    }
    NoiseUtils.octavedNoise2D = octavedNoise2D;
    function octavedNoise3D(count) {
        let noises = [];
        for (let i = 0; i < count; i++) {
            noises.push(createNoise3D());
        }
        return (x, y, z) => {
            let value = 0;
            let denomenator = 0;
            for (let i = 0; i < count; i++) {
                value += noises[i](x * i, y * i, z * i) / (i + 1);
                denomenator += 1 / (i + 1);
            }
            return value / denomenator;
        };
    }
    NoiseUtils.octavedNoise3D = octavedNoise3D;
})(NoiseUtils || (NoiseUtils = {}));

var Feature;
(function (Feature) {
    function* resolveCollisions(checkedFeatures, otherFeatures) {
        checkedFeatures = [...checkedFeatures];
        otherFeatures = [...otherFeatures];
        const allFeatures = [...otherFeatures, ...checkedFeatures];
        for (const feature of checkedFeatures) {
            let destroy = false;
            for (const other of allFeatures) {
                if (feature === other) {
                    continue;
                }
                if (feature.getBoundingBox()[0].x <= other.getBoundingBox()[1].x &&
                    feature.getBoundingBox()[1].x >= other.getBoundingBox()[0].x &&
                    feature.getBoundingBox()[0].y <= other.getBoundingBox()[1].y &&
                    feature.getBoundingBox()[1].y >= other.getBoundingBox()[0].y &&
                    feature.getBoundingBox()[0].z <= other.getBoundingBox()[1].z &&
                    feature.getBoundingBox()[1].z >= other.getBoundingBox()[0].z) {
                    if (feature.doesReplace(other))
                        continue;
                    if (other.doesReplace(feature)) {
                        destroy = true;
                    }
                    else {
                        let hash = feature.getFeatureHash();
                        let otherHash = other.getFeatureHash();
                        if (otherHash < hash) {
                            destroy = true;
                        }
                        else if (otherHash == hash) {
                            destroy = true;
                        }
                    }
                }
            }
            if (!destroy) {
                yield feature;
            }
        }
    }
    Feature.resolveCollisions = resolveCollisions;
})(Feature || (Feature = {}));

class SemiloadedChunk extends PlaceholderChunk {
    data;
    static State = Symbol("semiloaded");
    features = new Set();
    constructor(data) {
        super();
        this.data = data;
    }
    getChunkData() {
        return this.data;
    }
    *getFeatures() {
        yield* this.features;
    }
    storeFeatures(features) {
        this.features.clear();
        for (const feature of features) {
            this.features.add(feature);
        }
    }
    loadState = { current: 1, target: 0 };
}

class TreeFeature {
    position;
    chunkPosition;
    seed;
    absolute;
    height;
    constructor(position, chunkPosition, seed) {
        this.position = position;
        this.chunkPosition = chunkPosition;
        this.seed = seed;
        const x = this.position.x + this.chunkPosition.x * ChunkDataReferencer.dimensions.x;
        const y = this.position.y;
        const z = this.position.z + this.chunkPosition.y * ChunkDataReferencer.dimensions.z;
        this.absolute = new Vector3(x, y, z);
        const root = x + '.' + y + '.' + z;
        this.height = murmur3_1(root + ':treeHeight', this.seed) % 5 + 7;
    }
    getBoundingBox() {
        return [this.absolute.plus(-1, 0, -1), this.absolute.plus(1, this.height, 1)];
    }
    placeFeature(chunk) {
        const log = Registries.blocks.get('log.along_y');
        if (!log)
            throw new Error("Log block not found");
        const leaves = Registries.blocks.get('leaves');
        if (!leaves)
            throw new Error("Leaves block not found");
        const chunkData = chunk.getChunkData();
        const chunkPosition = chunk.getPosition();
        const localPosition = this.absolute.minus(chunkPosition.x * ChunkDataReferencer.dimensions.x, 0, chunkPosition.y * ChunkDataReferencer.dimensions.z);
        for (let i = 0; i < this.height; i++) {
            const logPosition = localPosition.plus(0, i, 0);
            if (!ChunkDataReferencer.isOutOfBounds(logPosition)) {
                chunkData.setBlock(logPosition, log);
            }
            if (i == 0)
                continue;
            const position = localPosition.plus(0, i, 0);
            let radius = (this.height - i) / 2 / 2 + 1;
            if (i % 2 == 0 && i < this.height - 1) {
                radius = (radius + 0.5) / 2;
            }
            const radiusSquared = radius * radius;
            for (let x = -Math.floor(radius); x <= Math.ceil(radius); x++) {
                for (let z = -Math.floor(radius); z <= Math.ceil(radius); z++) {
                    if (x * x + z * z > radiusSquared)
                        continue;
                    if (ChunkDataReferencer.isOutOfBounds(position.plus(x, 0, z)))
                        continue;
                    const current = chunkData.getBlock(position.x + x, position.y, position.z + z);
                    if (current && current.getRegisteredName() != 'air')
                        continue;
                    chunkData.setBlock(position.x + x, position.y, position.z + z, leaves);
                }
            }
        }
        const topPosition = localPosition.plus(0, this.height, 0);
        if (!ChunkDataReferencer.isOutOfBounds(topPosition)) {
            const current = chunkData.getBlock(topPosition);
            if (!current || current.getRegisteredName() == 'air') {
                chunkData.setBlock(topPosition, leaves);
            }
        }
    }
    getFeatureHash() {
        return murmur3_1(this.absolute.x + '.' + this.absolute.y + '.' + this.absolute.z + ':treeHash', this.seed);
    }
    doesReplace(feature) {
        return false;
    }
}

class LoadedChunk extends BaseChunk {
    features = new Set();
    constructor(data) {
        super();
        this.chunkData = data;
    }
    *getFeatures() {
        yield* this.features;
    }
    storeFeatures(features) {
        this.features.clear();
        for (const feature of features) {
            this.features.add(feature);
        }
    }
    placeFeatures(neighboringFeatures) {
        for (const feature of this.features) {
            feature.placeFeature(this);
        }
        for (const feature of neighboringFeatures) {
            feature.placeFeature(this);
        }
    }
}

class RockFeature {
    position;
    chunkPosition;
    seed;
    absolute;
    size;
    box;
    constructor(position, chunkPosition, seed) {
        this.position = position;
        this.chunkPosition = chunkPosition;
        this.seed = seed;
        const x = this.position.x + this.chunkPosition.x * ChunkDataReferencer.dimensions.x;
        const y = this.position.y;
        const z = this.position.z + this.chunkPosition.y * ChunkDataReferencer.dimensions.z;
        this.absolute = new Vector3(x, y, z);
        const root = x + '.' + y + '.' + z;
        this.size = new Vector3(murmur3_1(root + ':rock.size.x', this.seed) % 1 + 5, murmur3_1(root + ':rock.size.y', this.seed) % 1 + 5, murmur3_1(root + ':rock.size.z', this.seed) % 1 + 5);
        this.box = [
            Vector3.floor(this.absolute.plus(-this.size.x / 2, 0, -this.size.z / 2)),
            Vector3.ceil(this.absolute.plus(this.size.x / 2, this.size.y, this.size.z / 2))
        ];
    }
    getBoundingBox() {
        return this.box;
    }
    placeFeature(chunk) {
        const cobblestone = Registries.blocks.get('cobblestone');
        if (!cobblestone)
            throw new Error("Cobblestone block not found");
        const chunkData = chunk.getChunkData();
        const chunkPosition = chunk.getPosition();
        const localPosition = this.absolute.minus(chunkPosition.x * ChunkDataReferencer.dimensions.x, 0, chunkPosition.y * ChunkDataReferencer.dimensions.z);
        for (let x = Math.floor(-this.size.x / 2 + localPosition.x); x < this.size.x / 2 + localPosition.x; x++) {
            for (let y = Math.floor(-this.size.y / 2 + localPosition.y); y < this.size.y / 2 + localPosition.y; y++) {
                for (let z = Math.floor(-this.size.z / 2 + localPosition.z); z < this.size.z / 2 + localPosition.z; z++) {
                    if (ChunkDataReferencer.isOutOfBounds(new Vector3(x, y, z)))
                        continue;
                    const distance = (x - this.absolute.x) ** 2 / (this.size.x / 2) ** 2 + (y - this.absolute.y) ** 2 / (this.size.y / 2) ** 2 + (z - this.absolute.z) ** 2 / (this.size.z / 2) ** 2;
                    if (distance > 1)
                        continue;
                    const current = chunkData.getBlock(x, y, z);
                    if (current && current.getRegisteredName() != "air")
                        continue;
                    chunkData.setBlock(x, y, z, cobblestone);
                }
            }
        }
    }
    getFeatureHash() {
        return murmur3_1(this.absolute.x + '.' + this.absolute.y + '.' + this.absolute.z + ':rockHash', this.seed);
    }
    doesReplace(feature) {
        return feature instanceof TreeFeature;
    }
}

class SimpleWorldGenerator {
    surface2DNoise;
    surface3DNoise;
    world;
    caveNoises;
    bindWorld(world) {
        this.world = world;
        this.surface2DNoise = NoiseUtils.scaledNoise2D(NoiseUtils.octavedNoise2D(4), 64);
        this.surface3DNoise = NoiseUtils.scaledNoise3D(createNoise3D(), 32);
        this.caveNoises = [createNoise3D(), createNoise3D(), createNoise3D()];
    }
    phase = 0;
    phases = 2;
    async generateChunks(maxSteps = 1) {
        if (maxSteps == 0)
            return;
        const loadQueue = this.world.getChunkLoadQueue();
        let chunks = [...loadQueue.entries()];
        let steps = 0;
        let failed = 0;
        while (steps < maxSteps) {
            const queue = chunks[this.phase];
            if (!queue || queue.length == 0) {
                if (failed >= maxSteps)
                    break;
                failed++;
            }
            else {
                if (this.phase == 0) {
                    await this.generateInitialChunk(queue[0], loadQueue);
                    steps++;
                    failed = 0;
                }
                else if (this.phase == 1) {
                    if (await this.tryGenerateSemiloaded(queue, loadQueue)) {
                        steps++;
                        failed = 0;
                    }
                    else {
                        failed++;
                    }
                }
            }
            this.phase = (this.phase + 1) % this.phases;
        }
    }
    async generateInitialChunk(chunk, queue) {
        queue.remove(chunk);
        const newChunk = await this.generateTerrain(chunk.getPosition());
        newChunk.loadState.target = chunk.loadState.target;
        this.world.setChunk(chunk.getPosition(), newChunk);
        queue.add(newChunk);
    }
    static NEIGHBORS = [
        new ImmutableVector2D(-1, -1),
        new ImmutableVector2D(0, -1),
        new ImmutableVector2D(1, -1),
        new ImmutableVector2D(-1, 0),
        new ImmutableVector2D(1, 0),
        new ImmutableVector2D(-1, 1),
        new ImmutableVector2D(0, 1),
        new ImmutableVector2D(1, 1)
    ];
    async tryGenerateSemiloaded(entries, queue) {
        let chunk = entries.find(chunk => chunk.loadState.current != chunk.loadState.target);
        if (!chunk)
            return false;
        queue.remove(chunk);
        let features = [];
        let thisPosition = chunk.getPosition();
        for (let neighbor of SimpleWorldGenerator.NEIGHBORS) {
            let neighborPosition = thisPosition.clone().add(neighbor);
            let neighborChunk = this.world.getChunk(neighborPosition);
            if (neighborChunk && (neighborChunk instanceof SemiloadedChunk || neighborChunk instanceof LoadedChunk)) {
                features.push(...neighborChunk.getFeatures());
            }
            else {
                chunk.getWorld()?.loadChunk(neighborPosition, 1);
                queue.add(chunk);
                return false;
            }
        }
        if (!(chunk instanceof SemiloadedChunk)) {
            throw new Error("Chunk is not semiloaded when it should be");
        }
        const newChunk = new LoadedChunk(chunk.getChunkData());
        newChunk.storeFeatures(Feature.resolveCollisions(chunk.getFeatures(), features));
        newChunk.loadState.target = chunk.loadState.target;
        this.world.setChunk(chunk.getPosition(), newChunk);
        queue.add(newChunk);
        newChunk.placeFeatures(Feature.resolveCollisions(features, features));
        return true;
    }
    async generateTerrain(location) {
        const semiloaded = new SemiloadedChunk(await this.generateChunk(location));
        await this.addFeatures(location, semiloaded);
        return semiloaded;
    }
    async addFeatures(location, chunk) {
        let features = [];
        for (let i = 0; i < murmur3_1(location.x + '.' + location.y + ':treeCount') % 5 + 5; i++) {
            let x = murmur3_1(location.x + '.' + location.y + '.' + i + ':treeX') % ChunkDataReferencer.dimensions.x;
            let z = murmur3_1(location.x + '.' + location.y + '.' + i + ':treeZ') % ChunkDataReferencer.dimensions.z;
            for (let y = ChunkDataReferencer.dimensions.y - 1; y >= 0; y--) {
                if (chunk.getChunkData().getBlock(x, y, z) != Registries.blocks.get('air')) {
                    features.push(new TreeFeature(new Vector3(x, y + 1, z), location, 0));
                    break;
                }
            }
        }
        for (let i = 0; i < murmur3_1(location.x + '.' + location.y + ':rockCount') % 4; i++) {
            let x = murmur3_1(location.x + '.' + location.y + '.' + i + ':rockX') % ChunkDataReferencer.dimensions.x;
            let z = murmur3_1(location.x + '.' + location.y + '.' + i + ':rockZ') % ChunkDataReferencer.dimensions.z;
            for (let y = ChunkDataReferencer.dimensions.y - 1; y >= 0; y--) {
                if (chunk.getChunkData().getBlock(x, y, z) != Registries.blocks.get('air')) {
                    features.push(new RockFeature(new Vector3(x, y + 1, z), location, 0));
                    break;
                }
            }
        }
        chunk.storeFeatures(features);
    }
    async createDensities(location, data) {
        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                // Direct sample (-1 to 1)
                let sample2d = this.surface2DNoise(x + location.x * ChunkDataReferencer.dimensions.x, z + location.y * ChunkDataReferencer.dimensions.z);
                // Surface height (1/4 to 3/4)
                let surface2d = MathUtils.map(sample2d, -1, 1, 0.25, 0.75);
                for (let y = 0; y < ChunkDataReferencer.dimensions.y; y++) {
                    // Fraction of the way through the chunk (0 to 1)
                    let yFraction = MathUtils.map(y, 0, ChunkDataReferencer.dimensions.y, 0, 1);
                    // Direct sample (-1 to 1)
                    let density3d = this.surface3DNoise(x + location.x * ChunkDataReferencer.dimensions.x, y, z + location.y * ChunkDataReferencer.dimensions.z);
                    // Mapped sample (-1/4 to 1/4)
                    let density3dScaled = density3d / 4;
                    // Surface offset (centered around 0)
                    let surfaceOffset = surface2d - yFraction;
                    let density = surfaceOffset + density3dScaled;
                    data.getField('density').set(x, y, z, density);
                    let cave = 0;
                    for (let noise of this.caveNoises) {
                        cave += Math.abs(noise((x + location.x * ChunkDataReferencer.dimensions.x) / 32, y / 32, (z + location.y * ChunkDataReferencer.dimensions.z) / 32));
                    }
                    // -1 to 1
                    cave /= this.caveNoises.length;
                    cave = cave ** 2 * Math.sign(cave);
                    data.getField('cave').set(x, y, z, cave);
                }
            }
        }
    }
    async calculateDepth(data) {
        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                let depth = 0;
                for (let y = ChunkDataReferencer.dimensions.y - 1; y >= 0; y--) {
                    let density = data.getField('density').get(x, y, z);
                    depth++;
                    if (density < 0) {
                        depth = 0;
                    }
                    data.getField('depth').set(x, y, z, depth);
                }
            }
        }
    }
    async generateChunk(location) {
        const data = new ChunkData();
        const fields = new ChunkData(new Map([
            ['density', new ChunkDataNumberAllocation('f32').instantiate()],
            ['cave', new ChunkDataNumberAllocation('f32').instantiate()],
            ['depth', new ChunkDataNumberAllocation('u8').instantiate()]
        ]));
        fields.getField('cave');
        const depthField = fields.getField('depth');
        await this.createDensities(location, fields);
        await this.calculateDepth(fields);
        const stone = Registries.blocks.get('stone');
        const air = Registries.blocks.get('air');
        const dirt = Registries.blocks.get('dirt');
        const grass = Registries.blocks.get('grass');
        if (!(stone && air && dirt && grass)) {
            throw new Error("Blocks to not exist for simple world generator");
        }
        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                for (let y = 0; y < ChunkDataReferencer.dimensions.y; y++) {
                    const depth = depthField.get(x, y, z);
                    if (depth == 0) {
                        data.setBlock(x, y, z, air);
                    }
                    else if (depth == 1) {
                        data.setBlock(x, y, z, grass);
                    }
                    else if (depth < 5) {
                        data.setBlock(x, y, z, dirt);
                    }
                    else {
                        data.setBlock(x, y, z, stone);
                    }
                }
            }
        }
        return data;
    }
}

class EventClockViewer {
    clock;
    enabled = false;
    element;
    constructor(clock) {
        this.clock = clock;
        document.addEventListener('keypress', event => {
            if (event.code == 'KeyT' && event.altKey) {
                this.enabled = !this.enabled;
                if (this.enabled) {
                    document.body.appendChild(this.element);
                }
                else {
                    document.body.removeChild(this.element);
                }
            }
        });
        this.element = document.createElement('div');
        this.element.style.position = "fixed";
        this.element.style.top = "5px";
        this.element.style.left = "5px";
        this.element.style.color = "white";
        this.element.style.fontFamily = "monospace";
        this.element.style.background = "#00000088";
        this.element.style.padding = "5px";
        this.element.style.borderRadius = "5px";
    }
    update() {
        if (!this.enabled)
            return;
        const taskInfo = this.clock.getTaskInfo();
        if (taskInfo == null)
            return;
        let text = [];
        for (const task of taskInfo.tasks) {
            text.push(`${task.name} - ${task.time}ms`);
        }
        this.element.innerText = text.join('\n');
    }
}

var GameRuntimeType;
(function (GameRuntimeType) {
    GameRuntimeType[GameRuntimeType["Singleplayer"] = 0] = "Singleplayer";
    GameRuntimeType[GameRuntimeType["MultiplayerClient"] = 1] = "MultiplayerClient";
    GameRuntimeType[GameRuntimeType["MultiplayerServer"] = 2] = "MultiplayerServer";
})(GameRuntimeType || (GameRuntimeType = {}));

class BaseBlockPrototype extends BlockPrototype {
    instantiate(position) {
        position.getChunkData().getField('blockId').set(position, this.getRegisteredId());
    }
    whenDestroyed(position) {
        const empty = Registries.blocks.get('empty');
        if (!empty) {
            throw new Error("Empty block not found in registry");
        }
        position.getChunkData().setBlock(position, empty);
    }
    whenUsed(position) {
    }
    whenPlaced(position) {
    }
    whenTicked(position) {
    }
    isRendered() {
        return true;
    }
    async setup() {
    }
}

class AirPrototype extends BaseBlockPrototype {
    whenPlaced(position) {
        console.log("Air placed at " + position.toString());
    }
    getBlockModel(position) {
        return null;
    }
}

class Texture extends IndexedRegistryItem {
    data;
    width;
    height;
    constructor(data, width, height) {
        super();
        this.data = data;
        this.width = width;
        this.height = height;
    }
    getTextureWidth() {
        return this.width;
    }
    getTextureHeight() {
        return this.height;
    }
    toDataArray() {
        return this.data;
    }
    toImageData() {
        return new ImageData(this.data, this.width, this.height);
    }
    static fromImage(source) {
        const canvas = new OffscreenCanvas(source.width, source.height);
        const context = canvas.getContext('2d');
        context.drawImage(source, 0, 0);
        const imageData = context.getImageData(0, 0, source.width, source.height);
        return Texture.fromImageData(imageData);
    }
    static fromImageData(imageData) {
        return new Texture(imageData.data, imageData.width, imageData.height);
    }
    static fromDataArray(data, width, height) {
        return new Texture(data, width, height);
    }
    static load(name) {
        if (Registries.textures.get(name))
            return Promise.resolve(Registries.textures.get(name));
        const url = '/assets/textures/' + name.replace(/\./g, '/') + '.png';
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const texture = Texture.fromImage(image);
                Registries.textures.register(name, texture);
                resolve(texture);
            };
            image.onerror = () => {
                reject(new Error(`Failed to load image from ${url}`));
            };
            image.src = url;
        });
    }
}

var DataUtils;
(function (DataUtils) {
    function concat(buffers) {
        const totalLength = buffers.reduce((total, buffer) => total + buffer.byteLength, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const buffer of buffers) {
            result.set(new Uint8Array(buffer.buffer), offset);
            offset += buffer.byteLength;
        }
        return result.buffer;
    }
    DataUtils.concat = concat;
})(DataUtils || (DataUtils = {}));

class BlockModel extends IndexedRegistryItem {
    components = new Set();
    transparent = false;
    constructor(options) {
        super();
        this.transparent = options?.transparent ?? false;
    }
    isTransparent() {
        return this.transparent;
    }
    getVertexPositions() {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions());
        const buffer = DataUtils.concat(positions);
        return new Float32Array(buffer);
    }
    getTextureMappings() {
        const components = Array.from(this.components);
        const textureMappings = components.map(component => component.getTextureMappings());
        const buffer = DataUtils.concat(textureMappings);
        return new Float32Array(buffer);
    }
    getTextureIds() {
        const components = Array.from(this.components);
        const textureIds = components.map(component => component.getTextureIds());
        const buffer = DataUtils.concat(textureIds);
        return new Uint32Array(buffer);
    }
    add(...components) {
        for (const component of components) {
            this.components.add(component);
        }
    }
    remove(...components) {
        for (const component of components) {
            this.components.delete(component);
        }
    }
}

class BoxModelComponent {
    dimensions;
    textures;
    constructor(dimensions, textures) {
        this.dimensions = dimensions;
        this.textures = textures;
    }
    getVertexPositions() {
        const vertices = new Float32Array(BoxModelComponent.geometry.length);
        for (let i = 0; i < vertices.length / 3; i++) {
            const x = BoxModelComponent.geometry[i * 3];
            const y = BoxModelComponent.geometry[i * 3 + 1];
            const z = BoxModelComponent.geometry[i * 3 + 2];
            vertices[i * 3] = x * this.dimensions.x;
            vertices[i * 3 + 1] = y * this.dimensions.y;
            vertices[i * 3 + 2] = z * this.dimensions.z;
        }
        return vertices;
    }
    getTextureMappings() {
        const output = new Float32Array(12 * 6);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                let texture = this.textures[i];
                let mappings = BoxModelComponent.textureMappings[i];
                if (!mappings || !texture)
                    continue;
                output[i * 12 + j * 2] = mappings[j * 2] * texture.getTextureWidth();
                output[i * 12 + j * 2 + 1] = mappings[j * 2 + 1] * texture.getTextureHeight();
            }
        }
        return output;
    }
    getTextureIds() {
        return new Uint32Array([
            this.textures[0].getRegisteredId(),
            this.textures[0].getRegisteredId(),
            this.textures[1].getRegisteredId(),
            this.textures[1].getRegisteredId(),
            this.textures[2].getRegisteredId(),
            this.textures[2].getRegisteredId(),
            this.textures[3].getRegisteredId(),
            this.textures[3].getRegisteredId(),
            this.textures[4].getRegisteredId(),
            this.textures[4].getRegisteredId(),
            this.textures[5].getRegisteredId(),
            this.textures[5].getRegisteredId()
        ]);
    }
    static geometry = new Float32Array([
        // North face (-z)
        1, 1, 0,
        0, 1, 0,
        0, 0, 0,
        1, 1, 0,
        0, 0, 0,
        1, 0, 0,
        // South face (+z)
        0, 1, 1,
        1, 1, 1,
        1, 0, 1,
        0, 1, 1,
        1, 0, 1,
        0, 0, 1,
        // East face (+x)
        1, 1, 1,
        1, 1, 0,
        1, 0, 0,
        1, 1, 1,
        1, 0, 0,
        1, 0, 1,
        // West face (-x)
        0, 1, 0,
        0, 1, 1,
        0, 0, 1,
        0, 1, 0,
        0, 0, 1,
        0, 0, 0,
        // Up face (+y)
        0, 1, 1,
        0, 1, 0,
        1, 1, 0,
        1, 1, 1,
        0, 1, 1,
        1, 1, 0,
        // Down face (-y)
        1, 0, 1,
        1, 0, 0,
        0, 0, 0,
        0, 0, 1,
        1, 0, 1,
        0, 0, 0
    ]);
    static textureNorth = new Float32Array([
        1, 0,
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1
    ]);
    static textureSouth = new Float32Array([
        0, 0,
        1, 0,
        1, 1,
        0, 0,
        1, 1,
        0, 1
    ]);
    static textureEast = new Float32Array([
        1, 0,
        0, 0,
        0, 1,
        1, 0,
        0, 1,
        1, 1
    ]);
    static textureWest = new Float32Array([
        0, 0,
        1, 0,
        1, 1,
        0, 0,
        1, 1,
        0, 1
    ]);
    static textureTop = new Float32Array([
        1, 0,
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        0, 1
    ]);
    static textureBottom = new Float32Array([
        1, 1,
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        0, 0
    ]);
    static textureMappings = [this.textureNorth, this.textureSouth, this.textureEast, this.textureWest, this.textureTop, this.textureBottom];
}

class CobblestonePrototype extends BaseBlockPrototype {
    getBlockModel(position) {
        return CobblestonePrototype.model;
    }
    static model;
    static texture;
    static async setup() {
        this.texture = await Texture.load("blocks.cobblestone");
        this.model = new BlockModel({ transparent: true });
        const box = new BoxModelComponent(new Vector3(1, 1, 1), new Array(6).fill(this.texture));
        this.model.add(box);
        Registries.blocks.register('cobblestone', new CobblestonePrototype());
        Registries.blockModels.register('cobblestone', CobblestonePrototype.model);
    }
}

class DirtPrototype extends BaseBlockPrototype {
    whenPlaced(position) {
        console.log("Dirt placed at " + position.toString());
    }
    getBlockModel(position) {
        return DirtPrototype.model;
    }
    static model;
    static texture;
    static async setup() {
        this.texture = await Texture.load("blocks.dirt");
        this.model = new BlockModel();
        const box = new BoxModelComponent(new Vector3(1, 1, 1), new Array(6).fill(this.texture));
        this.model.add(box);
    }
    static getBlockModel() {
        return DirtPrototype.model;
    }
}

class GrassPrototype extends BaseBlockPrototype {
    whenPlaced(position) {
        console.log("Grass placed at " + position.toString());
    }
    getBlockModel(position) {
        return GrassPrototype.model;
    }
    static model;
    static top;
    static side;
    static bottom;
    static async setup() {
        this.top = await Texture.load("blocks.grass.top");
        this.side = await Texture.load("blocks.grass.side");
        this.bottom = await Texture.load("blocks.dirt");
        this.model = new BlockModel();
        const box = new BoxModelComponent(new Vector3(1, 1, 1), [this.side, this.side, this.side, this.side, this.top, this.bottom]);
        this.model.add(box);
    }
    static getBlockModel() {
        return GrassPrototype.model;
    }
}

class LeavesPrototype extends BaseBlockPrototype {
    getBlockModel(position) {
        return LeavesPrototype.model;
    }
    static model;
    static texture;
    static async setup() {
        this.texture = await Texture.load("blocks.leaves");
        this.model = new BlockModel({ transparent: true });
        const box = new BoxModelComponent(new Vector3(1, 1, 1), new Array(6).fill(this.texture));
        this.model.add(box);
        Registries.blocks.register('leaves', new LeavesPrototype());
        Registries.blockModels.register('leaves', LeavesPrototype.model);
    }
}

class Quaternion {
    x;
    y;
    z;
    w;
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    multiply(quaternion) {
        const x = this.w * quaternion.x + this.x * quaternion.w + this.y * quaternion.z - this.z * quaternion.y;
        const y = this.w * quaternion.y + this.y * quaternion.w + this.z * quaternion.x - this.x * quaternion.z;
        const z = this.w * quaternion.z + this.z * quaternion.w + this.x * quaternion.y - this.y * quaternion.x;
        const w = this.w * quaternion.w - this.x * quaternion.x - this.y * quaternion.y - this.z * quaternion.z;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    times(quaternion) {
        return this.clone().multiply(quaternion);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    inverse() {
        let magnitude = this.magnitude();
        let x = -this.x / magnitude;
        let y = -this.y / magnitude;
        let z = -this.z / magnitude;
        let w = this.w / magnitude;
        return new Quaternion(x, y, z, w);
    }
    rotate(vector) {
        let quaternion = new Quaternion(vector.x, vector.y, vector.z, 0);
        let inverse = this.clone().inverse();
        let result = this.times(quaternion).multiply(inverse);
        return new Vector3(result.x, result.y, result.z);
    }
    inverseRotate(vector) {
        let quaternion = new Quaternion(vector.x, vector.y, vector.z, 0);
        let inverse = this.clone().inverse();
        let result = inverse.multiply(quaternion).multiply(this);
        return new Vector3(result.x, result.y, result.z);
    }
    clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }
    toString() {
        return `Quaternion { ${this.x}, ${this.y}, ${this.z}, ${this.w} }`;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }
    static fromAxisAngle(axis, angle) {
        let cos = Math.cos(angle / 2);
        let sin = Math.sin(angle / 2);
        return new Quaternion(axis.x * sin, axis.y * sin, axis.z * sin, cos);
    }
    static fromRotation(rotation) {
        let quaternion = null;
        for (const [axis, angle] of rotation.toAxisRotations()) {
            let part = Quaternion.fromAxisAngle(axis, angle);
            if (quaternion)
                quaternion.multiply(part);
            else
                quaternion = part;
        }
        if (!quaternion)
            throw new Error('Failed to create quaternion from rotation');
        return quaternion;
    }
}

class Rotation {
    yaw;
    pitch;
    roll;
    constructor(yaw = 0, pitch = 0, roll = 0) {
        if (typeof yaw !== 'number')
            throw new TypeError('yaw must be a number');
        if (typeof pitch !== 'number')
            throw new TypeError('pitch must be a number');
        if (typeof roll !== 'number')
            throw new TypeError('roll must be a number');
        if (isNaN(yaw))
            throw new TypeError('yaw must not be NaN');
        if (isNaN(pitch))
            throw new TypeError('pitch must not be NaN');
        if (isNaN(roll))
            throw new TypeError('roll must not be NaN');
        this.yaw = yaw;
        this.pitch = pitch;
        this.roll = roll;
    }
    set(yaw, pitch, roll) {
        if (typeof yaw == 'number' && typeof pitch === 'number' && typeof roll === 'number') {
            this.yaw = yaw;
            this.pitch = pitch;
            this.roll = roll;
        }
        else if (yaw instanceof Rotation && pitch === undefined && roll === undefined) {
            this.yaw = yaw.yaw;
            this.pitch = yaw.pitch;
            this.roll = yaw.roll;
        }
        else {
            throw new Error('Invalid arguments to Rotation.set(), expected number, number, number or Rotation');
        }
    }
    clone() {
        return new Rotation(this.yaw, this.pitch, this.roll);
    }
    *toAxisRotations() {
        yield [new Vector3(0, 1, 0), this.yaw];
        yield [new Vector3(1, 0, 0), this.pitch];
        yield [new Vector3(0, 0, 1), this.roll];
    }
    static fromDegrees(yaw, pitch, roll) {
        return new Rotation(Math.PI / 180 * yaw, Math.PI / 180 * pitch, Math.PI / 180 * roll);
    }
}

class EmptyModelComponent {
    getVertexPositions() {
        return new Float32Array();
    }
    getTextureMappings() {
        return new Float32Array();
    }
    getTextureIds() {
        return new Uint32Array();
    }
}

class RotatedModelComponent {
    origin;
    child;
    quaternion;
    constructor(rotation = new Rotation(), origin = new Vector3(0.5, 0.5, 0.5), child = new EmptyModelComponent()) {
        this.origin = origin;
        this.child = child;
        this.quaternion = rotation instanceof Rotation ? Quaternion.fromRotation(rotation) : rotation;
    }
    add(child) {
        this.child = child;
    }
    getVertexPositions() {
        const childVertices = this.child.getVertexPositions();
        for (let i = 0; i < childVertices.length / 3; i++) {
            const x = childVertices[i * 3];
            const y = childVertices[i * 3 + 1];
            const z = childVertices[i * 3 + 2];
            const position = this.quaternion.rotate(new Vector3(x, y, z).subtract(this.origin)).add(this.origin);
            childVertices[i * 3] = position.x;
            childVertices[i * 3 + 1] = position.y;
            childVertices[i * 3 + 2] = position.z;
        }
        return childVertices;
    }
    getTextureMappings() {
        return this.child.getTextureMappings();
    }
    getTextureIds() {
        return this.child.getTextureIds();
    }
}

class Matrix3 {
    data;
    constructor(data = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
        this.data = data;
    }
    multiply(value) {
        if (value instanceof Vector3) {
            return Matrix3.multiplyVector(this, value);
        }
        else if (value instanceof Matrix3) {
            return Matrix3.multiply(this, value, this);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    static multiply(matrix1, matrix2, target = new Matrix3()) {
        const a = matrix1.data;
        const b = matrix2.data;
        const c = target.data;
        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];
        const b00 = b[0], b01 = b[1], b02 = b[2];
        const b10 = b[3], b11 = b[4], b12 = b[5];
        const b20 = b[6], b21 = b[7], b22 = b[8];
        c[0] = b00 * a00 + b01 * a10 + b02 * a20;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22;
        c[3] = b10 * a00 + b11 * a10 + b12 * a20;
        c[4] = b10 * a01 + b11 * a11 + b12 * a21;
        c[5] = b10 * a02 + b11 * a12 + b12 * a22;
        c[6] = b20 * a00 + b21 * a10 + b22 * a20;
        c[7] = b20 * a01 + b21 * a11 + b22 * a21;
        c[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return target;
    }
    static multiplyVector(matrix, vector, target = new Vector3()) {
        const a = matrix.data;
        const b = vector;
        const c = target;
        const x = b.x, y = b.y, z = b.z;
        c.x = a[0] * x + a[3] * y + a[6] * z;
        c.y = a[1] * x + a[4] * y + a[7] * z;
        c.z = a[2] * x + a[5] * y + a[8] * z;
        return target;
    }
    static createRotation(rotation, target = new Matrix3()) {
        let matrix = target || new Matrix3();
        matrix.multiply(Matrix3.createRotationY(rotation.yaw));
        matrix.multiply(Matrix3.createRotationX(rotation.pitch));
        matrix.multiply(Matrix3.createRotationZ(rotation.roll));
        return matrix;
    }
    static createRotationX(angle, target = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[4] = 0;
        target.data[5] = cos;
        target.data[6] = sin;
        target.data[8] = 0;
        target.data[9] = -sin;
        target.data[10] = cos;
        return target;
    }
    static createRotationY(angle, target = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = cos;
        target.data[1] = 0;
        target.data[2] = -sin;
        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[8] = sin;
        target.data[9] = 0;
        target.data[10] = cos;
        return target;
    }
    static createRotationZ(angle, target = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = cos;
        target.data[1] = sin;
        target.data[2] = 0;
        target.data[4] = -sin;
        target.data[5] = cos;
        target.data[6] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        return target;
    }
}

var Orientation;
(function (Orientation) {
    Orientation[Orientation["North"] = 0] = "North";
    Orientation[Orientation["East"] = 1] = "East";
    Orientation[Orientation["South"] = 2] = "South";
    Orientation[Orientation["West"] = 3] = "West";
    Orientation[Orientation["Up"] = 4] = "Up";
    Orientation[Orientation["Down"] = 5] = "Down";
})(Orientation || (Orientation = {}));
(function (Orientation) {
    const rotations = new Map();
    function getRotation(orientation) {
        if (!rotations.has(orientation)) {
            rotations.set(orientation, calculateRotation(orientation));
        }
        return rotations.get(orientation);
    }
    Orientation.getRotation = getRotation;
    function toId(orientation) {
        switch (orientation) {
            case Orientation.North: return 'north';
            case Orientation.East: return 'east';
            case Orientation.South: return 'south';
            case Orientation.West: return 'west';
            case Orientation.Up: return 'up';
            case Orientation.Down: return 'down';
        }
    }
    Orientation.toId = toId;
    function calculateRotation(orientation) {
        switch (orientation) {
            case Orientation.North: return Rotation.fromDegrees(0, 0, 0);
            case Orientation.East: return Rotation.fromDegrees(0, 90, 0);
            case Orientation.South: return Rotation.fromDegrees(0, 180, 0);
            case Orientation.West: return Rotation.fromDegrees(0, 270, 0);
            case Orientation.Up: return Rotation.fromDegrees(-90, 0, 0);
            case Orientation.Down: return Rotation.fromDegrees(90, 0, 0);
        }
    }
    const matrices = new Map();
    function getMatrix(orientation) {
        if (!matrices.has(orientation)) {
            matrices.set(orientation, Matrix3.createRotation(getRotation(orientation)));
        }
        return matrices.get(orientation);
    }
    Orientation.getMatrix = getMatrix;
})(Orientation || (Orientation = {}));

var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
    Axis[Axis["Z"] = 2] = "Z";
})(Axis || (Axis = {}));
(function (Axis) {
    function orientation(axis) {
        return axis == Axis.X ? Orientation.East : axis == Axis.Y ? Orientation.Up : Orientation.North;
    }
    Axis.orientation = orientation;
    function name(axis) {
        return axis == Axis.X ? "x" : axis == Axis.Y ? "y" : "z";
    }
    Axis.name = name;
})(Axis || (Axis = {}));

class LogPrototype extends BaseBlockPrototype {
    model;
    constructor(model) {
        super();
        this.model = model;
    }
    whenPlaced(position) {
        console.log("Grass placed at " + position.toString());
    }
    getBlockModel(position) {
        return this.model;
    }
    static async setup() {
        const end = await Texture.load("blocks.log.end");
        const side = await Texture.load("blocks.log.side");
        for (let a = 0; a < 3; a++) {
            const axis = a;
            const model = new BlockModel();
            const box = new BoxModelComponent(new Vector3(1, 1, 1), [side, side, side, side, end, end]);
            const rotated = new RotatedModelComponent(Orientation.getRotation(Axis.orientation(axis)), new Vector3(0.5, 0.5, 0.5), box);
            model.add(rotated);
            Registries.blockModels.register('log.along_' + Axis.name(axis), model);
            Registries.blocks.register('log.along_' + Axis.name(axis), new LogPrototype(model));
        }
    }
}

class StonePrototype extends BaseBlockPrototype {
    whenPlaced(position) {
        console.log("Stone placed at " + position.toString());
    }
    getBlockModel(position) {
        return StonePrototype.model;
    }
    static model;
    static texture;
    static async setup() {
        this.texture = await Texture.load("blocks.stone");
        this.model = new BlockModel();
        const box = new BoxModelComponent(new Vector3(1, 1, 1), new Array(6).fill(this.texture));
        this.model.add(box);
    }
    static getBlockModel() {
        return StonePrototype.model;
    }
}

class BaseEntityPrototype {
    async setup() {
    }
}

var EntityPhysics;
(function (EntityPhysics) {
    function isOnGround(entity) {
        return false;
    }
    EntityPhysics.isOnGround = isOnGround;
    function applyFriction(entity, delta) {
        const state = entity.getPhysicalState();
        const properties = entity.getPhysicalProperties();
        {
            state.applyFriction(new Vector3(properties.friction.air, properties.friction.air, properties.friction.air));
        }
    }
    function applyVelocity(entity, delta) {
        const state = entity.getPhysicalState();
        entity.getPosition()
            .add(state.getVelocity().times(delta));
    }
    function simulateEntity(entity, delta) {
        if (!entity.getPhysicalState() || !entity.getPhysicalProperties()) {
            return;
        }
        //applyGravity(entity, delta);
        applyFriction(entity);
        applyVelocity(entity, delta);
    }
    EntityPhysics.simulateEntity = simulateEntity;
})(EntityPhysics || (EntityPhysics = {}));

class PhysicalEntityState {
    velocity = new Vector3();
    getVelocity() {
        return this.velocity.clone();
    }
    setVelocity(velocity) {
        this.velocity.set(velocity);
    }
    applyForce(force) {
        this.velocity.add(force);
    }
    applyFriction(friction) {
        this.velocity.multiply(friction);
    }
}

class PhysicalComponent {
    parent = null;
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        this.parent = parent;
        this.parent?.updateHitboxes();
    }
    getIntersection(rayWalker) {
        let distance = Infinity;
        for (let hitbox of this.getHitboxes()) {
            let intersection = hitbox.getIntersection(rayWalker);
            if (intersection !== null) {
                distance = Math.min(distance, intersection);
            }
        }
        return isFinite(distance) ? distance : null;
    }
}

class BoxPhysicalComponent extends PhysicalComponent {
    hitbox;
    constructor(hitbox) {
        super();
        this.hitbox = hitbox;
    }
    updateHitboxes() {
    }
    *getHitboxes() {
        yield this.hitbox;
    }
}

class PhysicalHitbox {
    position;
    size;
    constructor(position, size) {
        this.position = Vector3.immutable(position.clone());
        this.size = Vector3.immutable(size.clone());
    }
    getPosition() {
        return this.position;
    }
    getSize() {
        return this.size;
    }
    getIntersection(rayWalker) {
        let position = rayWalker.getPosition();
        let direction = rayWalker.getRay().getDirection();
        let xDistance = this.getDistanceToEdge(position.x, direction.x, this.position.x, this.size.x);
        let yDistance = this.getDistanceToEdge(position.y, direction.y, this.position.y, this.size.y);
        let zDistance = this.getDistanceToEdge(position.z, direction.z, this.position.z, this.size.z);
        let distance = Math.min(xDistance, yDistance, zDistance);
        return isFinite(distance) ? distance : null;
    }
    getDistanceToEdge(position, direction, thisPosition, thisSize) {
        if (direction === 0) {
            return Infinity;
        }
        else if (direction > 0) {
            return (thisPosition - position) / direction;
        }
        else {
            return (thisPosition + thisSize - position) / -direction;
        }
    }
}

class PhysicalModel {
    component;
    constructor(component) {
        this.component = component;
    }
    updateHitboxes() {
    }
    getHitboxes() {
        return this.component.getHitboxes();
    }
    getIntersection(rayWalker) {
        let distance = Infinity;
        for (let hitbox of this.getHitboxes()) {
            let intersection = hitbox.getIntersection(rayWalker);
            if (intersection !== null) {
                distance = Math.min(distance, intersection);
            }
        }
        return isFinite(distance) ? distance : null;
    }
}

class BaseEntity {
    id;
    chunk;
    world;
    position = Vector3.handle(new Vector3());
    rotation = new Rotation();
    constructor() {
        this.position.on('change', () => {
            // If the entity is not in a world or chunk, it doesn't need to update it's chunk
            if (this.world && this.chunk) {
                // Compute the location of the chunk the entity should be moved to.
                const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
                const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);
                // Get the location of the chunk object that currently contains the entity.
                const currentChunkPosition = this.chunk.getPosition();
                const currentChunkX = currentChunkPosition.x;
                const currentChunkZ = currentChunkPosition.y;
                // Check if the entity should move to a different chunk.
                if (currentChunkX != targetChunkX || currentChunkZ != targetChunkZ) {
                    // Get the chunk that the entity should be in.
                    let chunk = this.world.getChunk(targetChunkX, targetChunkZ);
                    if (!chunk) {
                        chunk = this.world.loadChunk(targetChunkX, targetChunkZ);
                    }
                    if (chunk.loadState.current != Infinity) {
                        chunk.loadState.target = Infinity;
                    }
                    // Update the chunk the entity is in.
                    this.setParentChunk(chunk);
                }
            }
        });
        this.id = BaseEntity.generateUniqueId();
    }
    setWorld(world) {
        if (world == null) {
            this.world = null;
            this.chunk = null;
            return;
        }
        // Set the entity's properties to be in the world.
        this.world = world;
        this.chunk = null;
        // Compute the location of the chunk the entity should be placed in.
        const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
        const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);
        // Get the chunk object that the entity should be placed in.
        let targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);
        // If the chunk object doesn't exist and the entity can load new chunks, load the chunk.
        if (!targetChunk && this.canLoadChunks()) {
            this.world.loadChunk(targetChunkX, targetChunkZ);
            targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);
        }
        // Update the chunk the entity is in.
        this.setParentChunk(targetChunk);
    }
    getWorld() {
        return this.world;
    }
    setParentChunk(chunk) {
        if (this.chunk && !this.chunk.isPlaceholder())
            this.chunk.getChunkData().removeEntity(this);
        this.chunk = chunk;
        if (this.chunk && !this.chunk.isPlaceholder())
            this.chunk.getChunkData().addEntity(this);
    }
    getParentChunk() {
        return this.chunk;
    }
    async tickEntity(delta) {
    }
    getPosition() {
        return this.position;
    }
    getRotation() {
        return this.rotation;
    }
    getUniqueId() {
        return this.id;
    }
    getEntityModel() {
        return null;
    }
    getPhysicalEntity() {
        return null;
    }
    whenJoinWorld() {
    }
    getPhysicalState() {
        return null;
    }
    getPhysicalProperties() {
        return null;
    }
    static generateUniqueId() {
        return crypto.randomUUID();
    }
}

class PlayerEntity extends BaseEntity {
    physicalState = new PhysicalEntityState();
    physicalProperties = {
        gravity: -0.3,
        friction: {
            air: 0.9,
            ground: 0.8
        },
        model: new PhysicalModel(new BoxPhysicalComponent(new PhysicalHitbox(new Vector3(0, 0, 0), new Vector3(1, 1.8, 1))))
    };
    getPrototype() {
        return Registries.entities.get('player');
    }
    canLoadChunks() {
        return true;
    }
    async tickEntity(delta) {
        super.tickEntity(delta);
        EntityPhysics.simulateEntity(this, delta);
    }
    getPhysicalProperties() {
        return this.physicalProperties;
    }
    getPhysicalState() {
        return this.physicalState;
    }
}

class PlayerPrototype extends BaseEntityPrototype {
    createEntity() {
        return new PlayerEntity();
    }
}

async function loadGameContent() {
    Registries.entities.register('player', new PlayerPrototype());
    await StonePrototype.setup();
    Registries.blocks.register('stone', new StonePrototype());
    Registries.blockModels.register('stone', StonePrototype.getBlockModel());
    await DirtPrototype.setup();
    Registries.blocks.register('dirt', new DirtPrototype());
    Registries.blockModels.register('dirt', DirtPrototype.getBlockModel());
    await GrassPrototype.setup();
    Registries.blocks.register('grass', new GrassPrototype());
    Registries.blockModels.register('grass', GrassPrototype.getBlockModel());
    Registries.blocks.register('air', new AirPrototype());
    await LogPrototype.setup();
    await LeavesPrototype.setup();
    await CobblestonePrototype.setup();
}

class EventClock {
    tasks = new Set();
    delta = 0;
    tick = 0;
    startTime = null;
    lastTime = null;
    taskInfo = null;
    constructor() {
    }
    runOnce(name, task) {
        const wrapper = () => {
            task();
            this.unschedule(wrapper);
        };
        this.schedule(name, wrapper);
    }
    schedule(name, task) {
        this.tasks.add({
            name,
            handler: task
        });
    }
    unschedule(identifier) {
        for (const task of this.tasks) {
            if (task.handler === identifier || task.name === identifier) {
                this.tasks.delete(task);
            }
        }
    }
    getDelta() {
        return this.delta / 1000;
    }
    getTime() {
        if (this.startTime === null)
            throw new Error("Clock not started");
        return Date.now() - this.startTime;
    }
    getTick() {
        return this.tick;
    }
    getTaskInfo() {
        return this.taskInfo;
    }
    async start() {
        if (this.lastTime === null) {
            this.lastTime = Date.now();
            this.startTime = Date.now();
        }
        const frameDelay = Date.now() - this.lastTime;
        const tasks = [];
        for (const task of this.tasks) {
            let start = Date.now();
            await task.handler();
            tasks.push({
                name: task.name,
                time: Date.now() - start
            });
        }
        this.delta = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        tasks.unshift({
            name: "frameDelay",
            time: frameDelay
        });
        this.taskInfo = {
            tasks,
            delta: this.delta,
            tick: this.tick,
            time: this.getTime()
        };
        this.tick++;
        requestAnimationFrame(() => this.start());
    }
}

class InitDispatcher {
    tasks;
    constructor() {
        this.tasks = new Set();
    }
    schedule(name, timing, func) {
        if (func instanceof Function && typeof timing == 'number') {
            this.tasks.add(new InitTask(name, func, timing));
        }
        else if (typeof func == 'number') {
            return (f, _context) => this.schedule(name, timing, f);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    unschedule(func) {
        for (const task of this.tasks) {
            if (task.func == func) {
                this.tasks.delete(task);
                break;
            }
        }
    }
    async run() {
        let start = Date.now();
        let timings = [];
        for (const task of this.tasks) {
            timings[task.timing] = timings[task.timing] || [];
            timings[task.timing].push(task);
        }
        for (const timing of timings) {
            console.log("InitDispatcher: Beginning tasks of Timing." + timing[0].timing + " in parallel.");
            await new Promise((resolve) => {
                let resolved = 0;
                for (const task of timing) {
                    task.func().then(() => {
                        resolved++;
                        if (resolved == timing.length) {
                            resolve();
                        }
                    });
                }
            });
        }
        let end = Date.now();
        console.log("Game started in " + (end - start) + "ms.");
    }
}
class InitTask {
    name;
    func;
    timing;
    constructor(name, func, timing) {
        this.name = name;
        this.func = func;
        this.timing = timing;
    }
}
(function (InitDispatcher) {
    (function (Timing) {
        Timing["Cache"] = "Cache";
        Timing["Instantiate"] = "Instantiate";
        Timing["Register"] = "Register";
        Timing["Build"] = "Build";
    })(InitDispatcher.Timing || (InitDispatcher.Timing = {}));
})(InitDispatcher || (InitDispatcher = {}));

class Game {
    static init = new InitDispatcher();
    world;
    clock = new EventClock();
    constructor() {
        this.world = new World();
    }
    async start() {
        await Game.init.run();
        Registries.fields.register('blockId', new ChunkDataNumberAllocation('u16'));
        await loadGameContent();
        await Registries.blocks.setup();
        await Registries.textures.setup();
        await Registries.blockModels.setup();
        //await new Promise(resolve => setTimeout(resolve, 10000));
    }
    isGameClient() {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer || this.getRuntimeType() === GameRuntimeType.MultiplayerClient;
    }
    isGameServer() {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer || this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }
    isSingleplayer() {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer;
    }
    isMultiplayer() {
        return this.getRuntimeType() === GameRuntimeType.MultiplayerClient || this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }
    isMultiplayerServer() {
        return this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }
    getWorld() {
        return this.world;
    }
    getClock() {
        return this.clock;
    }
}

class Color {
    red;
    green;
    blue;
    alpha;
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    static fromHex(hex) {
        const red = parseInt(hex.substring(1, 3), 16);
        const green = parseInt(hex.substring(3, 5), 16);
        const blue = parseInt(hex.substring(5, 7), 16);
        return new Color(red / 255, green / 255, blue / 255, 1);
    }
    static fromRGB(red, green, blue) {
        return new Color(red / 255, green / 255, blue / 255, 1);
    }
    static fromRGBA(red, green, blue, alpha) {
        return new Color(red / 255, green / 255, blue / 255, alpha);
    }
    static toHex(color) {
        const red = Math.round(color.red * 255).toString(16).padStart(2, "0");
        const green = Math.round(color.green * 255).toString(16).padStart(2, "0");
        const blue = Math.round(color.blue * 255).toString(16).padStart(2, "0");
        return `#${red}${green}${blue}`;
    }
    static toRGB(color) {
        const red = Math.round(color.red * 255);
        const green = Math.round(color.green * 255);
        const blue = Math.round(color.blue * 255);
        return `rgb(${red}, ${green}, ${blue})`;
    }
    static toRGBA(color) {
        const red = Math.round(color.red * 255);
        const green = Math.round(color.green * 255);
        const blue = Math.round(color.blue * 255);
        return `rgba(${red}, ${green}, ${blue}, ${color.alpha})`;
    }
    static toGPUColor(color) {
        return {
            r: color.red,
            g: color.green,
            b: color.blue,
            a: color.alpha
        };
    }
    static blend(color1, color2, factor) {
        const inverseFactor = 1 - factor;
        const red = color1.red * factor + color2.red * inverseFactor;
        const green = color1.green * factor + color2.green * inverseFactor;
        const blue = color1.blue * factor + color2.blue * inverseFactor;
        const alpha = color1.alpha * factor + color2.alpha * inverseFactor;
        return new Color(red, green, blue, alpha);
    }
}

class Matrix4 {
    data;
    constructor(source) {
        if (source instanceof Matrix3) {
            this.data = [
                source.data[0], source.data[1], source.data[2], 0,
                source.data[3], source.data[4], source.data[5], 0,
                source.data[6], source.data[7], source.data[8], 0,
                0, 0, 0, 1
            ];
        }
        else if (source instanceof Matrix4) {
            this.data = source.data.map(item => item);
        }
        else if (source) {
            this.data = source.map(item => item);
        }
        else {
            this.data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }
    multiply(value) {
        if (value instanceof Vector3) {
            return Matrix4.multiplyVector(this, value);
        }
        else if (value instanceof Matrix4) {
            return Matrix4.multiply(this, value, this);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    get translation() {
        return new Vector3(this.data[12], this.data[13], this.data[14]);
    }
    set translation(value) {
        this.data[12] = value.x;
        this.data[13] = value.y;
        this.data[14] = value.z;
    }
    static multiply(matrix1, matrix2, target = new Matrix4()) {
        const a = matrix1.data;
        const b = matrix2.data;
        const c = target.data;
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3];
        const b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7];
        const b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11];
        const b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
        c[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        c[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        c[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        c[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        c[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        c[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        c[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        c[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        c[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        c[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        c[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        c[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        c[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        c[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
        return target;
    }
    static multiplyVector(matrix, vector, target = new Vector3()) {
        const a = matrix.data;
        const b = vector;
        const c = target;
        const x = b.x, y = b.y, z = b.z;
        c.x = a[0] * x + a[4] * y + a[8] * z + a[12];
        c.y = a[1] * x + a[5] * y + a[9] * z + a[13];
        c.z = a[2] * x + a[6] * y + a[10] * z + a[14];
        return target;
    }
    static inverse(matrix, target = new Matrix4()) {
        const a = matrix.data;
        const b = target.data;
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det)
            return null;
        const invDet = 1 / det;
        b[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        b[1] = (a02 * b10 - a01 * b11 - a03 * b09) * invDet;
        b[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        b[3] = (a22 * b04 - a21 * b05 - a23 * b03) * invDet;
        b[4] = (a12 * b08 - a10 * b11 - a13 * b07) * invDet;
        b[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        b[6] = (a32 * b02 - a30 * b05 - a33 * b01) * invDet;
        b[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        b[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        b[9] = (a01 * b08 - a00 * b10 - a03 * b06) * invDet;
        b[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        b[11] = (a21 * b02 - a20 * b04 - a23 * b00) * invDet;
        b[12] = (a11 * b07 - a10 * b09 - a12 * b06) * invDet;
        b[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        b[14] = (a31 * b01 - a30 * b03 - a32 * b00) * invDet;
        b[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        return target;
    }
    static createTranslation(vector, target = new Matrix4()) {
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        target.data[11] = 0;
        target.data[12] = vector.x;
        target.data[13] = vector.y;
        target.data[14] = vector.z;
        target.data[15] = 1;
        return target;
    }
    static createScale(vector, target = new Matrix4()) {
        target.data[0] = vector.x;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = vector.y;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = vector.z;
        target.data[11] = 0;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;
        return target;
    }
    static createRotation(rotation, target = new Matrix4()) {
        let matrix = target || new Matrix4();
        matrix.multiply(Matrix4.createWorldAxisRotation(Axis.Y, rotation.yaw));
        matrix.multiply(Matrix4.createWorldAxisRotation(Axis.X, rotation.pitch));
        matrix.multiply(Matrix4.createWorldAxisRotation(Axis.Z, rotation.roll));
        return matrix;
    }
    static createWorldAxisRotation(axis, angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        if (axis == Axis.X) {
            return new Matrix4([
                1, 0, 0, 0,
                0, cos, sin, 0,
                0, -sin, cos, 0,
                0, 0, 0, 1
            ]);
        }
        else if (axis == Axis.Y) {
            return new Matrix4([
                cos, 0, -sin, 0,
                0, 1, 0, 0,
                sin, 0, cos, 0,
                0, 0, 0, 1
            ]);
        }
        else if (axis == Axis.Z) {
            return new Matrix4([
                cos, sin, 0, 0,
                -sin, cos, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }
        return new Matrix4();
    }
    static createPerspective(fov, aspect, near, far, target = new Matrix4()) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const rangeInv = 1 / (near - far);
        target.data[0] = f / aspect;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = f;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = far * rangeInv;
        target.data[11] = -1;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = near * far * rangeInv;
        target.data[15] = 0;
        return target;
    }
    static identity(target) {
        if (!target)
            return new Matrix4();
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        target.data[11] = 0;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;
        return target;
    }
}

class Projector {
    fieldOfView;
    aspect;
    near;
    far;
    projectionMatrix = null;
    constructor(fieldOfView = Math.PI / 180 * 75, aspect = 1, near = 0.1, far = 1000) {
        this.fieldOfView = fieldOfView;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    getFieldOfView() {
        return this.fieldOfView;
    }
    setFieldOfView(fieldOfView) {
        this.fieldOfView = fieldOfView;
        this.projectionMatrix = null;
    }
    getAspectRatio() {
        return this.aspect;
    }
    setAspectRatio(aspect) {
        this.aspect = aspect;
        this.projectionMatrix = null;
    }
    getNear() {
        return this.near;
    }
    setNear(near) {
        this.near = near;
        this.projectionMatrix = null;
    }
    getFar() {
        return this.far;
    }
    setFar(far) {
        this.far = far;
        this.projectionMatrix = null;
    }
    getProjectionMatrix() {
        if (!this.projectionMatrix) {
            this.projectionMatrix = this.computeProjectionMatrix();
        }
        return this.projectionMatrix;
    }
    computeProjectionMatrix() {
        return Matrix4.createPerspective(this.fieldOfView, this.aspect, this.near, this.far);
    }
}

class BindGroupManager {
    bindGroups = new Set();
    async setup(device) {
        for (const bindGroup of this.bindGroups) {
            await bindGroup.setup(device);
        }
        console.log("BindGroupManager setup");
        console.log(this.bindGroups);
    }
    addBindGroup(bindGroup) {
        this.bindGroups.add(bindGroup);
    }
}

var Bindings;
(function (Bindings) {
    Bindings.CameraBindGroup = 0;
    Bindings.CameraDataBinding = 0;
    Bindings.TerrainBindGroup = 1;
    Bindings.BlockModelGeometryBinding = 0;
    Bindings.BlockModelTextureMappingBinding = 1;
    Bindings.BlockModelTextureBinding = 2;
    Bindings.BlockModelTextureSamplerBinding = 3;
    Bindings.ChunkPositionBinding = 4;
})(Bindings || (Bindings = {}));

class BindGroup {
    index;
    entries = new Set();
    layout;
    group;
    creationStack;
    constructor(index) {
        this.index = index;
        this.creationStack = undefined;
    }
    async setup(device) {
        for (const entry of this.entries) {
            await entry.setup(device);
        }
        const layoutEntries = [];
        for (const entry of this.entries) {
            layoutEntries.push(entry.getLayoutEntry());
        }
        this.layout = device.getDevice().createBindGroupLayout({
            label: `Bind Group Layout ${this.index}`,
            entries: layoutEntries
        });
        const bindGroupEntries = [];
        for (const entry of this.entries) {
            bindGroupEntries.push(entry.getBindGroupEntry());
        }
        this.group = device.getDevice().createBindGroup({
            label: `Bind Group ${this.index}`,
            layout: this.layout,
            entries: bindGroupEntries
        });
    }
    addEntry(binding, entry) {
        this.entries.add(entry);
        entry.setBinding(binding);
    }
    getBindGroupLayout() {
        return this.layout;
    }
    getBindGroupIndex() {
        return this.index;
    }
    getBindGroup() {
        return this.group;
    }
    static LOGGING = false;
}

class BaseBindGroupEntry {
    binding;
    label = "";
    setLabel(label) {
        this.label = label;
    }
    getLabel(defaultValue) {
        return this.label + (defaultValue ? " - " + defaultValue : "") + ` (Index ${this.binding})`;
    }
    getBinding() {
        return this.binding;
    }
    setBinding(index) {
        this.binding = index;
    }
}

class BufferBindGroupEntry extends BaseBindGroupEntry {
    buffer;
    visibility;
    type;
    constructor(buffer, visibility, type) {
        super();
        this.buffer = buffer;
        this.visibility = visibility;
        this.type = type;
    }
    getLabel() {
        return super.getLabel("Buffer");
    }
    async setup(device) {
    }
    getLayoutEntry() {
        return {
            binding: this.binding,
            visibility: this.visibility,
            buffer: {
                type: this.type
            }
        };
    }
    getBindGroupEntry() {
        return {
            binding: this.binding,
            resource: {
                buffer: this.buffer
            }
        };
    }
}

class Camera {
    bindGroup;
    bindGroupEntry;
    buffer;
    perspective;
    projector;
    async setup(device) {
        this.buffer = device.getDevice().createBuffer({
            size: 4 * 4 * 32 * 2,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.bindGroup = new BindGroup(Bindings.CameraBindGroup);
        this.bindGroupEntry = new BufferBindGroupEntry(this.buffer, GPUShaderStage.VERTEX, "uniform");
        this.bindGroupEntry.setLabel("Camera");
        this.bindGroup.addEntry(Bindings.CameraDataBinding, this.bindGroupEntry);
    }
    setPerspective(perspective) {
        this.perspective = perspective;
    }
    setProjector(projector) {
        this.projector = projector;
    }
    getCameraBindGroup() {
        return this.bindGroup;
    }
    update(device) {
        if (!this.projector)
            throw new Error('Projector is not set before updating camera');
        const data = new Float32Array(4 * 4);
        const viewMatrix = Matrix4.inverse(this.perspective?.getTransformationMatrix() || Matrix4.identity());
        if (!viewMatrix)
            throw new Error('Translation matrix is not invertible');
        const cameraMatrix = Matrix4.multiply(this.projector.getProjectionMatrix(), viewMatrix);
        data.set(cameraMatrix.data, 0);
        device.getDevice().queue.writeBuffer(this.buffer, 0, data);
    }
    getDataBuffer() {
        return this.buffer;
    }
    static TEST_PROJECTION = false;
    static TEST_VIEW = false;
}

class DepthTexture {
    texture;
    device;
    width;
    height;
    view;
    async resize(width, height) {
        if (this.width === width && this.height === height)
            return;
        this.width = width;
        this.height = height;
        if (this.texture)
            this.texture.destroy();
        this.texture = this.device.getDevice().createTexture({
            label: "Depth Texture",
            format: 'depth24plus',
            size: [this.width, this.height],
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            sampleCount: this.device.getRenderer().getMultisampleTexture().getSampleCount()
        });
        this.view = this.texture.createView({ label: "Depth Texture [View]" });
    }
    async setup(device) {
        this.device = device;
    }
    addToPipelineDescriptor(descriptor) {
        descriptor.depthStencil = {
            format: 'depth24plus',
            depthWriteEnabled: true,
            depthCompare: 'less'
        };
    }
    addToRenderPassDescriptor(descriptor) {
        descriptor.depthStencilAttachment = {
            view: this.view,
            depthLoadOp: 'load',
            depthStoreOp: 'store'
        };
    }
    createView() {
        return this.view;
    }
}

class GraphicsDevice {
    canvas;
    renderer;
    device;
    adapter;
    context;
    constructor(canvas, renderer) {
        this.canvas = canvas;
        this.renderer = renderer;
    }
    async setup() {
        console.log("Initializing WebGPU");
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }
        this.adapter = adapter;
        this.device = await adapter.requestDevice();
        this.context = this.canvas.getContext('webgpu');
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat(),
            alphaMode: 'premultiplied'
        });
    }
    getDevice() {
        return this.device;
    }
    getContext() {
        return this.context;
    }
    getCanvas() {
        return this.canvas;
    }
    getAdapter() {
        return this.adapter;
    }
    getRenderer() {
        return this.renderer;
    }
}

class MultisampleTexture {
    texture;
    device;
    width;
    height;
    view;
    async resize(width, height) {
        return;
    }
    async setup(device) {
        this.device = device;
    }
    addToAttachment(source = {}) {
        const canvasTextureView = this.device.getContext().getCurrentTexture().createView({ label: "Canvas Texture [View]" });
        return Object.assign(source, {
            view: canvasTextureView
        });
    }
    getSampleCount() {
        return MultisampleTexture.ENABLED ? 4 : 1;
    }
    static ENABLED = false;
}

class ClearRenderPass {
    color;
    device;
    constructor(color) {
        this.color = color;
    }
    async setup(device) {
        this.device = device;
    }
    async setupBindings(device) {
    }
    async render() {
        const commandEncoder = this.device.getDevice().createCommandEncoder({
            label: "Clear Render Pass / Command Encoder"
        });
        const renderPassDescriptor = {
            colorAttachments: [
                this.device.getRenderer().getMultisampleTexture().addToAttachment({
                    clearValue: Color.toGPUColor(this.color),
                    loadOp: "clear",
                    storeOp: "store"
                })
            ],
            depthStencilAttachment: {
                view: this.device.getRenderer().getDepthTexture().createView(),
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store'
            }
        };
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.end();
        this.device.getDevice().queue.submit([commandEncoder.finish()]);
    }
}

class TextureSampler extends BaseBindGroupEntry {
    sampler;
    getLayoutEntry() {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: {}
        };
    }
    getLabel() {
        return super.getLabel("Texture Sampler");
    }
    getBindGroupEntry() {
        return {
            binding: this.binding,
            resource: this.sampler
        };
    }
    async setup(device) {
        this.sampler = device.getDevice().createSampler({
            magFilter: 'nearest',
            minFilter: 'nearest',
            mipmapFilter: 'nearest',
            lodMinClamp: 0,
            lodMaxClamp: 0
        });
    }
}

class WebGPUTexture extends BaseBindGroupEntry {
    source;
    texture = null;
    constructor(source) {
        super();
        this.source = source;
    }
    getLabel() {
        return super.getLabel("Texture");
    }
    getLayoutEntry() {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            texture: {
                sampleType: 'float',
                viewDimension: '2d'
            }
        };
    }
    getBindGroupEntry() {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }
        return {
            binding: this.binding,
            resource: this.texture.createView({ label: this.getLabel() + ' [View]' })
        };
    }
    getTexture() {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }
        return this.texture;
    }
    getBinding() {
        return this.binding;
    }
    async setup(device) {
        this.texture = device.getDevice().createTexture({
            label: this.label,
            size: [
                this.source.getTextureWidth(),
                this.source.getTextureHeight()
            ],
            format: 'rgba8unorm',
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING
        });
        device.getDevice().queue.writeTexture({ texture: this.texture }, this.source.toDataArray(), { bytesPerRow: this.source.getTextureWidth() * 4, rowsPerImage: this.source.getTextureHeight() }, [this.source.getTextureWidth(), this.source.getTextureHeight()]);
    }
}

var BufferAlignment;
(function (BufferAlignment) {
    function alignItems(data, size, alignedSize) {
        let dataArray = new Uint8Array(data);
        let items = dataArray.length / size;
        let alignedArray = new Uint8Array(items * (alignedSize));
        for (let i = 0; i < items; i++) {
            let offset = i * size;
            let alignedOffset = i * alignedSize;
            alignedArray.set(dataArray.slice(offset, offset + size), alignedOffset);
        }
        return alignedArray.buffer;
    }
    BufferAlignment.alignItems = alignItems;
})(BufferAlignment || (BufferAlignment = {}));

class ShaderModule {
    label;
    code;
    shaderModule;
    constructor(label, code) {
        this.label = label;
        this.code = code;
    }
    setup(graphicsDevice) {
        this.shaderModule = graphicsDevice.getDevice().createShaderModule({
            label: this.label,
            code: this.code
        });
    }
    getShaderModule() {
        return this.shaderModule;
    }
    static async import(path, label = path) {
        const response = await fetch(path);
        const code = await response.text();
        return new ShaderModule(label, code);
    }
}

class PipelineBindGroupManager {
    parent;
    usedGroups = new Set();
    constructor(parent) {
        this.parent = parent;
    }
    useBindGroup(bindGroup) {
        this.parent.addBindGroup(bindGroup);
        this.usedGroups.add(bindGroup);
    }
    addBindGroupsToPipelineLayout(pipelineLayout) {
        const bindGroupLayouts = [];
        for (const bindGroup of this.usedGroups) {
            bindGroupLayouts.push(bindGroup.getBindGroupLayout());
        }
        pipelineLayout.bindGroupLayouts = bindGroupLayouts;
    }
    setBindGroupsOnRenderPassEncoder(encoder) {
        for (const bindGroup of this.usedGroups) {
            encoder.setBindGroup(bindGroup.getBindGroupIndex(), bindGroup.getBindGroup());
        }
    }
}

class BaseRenderPass {
    pipeline;
    descriptor = {};
    pipelineLayout;
    bindGroupManager;
    device;
    depthTest = false;
    alpha = false;
    setBindGroupManager(bindGroupManager) {
        this.bindGroupManager = new PipelineBindGroupManager(bindGroupManager);
    }
    async setup(device) {
        const gpuDevice = device.getDevice();
        this.descriptor.multisample = {
            count: device.getRenderer().getMultisampleTexture().getSampleCount()
        };
        const layoutDescriptor = {};
        this.bindGroupManager.addBindGroupsToPipelineLayout(layoutDescriptor);
        this.pipelineLayout = gpuDevice.createPipelineLayout(layoutDescriptor);
        this.descriptor.layout = this.pipelineLayout;
        if (this.depthTest) {
            device.getRenderer().getDepthTexture().addToPipelineDescriptor(this.descriptor);
        }
        this.pipeline = gpuDevice.createRenderPipeline(this.descriptor);
        this.device = device;
    }
    async setupBindings(device) {
    }
    addLabel(label) {
        this.descriptor.label = label;
    }
    addVertexStage(module, entryPoint) {
        this.descriptor.vertex = {
            module: module.getShaderModule(),
            entryPoint
        };
    }
    addFragmentStage(module, entryPoint) {
        let target = {
            format: navigator.gpu.getPreferredCanvasFormat()
        };
        if (this.alpha) {
            target.blend = {
                color: {
                    srcFactor: "src-alpha",
                    dstFactor: "one-minus-src-alpha",
                    operation: "add"
                },
                alpha: {
                    srcFactor: "src-alpha",
                    dstFactor: "one-minus-src-alpha",
                    operation: "add"
                }
            };
        }
        this.descriptor.fragment = {
            module: module.getShaderModule(),
            entryPoint,
            targets: [
                target
            ]
        };
    }
    addPrimitiveTopology(topology, cullMode = "none") {
        this.descriptor.primitive = {
            topology,
            cullMode
        };
    }
    getBindGroupManager() {
        return this.bindGroupManager;
    }
    getPipelineLayout() {
        return this.pipelineLayout;
    }
    createCommandEncoder(passLabel) {
        return this.device.getDevice().createCommandEncoder({
            label: `${passLabel} / Command Encoder`
        });
    }
    createRenderPass(commandEncoder) {
        const renderPassDescriptor = {
            colorAttachments: [
                this.device.getRenderer().getMultisampleTexture().addToAttachment({
                    loadOp: "load",
                    storeOp: "store"
                })
            ]
        };
        if (this.depthTest) {
            this.device.getRenderer().getDepthTexture().addToRenderPassDescriptor(renderPassDescriptor);
        }
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        this.bindGroupManager.setBindGroupsOnRenderPassEncoder(renderPass);
        renderPass.setPipeline(this.pipeline);
        return renderPass;
    }
    getGraphicsDevice() {
        return this.device;
    }
}

class TerrainRenderPass extends BaseRenderPass {
    worldMirror;
    indirectDrawBuffer;
    chunkPositionBuffer;
    depthTest = true;
    depthBufferFactor = 0.0;
    constructor(worldMirror) {
        super();
        this.worldMirror = worldMirror;
    }
    async setupBindings(device) {
        const gpuDevice = device.getDevice();
        this.indirectDrawBuffer = gpuDevice.createBuffer({
            label: "Terrain Indirect Draw Buffer",
            usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            size: ChunkDataReferencer.cells * 4 * 4
        });
        const shader = await ShaderModule.import("/assets/shaders/terrain.wgsl", "Terrain Shader");
        shader.setup(device);
        this.addPrimitiveTopology("triangle-list", "front");
        this.addLabel("Terrain Render Pass");
        this.addVertexStage(shader, "vertex_main");
        this.addFragmentStage(shader, "fragment_main");
        this.getBindGroupManager().useBindGroup(device.getRenderer().getCamera().getCameraBindGroup());
        await this.setupBlockModelBindings(device);
    }
    async setupBlockModelBindings(device) {
        const terrainBindGroup = new BindGroup(Bindings.TerrainBindGroup);
        await this.setupGeometryBindings(terrainBindGroup, device);
        await this.setupTextureMappingBindings(terrainBindGroup, device);
        await this.setupTextureBindings(terrainBindGroup, device);
        await this.setupTextureSamplerBindings(terrainBindGroup, device);
        await this.setupChunkPositionBindings(terrainBindGroup, device);
        this.getBindGroupManager().useBindGroup(terrainBindGroup);
        // const configureBindGroup = new BindGroup(2);
        // configureBindGroup.addEntry(0, new );
    }
    async setupGeometryBindings(bindGroup, device) {
        const gpuDevice = device.getDevice();
        const geometryData = this.worldMirror.getTerrainMesh().getVertexPositions().buffer;
        const alignedData = BufferAlignment.alignItems(geometryData, 12, 16);
        const geometryBuffer = gpuDevice.createBuffer({
            label: "Block Geometry Buffer",
            size: alignedData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });
        gpuDevice.queue.writeBuffer(geometryBuffer, 0, alignedData);
        const geometryBindGroupEntry = new BufferBindGroupEntry(geometryBuffer, GPUShaderStage.VERTEX, "read-only-storage");
        geometryBindGroupEntry.setLabel("Block Geometry");
        bindGroup.addEntry(Bindings.BlockModelGeometryBinding, geometryBindGroupEntry);
    }
    async setupTextureMappingBindings(bindGroup, device) {
        const gpuDevice = device.getDevice();
        const textureMappingData = this.worldMirror.getTerrainMesh().getTextureMappings();
        const textureMappingBuffer = gpuDevice.createBuffer({
            label: "Block Texture Mapping Buffer",
            size: textureMappingData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });
        gpuDevice.queue.writeBuffer(textureMappingBuffer, 0, textureMappingData);
        const textureMappingBindGroupEntry = new BufferBindGroupEntry(textureMappingBuffer, GPUShaderStage.VERTEX, "read-only-storage");
        textureMappingBindGroupEntry.setLabel("Block Texture Mapping");
        bindGroup.addEntry(Bindings.BlockModelTextureMappingBinding, textureMappingBindGroupEntry);
    }
    async setupTextureBindings(bindGroup, device) {
        const texture = this.worldMirror.getTerrainMesh().getTexture();
        const gpuTexture = new WebGPUTexture(texture);
        gpuTexture.setLabel("Block Texture Atlas");
        bindGroup.addEntry(Bindings.BlockModelTextureBinding, gpuTexture);
    }
    async setupTextureSamplerBindings(bindGroup, device) {
        const textureSampler = new TextureSampler();
        textureSampler.setLabel("Block Texture Sampler");
        bindGroup.addEntry(Bindings.BlockModelTextureSamplerBinding, textureSampler);
    }
    async setupChunkPositionBindings(bindGroup, device) {
        const gpuDevice = device.getDevice();
        const buffer = gpuDevice.createBuffer({
            label: "Chunk Position",
            size: 8,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        const entry = new BufferBindGroupEntry(buffer, GPUShaderStage.VERTEX, "uniform");
        entry.setLabel("Chunk Position");
        bindGroup.addEntry(Bindings.ChunkPositionBinding, entry);
        this.chunkPositionBuffer = buffer;
    }
    async render() {
        const gpuDevice = this.getGraphicsDevice().getDevice();
        for (const chunk of this.worldMirror.getVisibleChunks()) {
            const commandEncoder = this.createCommandEncoder("Terrain Render Pass");
            const renderPass = this.createRenderPass(commandEncoder);
            gpuDevice.queue.writeBuffer(this.chunkPositionBuffer, 0, new Float32Array(chunk.getPosition()));
            this._draw(renderPass, gpuDevice, chunk.getIndirectDrawCalls(), chunk.getIndirectCallCount());
            renderPass.end();
            gpuDevice.queue.submit([commandEncoder.finish()]);
        }
    }
    _draw(renderPass, gpuDevice, drawCalls, callsLength) {
        {
            for (let i = 0; i < drawCalls.length; i += 4) {
                const vertexCount = drawCalls[i + 0];
                const instanceCount = drawCalls[i + 1];
                const firstVertex = drawCalls[i + 2];
                const firstInstance = drawCalls[i + 3];
                if (vertexCount === 0 || instanceCount === 0)
                    continue;
                renderPass.draw(vertexCount, instanceCount, firstVertex, firstInstance);
            }
        }
    }
    static DISABLE_INDIRECT_DRAWING = true;
}

class RenderWorldMirror {
    chunks = new Map();
    getChunks() {
        return this.chunks.values();
    }
    updateRenderedWorld() {
        const perspective = this.getPerspective();
        if (!perspective) {
            throw new Error("Cannot update rendered world without perspective");
        }
        const world = this.getWorld();
        const perspectiveLocation = perspective.getChunkLocation();
        const renderDistance = perspective.getRenderDistance();
        const renderDistanceSquared = renderDistance ** 2;
        for (const [key, mirror] of this.chunks) {
            const chunk = world.getChunk(mirror.getPosition());
            if (!chunk)
                continue;
            if (chunk.isPlaceholder())
                continue;
            const chunkPosition = chunk.getPosition();
            if (chunkPosition.distanceSquaredTo(perspectiveLocation) > renderDistanceSquared) {
                this.chunks.delete(key);
            }
        }
        for (let x = perspectiveLocation.x - renderDistance; x <= perspectiveLocation.x + renderDistance; x++) {
            for (let z = perspectiveLocation.y - renderDistance; z <= perspectiveLocation.y + renderDistance; z++) {
                const chunk = world.getChunk(x, z);
                if (!chunk || chunk.loadState.current != Infinity) {
                    continue;
                }
                const key = x + '.' + z;
                const position = new ImmutableVector2D(x, z);
                if (!this.chunks.has(key)) {
                    this.chunks.set(key, this.createRenderChunkMirror(position));
                }
            }
        }
    }
}

class AssembledMesh {
    vertexPositions;
    textureMappings;
    texture;
    indexes;
    constructor(vertexPositions, textureMappings, texture, indexes) {
        this.vertexPositions = vertexPositions;
        this.textureMappings = textureMappings;
        this.texture = texture;
        this.indexes = indexes;
    }
    getVertexPositions() {
        return this.vertexPositions;
    }
    getTextureMappings() {
        return this.textureMappings;
    }
    getTexture() {
        return this.texture;
    }
    getModelStartIndex(model) {
        if (!this.indexes.has(model))
            throw new Error('Model not found in mesh assembler');
        return this.indexes.get(model)[0];
    }
    getModelEndIndex(model) {
        if (!this.indexes.has(model))
            throw new Error('Model not found in mesh assembler');
        return this.indexes.get(model)[1];
    }
}

class MeshAssembler {
    models;
    vertexPositions;
    textureMappings;
    texture;
    modelIndexes;
    constructor(models) {
        this.models = Array.from(models);
    }
    setupModelsAndIndexes() {
        this.modelIndexes = new Map();
        const modelVertexPositions = [];
        const modelTextureMappings = [];
        const modelTextureIds = [];
        let vertexIndex = 0;
        for (const model of this.models) {
            const vertexPositions = model.getVertexPositions();
            const textureMappings = model.getTextureMappings();
            const textureIds = model.getTextureIds();
            const startIndex = vertexIndex;
            modelVertexPositions.push(vertexPositions);
            modelTextureMappings.push(textureMappings);
            modelTextureIds.push(textureIds);
            vertexIndex += vertexPositions.length / 3;
            const endIndex = vertexIndex;
            this.modelIndexes.set(model, [startIndex, endIndex]);
        }
        return {
            modelGeometries: modelVertexPositions,
            modelTextureMappings: modelTextureMappings,
            modelTextureIds: modelTextureIds,
            totalVertexCount: vertexIndex
        };
    }
    assembleMeshes() {
        if (this.texture) {
            return this.createAssembledMesh();
        }
        const { modelGeometries, modelTextureMappings, modelTextureIds, totalVertexCount } = this.setupModelsAndIndexes();
        this.vertexPositions = new Float32Array(DataUtils.concat(modelGeometries));
        const textureArray = this.getTextureArrayFromModelTextureIds(modelTextureIds);
        const combinedSize = this.getCombinedTextureSize(textureArray);
        const { texturePositions, texture } = this.renderCombinedTextures(combinedSize, textureArray);
        this.texture = texture;
        this.textureMappings = new Float32Array(totalVertexCount * 2);
        for (let modelIndex = 0; modelIndex < modelTextureIds.length; modelIndex++) {
            const modelIndexes = this.modelIndexes.get(this.models[modelIndex]);
            if (!modelIndexes)
                throw new Error(`Geometry indexing error with model ${modelIndex}`);
            const textureIds = modelTextureIds[modelIndex];
            const textureMappings = modelTextureMappings[modelIndex];
            for (let triangleIndex = 0; triangleIndex < textureIds.length; triangleIndex++) {
                const textureId = textureIds[triangleIndex];
                const textureIndex = textureArray.indexOf(Registries.textures.get(textureId));
                const texturePosition = texturePositions[textureIndex];
                for (let vertexIndex = 0; vertexIndex < 3; vertexIndex++) {
                    const modelOffset = modelIndexes[0];
                    const offset = (triangleIndex * 3 + vertexIndex) * 2;
                    this.textureMappings[modelOffset * 2 + offset] = (textureMappings[offset] + texturePosition) / combinedSize.x;
                    this.textureMappings[modelOffset * 2 + offset + 1] = (textureMappings[offset + 1]) / combinedSize.y;
                }
            }
        }
        return this.createAssembledMesh();
    }
    createAssembledMesh() {
        return new AssembledMesh(this.vertexPositions, this.textureMappings, this.texture, this.modelIndexes);
    }
    getTextureArrayFromModelTextureIds(modelTextureIds) {
        let textures = new Set();
        for (const ids of modelTextureIds) {
            for (const id of ids) {
                const texture = Registries.textures.get(id);
                if (!texture)
                    throw new Error(`Texture with id ${id} not found in registry`);
                textures.add(texture);
            }
        }
        return Array.from(textures);
    }
    getCombinedTextureSize(textures) {
        let combinedWidth = 0;
        let combinedHeight = 0;
        for (const texture of textures) {
            combinedWidth += texture.getTextureWidth();
            combinedHeight = Math.max(combinedHeight, texture.getTextureHeight());
        }
        return new ImmutableVector2D(combinedWidth, combinedHeight);
    }
    renderCombinedTextures(size, textures) {
        if (textures.length == 0) {
            return {
                texturePositions: new Uint32Array(0),
                texture: Texture.fromDataArray(new Uint8ClampedArray(0), 0, 0)
            };
        }
        const canvas = new OffscreenCanvas(size.x, size.y);
        const context = canvas.getContext('2d');
        const texturePositions = new Uint32Array(textures.length);
        let xOffset = 0;
        let textureIndex = 0;
        for (const texture of textures) {
            context.putImageData(texture.toImageData(), xOffset, 0);
            texturePositions[textureIndex] = xOffset;
            xOffset += texture.getTextureWidth();
            textureIndex++;
        }
        const texture = Texture.fromImageData(context.getImageData(0, 0, size.x, size.y));
        return { texturePositions, texture };
    }
    static PRINT_OUTPUT = false;
}

class InstancedDataSegment {
    model;
    size;
    startIndex;
    constructor(model, size, startIndex = 0) {
        this.model = model;
        this.size = size;
        this.startIndex = startIndex;
    }
    getSize() {
        return this.size;
    }
    setSize(value) {
        this.size = value;
    }
    getModel() {
        return this.model;
    }
    setModel(model) {
        this.model = model;
    }
    getStartIndex() {
        return this.startIndex;
    }
    setStartIndex(index) {
        this.startIndex = index;
    }
}

class InstancedData {
    chunkData;
    segments;
    UPDATES = 0;
    constructor(chunkData) {
        this.chunkData = chunkData;
    }
    static cullDirections = [
        new Vector3(-1, 0, 0),
        new Vector3(1, 0, 0),
        new Vector3(0, -1, 0),
        new Vector3(0, 1, 0),
        new Vector3(0, 0, -1),
        new Vector3(0, 0, 1)
    ];
    canCull(position) {
        for (const direction of InstancedData.cullDirections) {
            const neighbor = position.clone().add(direction);
            if (ChunkDataReferencer.isOutOfBounds(neighbor)) {
                return false;
            }
            const block = this.chunkData.getBlock(new BlockPosition(neighbor, this.chunkData));
            const model = block.getBlockModel(new BlockPosition(neighbor, this.chunkData));
            if (model == null || model.isTransparent()) {
                return false;
            }
        }
        return true;
    }
    initial() {
        this.segments = [];
        let lastType = null;
        let lastSegment = null;
        for (let i = 0; i < ChunkDataReferencer.cells; i++) {
            const position = ChunkDataReferencer.position(i);
            const blockPrototype = this.chunkData.getBlock(position);
            const blockPosition = new BlockPosition(position, this.chunkData);
            const model = blockPrototype.getBlockModel(blockPosition);
            if (model == null || this.canCull(position)) {
                lastSegment = null;
                lastType = null;
                continue;
            }
            if (model != lastType) {
                lastSegment = new InstancedDataSegment(model, 1, i);
                this.segments.push(lastSegment);
                lastType = model;
            }
            else if (lastSegment && model == lastType) {
                lastSegment.setSize(lastSegment.getSize() + 1);
            }
        }
    }
    // Not very efficient right now
    update() {
        if (!this.segments)
            this.initial();
        this.UPDATES++;
        if (this.UPDATES > 1)
            return;
        this.segments = [];
        let lastType = null;
        let lastSegment = null;
        for (let i = 0; i < ChunkDataReferencer.cells; i++) {
            const position = ChunkDataReferencer.position(i);
            const blockPrototype = this.chunkData.getBlock(position);
            const blockPosition = new BlockPosition(position, this.chunkData);
            const model = blockPrototype.getBlockModel(blockPosition);
            if (model == null || this.canCull(position)) {
                lastSegment = null;
                lastType = null;
                continue;
            }
            if (model != lastType) {
                lastSegment = new InstancedDataSegment(model, 1, i);
                this.segments.push(lastSegment);
                lastType = model;
            }
            else if (lastSegment && model == lastType) {
                lastSegment.setSize(lastSegment.getSize() + 1);
            }
        }
    }
    verifyCalls() {
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            if (segment.getModel() == null) {
                console.log(this.segments);
                throw new Error(`Segment ${i} has a null model`);
            }
            if (segment.getSize() == 0) {
                throw new Error(`Segment ${i} has a size of 0`);
            }
            if (segment.getStartIndex() + segment.getSize() > ChunkDataReferencer.cells) {
                console.group("Instanced data verification");
                console.error(`Segment ${i} goes out of bounds`);
                console.log(`Start index: ${segment.getStartIndex()}`);
                console.log(`Size: ${segment.getSize()}`);
                console.log(`End index: ${segment.getStartIndex() + segment.getSize()}`);
                console.log(`Chunk size: ${ChunkDataReferencer.cells}`);
                console.groupEnd();
            }
            let blockPosition = new BlockPosition(ChunkDataReferencer.position(segment.getStartIndex()), this.chunkData);
            let actualModel = this.chunkData.getBlock(blockPosition).getBlockModel(blockPosition);
            if (actualModel != segment.getModel()) {
                console.group("Instanced data verification");
                console.error(`Segment ${i} has a different model than the actual block`);
                console.groupEnd();
                continue;
            }
            for (let j = 1; j < segment.getSize(); j++) {
                blockPosition = new BlockPosition(ChunkDataReferencer.position(segment.getStartIndex() + j), this.chunkData);
                actualModel = this.chunkData.getBlock(blockPosition).getBlockModel(blockPosition);
                if (actualModel != segment.getModel()) {
                    console.group("Instanced data verification");
                    console.error(`Segment ${i} has a different model than the actual block`);
                    console.log(`Block at ${blockPosition.getLocalPosition()} has model ${actualModel?.getRegisteredName()}`);
                    console.log(`Segment model is ${segment.getModel()?.getRegisteredName()}`);
                    console.groupEnd();
                    break;
                }
            }
        }
    }
    static VERIFY_CALLS = false;
    static LOG_CULLING = false;
}

class WebGPUInstancedData extends InstancedData {
    assembledMesh;
    indirectCalls;
    callCount;
    constructor(assembledMesh, chunkData) {
        super(chunkData);
        this.assembledMesh = assembledMesh;
        this.indirectCalls = new Uint32Array(ChunkDataReferencer.cells * 4);
    }
    update() {
        super.update();
        this.callCount = this.segments.length;
        for (let i = 0; i < this.indirectCalls.length / 4; i++) {
            let startIndex = i * 4;
            if (i >= this.segments.length) {
                this.indirectCalls[startIndex + 0] = 0;
                this.indirectCalls[i * 4 + 1] = 0;
                this.indirectCalls[i * 4 + 2] = 0;
                this.indirectCalls[i * 4 + 3] = 0;
                continue;
            }
            const segment = this.segments[i];
            const model = segment.getModel();
            if (!model)
                continue;
            const vertexStartIndex = this.assembledMesh.getModelStartIndex(model);
            const vertexEndIndex = this.assembledMesh.getModelEndIndex(model);
            const vertexCount = vertexEndIndex - vertexStartIndex;
            const instanceStartIndex = segment.getStartIndex();
            const instanceCount = segment.getSize();
            this.indirectCalls[startIndex] = vertexCount;
            this.indirectCalls[startIndex + 1] = instanceCount;
            this.indirectCalls[startIndex + 2] = vertexStartIndex;
            this.indirectCalls[startIndex + 3] = instanceStartIndex;
        }
    }
    getIndirectCalls() {
        return this.indirectCalls;
    }
    getCallCount() {
        return this.callCount;
    }
}

class WebGPUChunkMirror {
    position;
    worldMirror;
    instancedData;
    chunk;
    constructor(position, worldMirror) {
        this.position = position;
        this.worldMirror = worldMirror;
        this.chunk = this.worldMirror.getWorld().getChunk(this.position);
        this.instancedData = new WebGPUInstancedData(worldMirror.getTerrainMesh(), this.chunk.getChunkData());
    }
    getIndirectDrawCalls() {
        return this.instancedData.getIndirectCalls();
    }
    getIndirectCallCount() {
        return this.instancedData.getCallCount();
    }
    getPosition() {
        return this.position;
    }
    update() {
        this.instancedData.update();
    }
}

class WebGPUWorldMirror extends RenderWorldMirror {
    renderer;
    terrainMesh;
    terrainTexture;
    constructor(renderer) {
        super();
        this.renderer = renderer;
    }
    async setup(device) {
        const meshAssembler = new MeshAssembler(Registries.blockModels.values());
        this.terrainMesh = meshAssembler.assembleMeshes();
        this.terrainTexture = new WebGPUTexture(this.terrainMesh.getTexture());
        await this.terrainTexture.setup(device);
    }
    getWorld() {
        return this.renderer.getWorld();
    }
    getPerspective() {
        return this.renderer.getPerspective();
    }
    createRenderChunkMirror(position) {
        return new WebGPUChunkMirror(position, this);
    }
    updateRenderedWorld() {
        super.updateRenderedWorld();
        for (const chunk of this.getChunks()) {
            chunk.update();
        }
    }
    getTerrainMesh() {
        return this.terrainMesh;
    }
    getWorldRenderer() {
        return this.renderer;
    }
    getVisibleChunks() {
        return this.getChunks();
    }
}

class WebGPURenderer {
    renderer;
    device;
    world;
    renderedWorld;
    passes;
    bindGroupManager;
    multisampleTexture;
    depthTexture;
    camera;
    perspective;
    projector = new Projector(Math.PI / 180 * 75, 1, 0.1, 1000);
    constructor(renderer) {
        this.renderer = renderer;
        this.renderedWorld = new WebGPUWorldMirror(this);
        this.device = new GraphicsDevice(document.createElement('canvas'), this);
        this.bindGroupManager = new BindGroupManager();
        const terrainRenderPass = new TerrainRenderPass(this.renderedWorld);
        terrainRenderPass.setBindGroupManager(this.bindGroupManager);
        this.passes = [
            new ClearRenderPass(new Color(0, 0, 0, 1)),
            terrainRenderPass
        ];
    }
    getDepthTexture() {
        return this.depthTexture;
    }
    getMultisampleTexture() {
        return this.multisampleTexture;
    }
    getCanvas() {
        return this.device.getCanvas();
    }
    getRenderer() {
        return this.renderer;
    }
    setWorld(world) {
        if (this.world)
            throw new Error('Cannot set rendered world twice');
        this.world = world;
    }
    getWorld() {
        return this.world;
    }
    async setupWorldRenderer() {
        await this.device.setup();
        this.camera = new Camera();
        this.camera.setProjector(this.projector);
        await this.camera.setup(this.device);
        this.camera.update(this.device);
        this.bindGroupManager.addBindGroup(this.camera.getCameraBindGroup());
        this.depthTexture = new DepthTexture();
        await this.depthTexture.setup(this.device);
        this.multisampleTexture = new MultisampleTexture();
        await this.multisampleTexture.setup(this.device);
        await this.renderedWorld.setup(this.device);
        for (const pass of this.passes) {
            await pass.setupBindings(this.device);
        }
        await this.bindGroupManager.setup(this.device);
        for (const pass of this.passes) {
            await pass.setup(this.device);
        }
    }
    async render() {
        const canvas = this.device.getCanvas();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.projector.setAspectRatio(canvas.width / canvas.height);
        this.perspective.updatePerspective();
        this.camera.update(this.device);
        await this.depthTexture.resize(canvas.width, canvas.height);
        await this.multisampleTexture.resize(canvas.width, canvas.height);
        this.renderedWorld.updateRenderedWorld();
        for (const renderPass of this.passes) {
            await renderPass.render();
        }
    }
    getPerspective() {
        return this.perspective;
    }
    setPerspective(perspective) {
        this.perspective = perspective;
        this.camera.setPerspective(perspective);
    }
    getProjector() {
        return this.projector;
    }
    setProjector(projector) {
        this.projector = projector;
        this.camera.setProjector(projector);
    }
    getCamera() {
        return this.camera;
    }
    static async isSupported() {
        if (!navigator.gpu)
            return false;
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter)
            return false;
        return true;
    }
}

class Renderer {
    world;
    worldRenderer;
    constructor(world) {
        this.world = world;
    }
    getWorldRenderer() {
        if (!this.worldRenderer)
            throw new Error('No world renderer set');
        return this.worldRenderer;
    }
    getElement() {
        if (!this.worldRenderer)
            throw new Error('No world renderer set');
        return this.worldRenderer.getCanvas();
    }
    getWorld() {
        return this.world;
    }
    async setupRenderer() {
        if (await WebGPURenderer.isSupported()) {
            this.worldRenderer = new WebGPURenderer(this);
        }
        else {
            throw new Error("No supported world renderer found");
        }
        this.worldRenderer.setWorld(this.world);
        await this.worldRenderer.setupWorldRenderer();
    }
    async render() {
        if (!this.worldRenderer)
            throw new Error('No world renderer set');
        await this.worldRenderer.render();
    }
}

class EntityPerspective {
    entity;
    matrix;
    constructor(entity) {
        this.entity = entity;
    }
    getChunkLocation() {
        if (!this.entity.getParentChunk()) {
            throw new Error("Cannot get chunk location of unbound entity");
        }
        return this.entity.getParentChunk().getPosition();
    }
    getTransformationMatrix() {
        return this.matrix;
    }
    getRenderDistance() {
        return 10;
    }
    updatePerspective() {
        this.matrix = this.computeTransformationMatrix();
    }
    computeTransformationMatrix() {
        let matrix = new Matrix4();
        matrix.multiply(Matrix4.createTranslation(this.entity.getPosition()));
        matrix.multiply(Matrix4.createRotation(this.entity.getRotation()));
        return matrix;
    }
}

class EntityFlyControls {
    entity;
    constructor(entity) {
        this.entity = entity;
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('click', () => {
            if (!this.pointerLocked) {
                document.body.requestPointerLock();
            }
        });
    }
    keys = new Set();
    pointerLocked = false;
    speed = 2;
    lastPressedForwardKey = null;
    lastPressedSideKey = null;
    lastPressedUpKey = null;
    onKeyDown(event) {
        this.keys.add(event.code);
        if (event.code === 'KeyW' || event.code === 'KeyS') {
            this.lastPressedForwardKey = event.code;
        }
        if (event.code === 'KeyA' || event.code === 'KeyD') {
            this.lastPressedSideKey = event.code;
        }
        if (event.code === 'Space' || event.code === 'ShiftLeft') {
            this.lastPressedUpKey = event.code;
        }
    }
    onKeyUp(event) {
        this.keys.delete(event.code);
        if (event.code === this.lastPressedForwardKey) {
            this.lastPressedForwardKey = null;
        }
        if (event.code === this.lastPressedSideKey) {
            this.lastPressedSideKey = null;
        }
        if (event.code === this.lastPressedUpKey) {
            this.lastPressedUpKey = null;
        }
    }
    onPointerLockChange() {
        this.pointerLocked = document.pointerLockElement === document.body;
    }
    onMouseMove(event) {
        if (this.pointerLocked) {
            const rotation = this.entity.getRotation();
            rotation.yaw += -event.movementX * 0.01;
            rotation.pitch += -event.movementY * 0.01;
        }
    }
    move(direction) {
        const physicalState = this.entity.getPhysicalState();
        if (!physicalState)
            return;
        const rotation = this.entity.getRotation();
        const forward = new ImmutableVector2D(-Math.sin(rotation.yaw), -Math.cos(rotation.yaw));
        const right = new ImmutableVector2D(-forward.y, forward.x);
        forward.scalarMultiply(5);
        right.scalarMultiply(3);
        physicalState.applyForce(new Vector3(forward.x * direction.y + right.x * direction.x, 0, forward.y * direction.y + right.y * direction.x).times(this.speed));
    }
    fly(direction) {
        const physicalState = this.entity.getPhysicalState();
        if (!physicalState)
            return;
        physicalState.applyForce(new Vector3(0, direction * this.speed, 0));
    }
    update() {
        if (this.lastPressedForwardKey == 'KeyW' || (!this.lastPressedForwardKey && this.keys.has('KeyW'))) {
            this.move(new ImmutableVector2D(0, 1));
        }
        if (this.lastPressedForwardKey == 'KeyS' || (!this.lastPressedForwardKey && this.keys.has('KeyS'))) {
            this.move(new ImmutableVector2D(0, -1));
        }
        if (this.lastPressedSideKey == 'KeyA' || (!this.lastPressedSideKey && this.keys.has('KeyA'))) {
            this.move(new ImmutableVector2D(-1, 0));
        }
        if (this.lastPressedSideKey == 'KeyD' || (!this.lastPressedSideKey && this.keys.has('KeyD'))) {
            this.move(new ImmutableVector2D(1, 0));
        }
        if (this.lastPressedUpKey == 'Space' || (!this.lastPressedUpKey && this.keys.has('Space'))) {
            this.fly(1);
        }
        if (this.lastPressedUpKey == 'ShiftLeft' || (!this.lastPressedUpKey && this.keys.has('ShiftLeft'))) {
            this.fly(-1);
        }
    }
}

class SingleplayerWorldLoader {
    worldGenerator;
    constructor(worldGenerator) {
        this.worldGenerator = worldGenerator;
    }
    bindWorld(world) {
        this.worldGenerator.bindWorld(world);
    }
}

class Client extends Game {
    renderer;
    worldGenerator;
    worldLoader;
    clockViewer;
    constructor() {
        super();
        this.worldGenerator = new SimpleWorldGenerator();
        this.worldLoader = new SingleplayerWorldLoader(this.worldGenerator);
        this.getWorld().setWorldLoader(this.worldLoader);
        this.clockViewer = new EventClockViewer(this.getClock());
        this.renderer = new Renderer(this.getWorld());
    }
    getRenderer() {
        return this.renderer;
    }
    getRuntimeType() {
        return GameRuntimeType.Singleplayer;
    }
    async start() {
        await super.start();
        await this.renderer.setupRenderer();
        const world = this.getWorld();
        const playerPrototype = Registries.entities.get('player');
        const playerEntity = playerPrototype.createEntity();
        world.addEntity(playerEntity);
        playerEntity.getPosition().set(8, ChunkDataReferencer.dimensions.y, 8);
        const playerPerspective = new EntityPerspective(playerEntity);
        this.getRenderer().getWorldRenderer().setPerspective(playerPerspective);
        const controls = new EntityFlyControls(playerEntity);
        this.getClock().schedule("controls", () => controls.update());
        for (let x = -4; x <= 4; x++) {
            for (let z = -4; z <= 4; z++) {
                world.loadChunk(x, z);
            }
        }
        const clock = this.getClock();
        clock.schedule("tickWorld", async () => await this.getWorld().tick(clock.getDelta()));
        clock.schedule("render", async () => await this.renderer.render());
        clock.schedule("displayClockInfo", () => this.clockViewer.update());
        clock.schedule("generateChunks", async () => await this.worldGenerator.generateChunks(1));
        clock.start();
    }
}

const client = new Client();
await client.start();
document.body.appendChild(client.getRenderer().getElement());
window['client'] = client;
//# sourceMappingURL=client.js.map
