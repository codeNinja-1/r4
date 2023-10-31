import { JoinScreen } from "../view/join-screen/join-screen.js";
import { Client } from "./client.js";

const joinScreen = new JoinScreen();

document.body.appendChild(joinScreen.element);

const nickname = await joinScreen.whenJoined();

document.body.removeChild(joinScreen.element);

const client = new Client();

document.body.appendChild(client.element);

client.init();
client.join(nickname);