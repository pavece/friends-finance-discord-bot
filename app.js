import { commands } from "./commands/index.js";
import { otherInteractions } from "./otherInteractions/index.js";
import { createClient } from "./functions/initBot.js";
import { initCommands } from "./functions/initCommands.js";
import { mongoDbCon } from "./functions/mongoCon.js";
import { success } from "./utils/logger.js";
import { rememberDebt } from "./tasks/rememberDebts.js";
import { config } from "./config.js";
import { ActivityType } from "discord.js";

await initCommands();
export const client = createClient();

client.on("ready", async () => {
  success("Bot is ready");
  client.user.setActivity(config.botStatusMessage, ActivityType.Watching);
  client.user.setAvatar(config.botProfilePicture);
  await mongoDbCon();
  rememberDebt.start();
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = commands.find((c) => c.name == interaction.commandName);
    await command.action(interaction);
  }
  if (interaction.isButton()) {
    const buttonInteraction = otherInteractions.find(
      (i) => i.interactionStarter === interaction.customId.split("_")[0]
    );
    await buttonInteraction.action(interaction);
  }
});

client.login(process.env.BOT_TOKEN);
