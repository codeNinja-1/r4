import { ObjectDataType } from "@cubecraft/data/types/object-data-type.js";
import { SocketInterface } from "@cubecraft/net/socket-interface.js";
import { Identifier } from "@cubecraft/platform/identifier.js";
import { SocketMessage } from "@cubecraft/net/socket-message.js";
import { Rotation } from "@cubecraft/utils/rotation.js";
import { Vector3D } from "@cubecraft/utils/vector3d/vector3d.js";
import { Vector3DDataType } from "@cubecraft/utils/vector3d/vector3d-data-type.js";
import { ImmutableVector3D } from "@cubecraft/utils/vector3d/immutable-vector3d.js";
import { RotationDataType } from "@cubecraft/utils/rotation-data-type.js";

export class PlayerInteractionInterface {
    static PlayerMoveEvent = new SocketMessage(
        new Identifier('cubular', 'player_move'),
        new ObjectDataType({
            location: new Vector3DDataType('f64', ImmutableVector3D),
            rotation: new RotationDataType()
        })
    );
    
    static PlayerPlaceBlockEvent = new SocketMessage(
        new Identifier('cubular', 'player_place_block'),
        new Vector3DDataType('i32', ImmutableVector3D)
    );

    _socket: SocketInterface;

    constructor(socket: SocketInterface) {
        this._socket = socket;
    }

    // cubular:player_move
    // client -> server
    movePlayer(location: Vector3D, rotation: Rotation) {
        this._socket.emit(PlayerInteractionInterface.PlayerMoveEvent.toString(), { location, rotation });
    }

    // cubular:place_place_block
    // client -> server
    placeBlock(location: Vector3D) {
        this._socket.emit(PlayerInteractionInterface.PlayerPlaceBlockEvent.toString(), location);
    }
}