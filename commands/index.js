export const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
    action: (interaction) => {
      interaction.reply("Pong");
    },
  },
];
