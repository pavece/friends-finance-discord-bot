import { REST, Routes } from "discord.js";
import { commands } from "../commands/index.js";

import * as dotenv from "dotenv";
dotenv.config();

export const initCommands = async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

  try {
    await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
      body: commands,
    });
  } catch (e) {
    console.log(e);
  }
};
