import { debtModel } from "../../models/debtModel.js";

export const getDebt = async (interaction) => {
  const debtId = interaction.options.get("id").value;

  const debt = await debtModel.findOne({ debtId });

  const errorMessage = {
    color: 15548997,
    title: "Debt not found",
    description: `The debt with the id: ***${debtId}*** could not be found. Make sure you typed the correct ID. Maybe the debt has been deleted is no longer accesible`,
  };

  if (!debt) {
    return interaction.reply({ embeds: [errorMessage] });
  }

  const debtMessage = {
    color: 15844367,
    title: `Debt (ID: ${debt.debtId})`,
    thumbnail: {
      url: process.env.DEBT_DETAILS_PICTURE,
    },
    fields: [
      {
        name: "Amount",
        value: debt.amount + process.env.CURRENCY,
      },
      {
        name: "Concept",
        value: debt.concept,
      },
      {
        name: "From (The debtor)",
        value: `<@${debt.from}>`,
        inline: true,
      },
      {
        name: "To (The creditor)",
        value: `<@${debt.to}>`,
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
  };

  return interaction.reply({
    embeds: [debtMessage],
    components: [
      {
        type: 1,
        components: [
          //we use mongoose ids to simplify targeting afterwards
          {
            type: 2,
            label: "Fill",
            style: 3,
            custom_id: `fillDebt_${debt._id}`,
          },
          {
            type: 2,
            label: "Delete",
            style: 4,
            custom_id: `deleteDebt_${debt._id}`,
          },
        ],
      },
    ],
  });
};
