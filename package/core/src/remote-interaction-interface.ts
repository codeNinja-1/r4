import { PlayerInteractionInterface } from "./player-interaction-interface.js";
import { SocketInterface } from "@cubecraft/net/socket-interface.js";
import { SocketMessageInterface } from "@cubecraft/net/socket-message-interface.js";
import { PlayerMoveEvent } from "./event/player-move-event.js";
import { PlayerPlaceBlockEvent } from "./event/player-place-block-event.js";

export class RemoteInteractionInterface implements SocketMessageInterface {
    socket: SocketInterface;
    _moveListeners: Set<(event: PlayerMoveEvent) => void>;
    _placeBlockListeners: Set<(event: PlayerPlaceBlockEvent) => void>;

    constructor() {
        this._moveListeners = new Set();
        this._placeBlockListeners = new Set();
    }

    *interfaceMessages() {
        yield PlayerInteractionInterface.PlayerMoveEvent;
        yield PlayerInteractionInterface.PlayerPlaceBlockEvent;
    }

    bindSocket(socket: SocketInterface) {
        this.socket = socket;

        socket.on(PlayerInteractionInterface.PlayerMoveEvent.toString(), (event: PlayerMoveEvent) => {
            for (const listener of this._moveListeners) {
                listener(event);
            }
        });

        socket.on(PlayerInteractionInterface.PlayerPlaceBlockEvent.toString(), (event: PlayerPlaceBlockEvent) => {
            for (const listener of this._placeBlockListeners) {
                listener(event);
            }
        });
    }

    // cubular:player_move
    // client -> server
    onPlayerMove(listener: (event: PlayerMoveEvent) => void) {
        this._moveListeners.add(listener);
    }

    // cubular:player_place_block
    // client -> server
    onPlayerPlaceBlock(listener: (event: PlayerPlaceBlockEvent) => void) {
        this._placeBlockListeners.add(listener);
    }
}