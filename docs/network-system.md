# Network System

This describes how clients interface with a server and keep an identical copy of a subsection of the world.

## Connection Sequence
### Protocol Check
First, the client tries to check if the server is using the same engine version and packages by sending a `GET` request to the server url with the following query parameters:

 * `action` set to `check` to indicate that the client is attempting to see if it can connect.
 * `protocol` set to the protocol information of the client.

#### Protocol Information
Protocol information is stored in the following json-based format. There can be additional properties, but they are not used by the engine.

```json
{
    "engine": "3.2.8",
    "packages": {
        "dimension-moon": "8.4.3",
        "dimension-earth": "1.314.40"
    }
}
```

Each of these uses a form of *semantic versioning*: `major.minor.patch`. By default, the version checking system uses this method. Versions can also be `*`, meaning that it will try to continue connecting, no matter the version.

Component | Behavior
--------- | --------
`major` | Different major versions are considered incompatible.
`minor` | Different minor versions are considered forwards compatible.
`patch` | All patches with the same minor version are considered compatible.

### Login Sequence
Each client has a public and private RSA key, which it uses to authenticate itself without an account server.

 * The encryption key is public
 * The decryption key is private

After the encrypted connection is made, the client responds with a `LoginRequest` token, giving the server the public key that identifies it and a nickname.

```ts
interface LoginRequest {
    key: RSA_PUBLIC_KEY;
    nickname: string;
}
```

The server then encrypts some data with the public key and sends it to the client in a `LoginCheck`. The first 32 bytes will be the AES key used later on. It also sends along the *initialization vector*.

```ts
interface LoginCheck {
    encrypted: ArrayBuffer; // 214 bytes
    iv: ArrayBuffer; // 16 bytes
}
```

Then, the client sends a `LoginAuthenticate` packet to the server with the data decoded by it's private key. This packet will be encrypted using the AES key specified by the first 32 bytes of the encoded data.

```ts
interface LoginAuthenticate {
    decrypted: ArrayBuffer; // 214 bytes
}
```

The server can then tell if the client has access to the associated private key by confirming if the data decoded by the client is the original data. The server sends an unencrypted `LoginResult` packet to explain if the login succeeded. All other packets will be encrypted from now on.

```ts
interface LoginResult {
    success: boolean;
}
```

This approach allows there to be no account servers initially, making it easier to set up securely. The main flaw is that you cannot change your login keys or store them on an official server. Here are a few options for adding usernames and passwords incrementally.

#### Username-Only Account Server

In the future, an account server may be added, where the client can also register it's public key in the account server under a username which is shown to other players.

The server will request the account server for the public key belonging to the player's username. Once this system is established, a player can change their login keys whenever they want.

This approach allows users to securely access their players on servers without needing an account server to store their sensitive information.

##### Extended Protocol

The client sends a `username` in the `LoginRequest`, instead of an unofficial and unverified `nickname`. If a `username` is present and a `nickname` is not, the server will use the `username`, for compatability.

```ts
interface LoginRequest {
    key: RSA_PUBLIC_KEY;
    username: string;
}
```

After receiving this, the server checks with the account server to see if the username matches the public key the client sent.

#### Encryption on the Account Server

If a more complete approach is needed, the account server may also get functionality to store the private keys. Players could then disable *on-device logins* and have the account server remotely encrypt the hash.

##### Compatability Details
Instead of storing the login keys on device, the client can make a few requests to the account server to use it. This does not change the server side at all, so a user with this enabled can connect to servers without problems.

Because of the open-endedness of this system, a user could also use a seperate account server to store their login keys. In fact, this could be implemented without a **Username-Only Account Server** by a third party.

### Load Area

After the client has authorized themself, the server sends a `LoadArea` event, along with the player's location.

```ts
interface LoadArea {
    location: Location;
}
```

The client can then send `LoadChunk` packets until the area it will join in is loaded.

Finally, the client sends a `JoinRequest` packet, requesting the server to send the player data.

```ts
interface JoinRequest {
}
```

### Join World

The `JoinWorld` packet contains all the data a joining client needs to no about a world.

```ts
interface JoinWorld {
    clock: GameClock;
    player: Player;
}
```

After the player receives this, they begin rendering the world and can play the game.

## Localized Events

### `EntityAdd`

When an entity is added to the world, an `EntityAdd` event is broadcasted to all clients with the chunk loaded.

```ts
interface EntityAdd {
    entity: Entity;
}
```

### `EntityRemove`

When an entity is removed from the world, an `EntityRemove` event is broadcasted to all clients with the chunk loaded.