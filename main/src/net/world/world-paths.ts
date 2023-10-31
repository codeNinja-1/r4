import path from 'path';
import { Vector2D } from '../../utils/vector2d/vector2d.js';

export namespace WorldPaths {
    export function getOptionsFile(worldPath: string) {
        return path.join(worldPath, 'options.cc.dat');
    }

    export function getAdditionalFile(worldPath: string, name: string) {
        return path.join(worldPath, name + '_additional.cc.dat');
    }

    `
    options.json
    options.cc.dat
    regions/
        00000000000000000000000000000000.cc.dat
    players/
        Player123.cc.dat

    DATA HOOKS:
    'world': stored in options file
    'region': stored in region file
    'chunk': stored in region file with chunk data
    'player': stored in player file
    CUBECRAFT COMMANDS:
    'open <world>': run server for a world
    'in <world> inspect player <playername>': view a player file
    'in <world> inspect region <regionname>': view a region file (just the header)
    'in <world> inspect chunk <chunkname>': view a chunk file
    'in <world> inspect world': view a world file
    `

    export function getRegionFile(worldPath: string, regionLocation: Vector2D) {
        return path.join(worldPath, 'regions', `${regionLocation.x.toString(16).padStart(16, '0') + regionLocation.y.toString(16).padStart(16, '0')}.cc.dat`);
    }

    export function getPlayerFile(worldPath: string, playerId: string) {
        return path.join(worldPath, 'players', `${playerId}.cc.dat`);
    }
    
    export function *getRequiredDirectories() {
        yield 'regions';
        yield 'players';
    }
}