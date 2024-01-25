import { DataTranscoder } from "../src/net/data/data-transcoder.js";
import { ListDataType } from "../src/net/data/types/list-data-type.js";
import { NumberDataType } from "../src/net/data/types/number-data-type.js";
import { ObjectDataType } from "../src/net/data/types/object-data-type.js";
import { StringDataType } from "../src/net/data/types/string-data-type.js";

function test({ name, sample, type, check = (a, b) => a == b, count = 1 }) {
    const transcoder = new DataTranscoder(type);
    for (let i = 0; i < count; i++) {
        const source = sample(i);
        const raw = transcoder.encode(source);
        const decoded = transcoder.decode(raw);

        if (!check(source, decoded)) {
            console.log("Test failed: " + name);
            console.log(source);
            console.log(raw);
            console.log(decoded);
        }
    }
}

test({
    name: "string",
    sample: () => "Hello, World!",
    type: new StringDataType()
});

test({
    name: "numbers/u8",
    sample: i => i,
    type: new NumberDataType("u8"),
    count: 256
});

test({
    name: "numbers/u16",
    sample: i => i * Math.floor(Math.random() * 256),
    type: new NumberDataType("u16"),
    count: 256
});

test({
    name: "numbers/u32",
    sample: i => i * Math.floor(Math.random() * 256 * 256),
    type: new NumberDataType("u32"),
    count: 256
});

test({
    name: "numbers/i8",
    sample: i => i - 128,
    type: new NumberDataType("i8"),
    count: 256
});

test({
    name: "numbers/i16",
    sample: i => i * Math.floor(Math.random() * 256) - 32768,
    type: new NumberDataType("i16"),
    count: 256
});

test({
    name: "numbers/i32",
    sample: i => i * Math.floor(Math.random() * 65536) - 2147483648,
    type: new NumberDataType("i32"),
    count: 256
});

test({
    name: "numbers/f32",
    sample: i => i * Math.round(Math.random() * 256) / 256 * 256 - 128,
    type: new NumberDataType("f32"),
    count: 256
});

test({
    name: "numbers/f64",
    sample: i => i * Math.random() * 256 - 128,
    type: new NumberDataType("f64"),
    count: 256
});

test({
    name: "list/fixed",
    sample: () => [ 1, 2, 3 ],
    type: new ListDataType(ListDataType.Array, new NumberDataType("u8"), 3),
    check: (a, b) => Array.isArray(a) ? (a.length == b.length && a.every((v, i) => v == b[i])) : (a.size == b.size && Array.from(a).every(v => b.has(v)) && Array.from(b).every(v => a.has(v))),
    count: 1
});

test({
    name: "list/unfixed",
    sample: i => new Array(i + 8).fill(2),
    type: new ListDataType(ListDataType.Array, new NumberDataType("u8"), "u16"),
    check: (a, b) => Array.isArray(a) ? (a.length == b.length && a.every((v, i) => v == b[i])) : (a.size == b.size && Array.from(a).every(v => b.has(v)) && Array.from(b).every(v => a.has(v))),
    count: 256
});

test({
    name: "list/set",
    sample: i => {
        const data = new Set();

        for (let j = 0; j < i + 8; j++) {
            data.add(j);
        }

        return data;
    },
    type: new ListDataType(ListDataType.Set, new NumberDataType("f64"), "u16"),
    check: (a, b) => Array.isArray(a) ? (a.length == b.length && a.every((v, i) => v == b[i])) : (a.size == b.size && Array.from(a).every(v => b.has(v)) && Array.from(b).every(v => a.has(v))),
    count: 256
});

test({
    name: "object",
    sample: () => {
        return {
            "id": [ 3490, 23409, 2309, 219, 3490, 23409, 2309, 219 ],
            "position": { "x": 24.6, "y": 89.7, "z": 66.4 },
            "name": "Bob The Snow Zombie",
            "health": 20,
            "inventory": [
                {
                    "id": "cubecraft-items:sword",
                    "count": 1
                }
            ],
            "effects": new Set([
                {
                    "type": "cubecraft:burning",
                    "time": 4390
                }
            ])
        }
    },
    type: new ObjectDataType({
        id: new ListDataType(ListDataType.Array, new NumberDataType("u32"), 8),
        position: new ObjectDataType({
            x: new NumberDataType("f64"),
            y: new NumberDataType("f64"),
            z: new NumberDataType("f64")
        }),
        name: new StringDataType(),
        health: new NumberDataType("u32"),
        inventory: new ListDataType(ListDataType.Array, new ObjectDataType({
            id: new StringDataType(),
            count: new NumberDataType("u16")
        }), "u16"),
        effects: new ListDataType(ListDataType.Set, new ObjectDataType({
            type: new StringDataType(),
            time: new NumberDataType("u32")
        }), "u16")
    }),
    check: (a, b) => {
        console.log("Input\n", a);
        console.log("Output\n", b);

        return true;
    }
});