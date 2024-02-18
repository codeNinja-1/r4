import { Client } from "./client.js";

const client = new Client();

await client.start();

document.body.appendChild(client.getRenderer().getElement());

client.start();