import { commands } from "./commands/index.js";
import { createClient } from "./functions/initBot.js";
import { initCommands } from "./functions/initCommands.js";
import { mongoDbCon } from "./functions/mongoCon.js";
import { success } from "./utils/logger.js";

await initCommands();
const client = createClient();

client.on("ready", async () => {
  success("Bot is ready");
  await mongoDbCon();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.find((c) => c.name == interaction.commandName);
  await command.action(interaction);
});

client.login(process.env.BOT_TOKEN);
