export namespace NumberTypeUtils {
    export function getSize(type: string): number {
        if (type == 'i8') return 1;
        else if (type == 'i16') return 2;
        else if (type == 'i32') return 4;
        else if (type == 'i64') return 8;
        else if (type == 'u8') return 1;
        else if (type == 'u16') return 2;
        else if (type == 'u32') return 4;
        else if (type == 'u64') return 8;
        else if (type == 'f32') return 4;
        else if (type == 'f64') return 8;
        else return 0;
    }
}