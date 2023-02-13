import { client } from "../../app.js";
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
      return `DEBT-> ID: **${d.debtId}** | Amount: **${
        d.amount + process.env.CURRENCY
      }** | Creditor: <@${d.to}> | Concept: **${d.concept}** | Date: ${new Date(
        d.date
      ).toLocaleString()}`;
    });

  const oweMe = user.oweMe
    .filter((d) => !d.deleted && !d.filled)
    .map((d) => {
      return `DEBT-> ID: **${d.debtId}** | Amount: **${
        d.amount + process.env.CURRENCY
      }** | Creditor: <@${d.to}> | Concept: **${d.concept}** | Date: ${new Date(
        d.date
      ).toLocaleString()}`;
    });

  const userDebtsResponse = {
    title: `Debts from ${user.username}`,
    color: "15105570",
    description:
      "This are the debts from this user: \n\n" +
      [debts.join("\n------------------------\n")],
  };

  const userOweMeResponse = {
    title: `Owe me from ${user.username}`,
    color: "5763719",
    description:
      "This are the Owe Me from this user: \n\n" +
      [debts.join("\n------------------------\n")],
  };

  const noDebts = {
    title: "This user doesn't owe money to nobody",
    color: "5763719",
  };

  const noOweMe = {
    title: "Nobody owes money to this user!",
    color: "5763719",
  };

  await interaction.reply({
    content: `These are the debts and oweMe's from ${user.username}. Remember that if this user owes you money you can access the specific debt with the command ***/debt ID*** in order to fill the debt or to delete it.`,
    embeds: [
      debts[0] ? userDebtsResponse : noDebts,
      oweMe[0] ? userOweMeResponse : noOweMe,
    ],
    fetchReply: true,
    ephemeral: true,
  });
};
