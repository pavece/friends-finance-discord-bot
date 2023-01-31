import { userModel } from "../models/userModel.js";

export const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
    action: (interaction) => {
      interaction.reply("Pong");
    },
  },
  {
    name: "testdatabase",
    description: "A database testing command",
    action: async (interaction) => {
      if (
        interaction.member
          .permissionsIn(interaction.channel)
          .has("ADMINISTRATOR")
      ) {
        interaction.reply("The user is admin");
        const newUser = new userModel({
          username: interaction.user.username,
          id: interaction.user.id,
        });
        await newUser.save();
      }
      interaction.reply("The user is not admin");
    },
  },
];
