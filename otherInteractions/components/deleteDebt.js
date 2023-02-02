import { debtModel } from "../../models/debtModel.js";

export const deleteDebt = async (interaction) => {
  const debtId = interaction.customId.split("_")[1];

  const sucEmbed = {
    title: "The debt has been deleted",
    color: "5763719",
    timestamp: new Date().toISOString(),
  };
  const errorEmbed = {
    title: "There was an error deleting the debt, does this debt exist ?",
    color: "15548997",
  };

  const unauthorizedEmbed = {
    title:
      "Only admins and the creditor can fill and delete debts. If you are the debtor and want to delete the order you need to contact with the creditor or ask an administrator to delete the debt",
    color: "15548997",
  };

  const debt = await debtModel.findOne({ _id: debtId });

  if (
    debt.to === interaction.user.id ||
    interaction.member.permissions.has("ADMINISTRATOR")
  ) {
    if (debt && debt.deleted === false && debt.filled === false) {
      try {
        //we change a prop instead of deleting from the DB so we can keep track of this debt later
        await debtModel.findOneAndUpdate({ _id: debtId }, { deleted: true });

        interaction.reply({ embeds: [sucEmbed] });
      } catch (e) {
        console.log(e);
        interaction.reply({ embeds: [errorEmbed] });
      }
    } else {
      interaction.reply({ embeds: [errorEmbed] });
    }
  } else {
    interaction.reply({ embeds: [unauthorizedEmbed] });
    return;
  }
};
