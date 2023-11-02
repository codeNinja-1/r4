import { Packager } from "./packager.js";
import process from "node:process";

const packager = new Packager(process.cwd(), process.cwd() + "/packager/dist");

packager.bundle();