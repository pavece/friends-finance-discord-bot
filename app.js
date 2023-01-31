import { commands } from "./commands/index.js";
import { createClient } from "./functions/initBot.js";
import { initCommands } from "./functions/initCommands.js";

import { success } from "./utils/logger.js";

await initCommands();
const client = createClient();

client.on("ready", () => {
  success("Bot is ready");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.find((c) => c.name == interaction.commandName);
  await command.action(interaction);
});

client.login(process.env.BOT_TOKEN);
