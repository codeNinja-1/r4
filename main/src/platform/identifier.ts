// export class Identifier {
//     constructor(namespace: string, name: string) {
//         return namespace + ':' + name;
//     }

//     static namespace(id: string): string {
//         return id.slice(0, id.indexOf(':'));
//     }

//     static name(id: string): string {
//         return id.slice(id.indexOf(':') + 1);
//     }

//     static validate(id: string): boolean {
//         let foundColon = false;

//         for (let index = 0; index < id.length; index++) {
//             if (id[index] == ':') {
//                 if (foundColon) return false;

//                 foundColon = true;
//             } else if (!'abcdefghijklmnopqrstuvwxyz0123456789_'.includes(id[index])) {
//                 return false;
//             }
//         }

//         return foundColon;
//     }
// };