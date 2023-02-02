import { userModel } from "../../models/userModel.js";

export const checkUserDetails = async (interaction) => {
  const targetId = interaction.options.get("user").user.id;

  const user = await userModel
    .findOne({ userId: targetId })
    .populate("debts")
    .populate("oweMe");

  if (!user) {
    const errorEmbed = {
      title: `The provided (<@${targetId}>) user does not exist or has never registered a debt`,
      color: "15548997",
    };

    interaction.reply({ embeds: [errorEmbed] });
    return;
  }

  const debts = user.debts
    .filter((d) => !d.deleted && !d.filled)
    .map((d) => {
      return {
        name: "ID: " + d.debtId,
        value: `Amount: ***${d.amount}*** | Creditor: <@${d.to}> | Concept: ${
          d.concept
        } | Date: ${new Date(d.date).toLocaleString()}`,
      };
    });

  const oweMe = user.oweMe
    .filter((d) => !d.deleted && !d.filled)
    .map((d) => {
      return {
        name: "ID: " + d.debtId,
        value: `Amount: ***${d.amount}*** | Debtor: <@${d.from}> | Concept: ${
          d.concept
        } | Date: ${new Date(d.date).toLocaleString()}`,
      };
    });

  const userDebtsResponse = {
    title: `Debts from ${user.username}`,
    color: "15105570",
    description: "This are the debts from this user",
    fields: [...debts],
  };

  const userOweMeResponse = {
    title: `Owe me from ${user.username}`,
    color: "5763719",
    description: "This are the owe me from this user",
    fields: [...oweMe],
  };

  const noDebts = {
    title: "This user doesn't owe money to nobody",
    color: "5763719",
  };

  const noOweMe = {
    title: "Nobody owes money to this user!",
    color: "5763719",
  };

  interaction.reply({
    embeds: [
      debts[0] ? userDebtsResponse : noDebts,
      oweMe[0] ? userOweMeResponse : noOweMe,
    ],
  });
};
