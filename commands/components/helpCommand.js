export const helpCommand = async (interaction) => {
  const embedMessage = {
    title: "Friends finance - Help",
    description: "Basic guide on how to use the main commands",
    color: "15844367",
    fields: [
      {
        name: "/newdebt",
        value:
          " Use this command to create a new debt. Provide the username of a friend that owes you money. Provide an amount and a concept and that's all you have successfully created a debt.",
      },
      {
        name: "/debt",
        value:
          "Use this command to view the details of a determined debt. Just provide the debt ID that you can obtain when you view the user's details of someone by using /user details. Or just get it when you create the debt.",
      },
      {
        name: "/userdetails",
        value:
          "Use this command to view the pending debts from the user to other people and the pending debts from other users to this user. Just provide a username and you will get the details.",
      },
    ],
  };

  await interaction.reply({
    content:
      "If you want to fill or delete a debt you need to access it by using the /debt command. Note that you need to be the creditor of that debt in order to delete it.",
    embeds: [embedMessage],
  });
};
