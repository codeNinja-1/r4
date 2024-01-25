import path from 'path';
import { Vector2D } from '../../utils/vector2d/vector2d.js';

export namespace WorldPaths {
    export function getOptionsFile(worldPath: string) {
        return path.join(worldPath, 'options.cc.dat');
    }

    export function getAdditionalFile(worldPath: string, name: string) {
        return path.join(worldPath, name + '_additional.cc.dat');
    }
    
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