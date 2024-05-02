export namespace LogUtils {
    export function printIndirectCalls(label: string, data: Uint32Array, calls: number = data.byteLength / 16) {
        const table = createTable();

        table.add("CALL", "INDEX", "VERTS", "INSTS");

        for (let call = 0; call < calls; call++) {
            let i = call * 4;

            table.add(call, call * 4, data[i + 2] + "-" + (data[i + 2] + data[i + 0]), data[i + 3] + "-" + (data[i + 3] + data[i + 1]));
        }

        console.groupCollapsed(label);
        console.log(`${calls * 16} / ${data.byteLength} bytes`);
        console.log(`${calls} / ${data.byteLength / 16} indirect calls`);
        table.print();
        console.groupCollapsed("Traceback");
        console.trace();
        console.groupEnd();
        console.groupEnd();
    }

    export function padCenter(string: string, size: number): string {
        const pad = size - string.length;

        if (pad <= 0) {
            return string;
        }

        const left = Math.floor(pad / 2);
        const right = Math.ceil(pad / 2);

        return " ".repeat(left) + string + " ".repeat(right);
    }

    export function createTable(): { add: (...data: { toString(): string }[]) => void, print(): void } {
        let table: string[][] = [];

        return {
            add: (...data: { toString(): string }[]) => table.push(data.map(item => item.toString())),
            print: () => {
                let columnWidths = table[0].map(() => 0);

                for (let row of table) {
                    for (let i = 0; i < row.length; i++) {
                        columnWidths[i] = Math.max(columnWidths[i], row[i].length || 0);
                    }
                }

                let output: string[] = [];

                for (let row of table) {
                    output.push(row.map((item, i) => padCenter(item, columnWidths[i])).join(" "));
                }

                console.log(output.join("\n"));
            }
        };
    }

    export function stopExecution() {
        throw "Execution stopped by LogUtils.stopExecution()";
    }
}