import { Command } from "../interfaces/command";
import { oneHundred } from "./oneHundred";
import { edit } from "./edit";
import { viewStats } from "./view";
import { help } from "./help";

export const CommandList: Command[] = [oneHundred, edit, viewStats, help];
