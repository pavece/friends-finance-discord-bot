import { createOweMe } from "./components/createOweMe.js";

export const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
    action: (interaction) => {
      interaction.reply("Pong");
    },
  },
  //command to generate a new debt
  {
    name: "newdebt",
    description: "Create a new debt",
    options: [
      {
        name: "friend",
        description: "The friend that owes you money",
        type: 6,
        required: true,
      },
      {
        name: "amount",
        description: "The amount he/she owes you",
        type: 10,
        required: true,
      },
      {
        name: "concept",
        description: "The reason why he/she owes you that money",
        type: 3,
        required: true,
      },
    ],
    action: await createOweMe,
  },
];
