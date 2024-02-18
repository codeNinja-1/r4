import { NetworkChannel } from "./network-channel.js";

export class NetworkConnection {
    private realTime: NetworkChannel;
    private bulk: NetworkChannel;

    constructor() {
    }

    getChannel(type: NetworkChannel.Type): NetworkChannel {
        if (type == NetworkChannel.Type.RealTime) return this.realTime;
        else if (type == NetworkChannel.Type.Bulk) return this.bulk;
        else throw new Error("Invalid channel type");
    }
}