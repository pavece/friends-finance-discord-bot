import { userModel } from "../../models/userModel.js";
import { debtModel } from "../../models/debtModel.js";
import { nanoid } from "nanoid";

export const createOweMe = async (interaction) => {
  const options = interaction.options;
  const user = interaction.user;

  const debtor = options.get("friend");
  const amount = options.get("amount");
  const concept = options.get("concept");

  const debt = {
    amount: amount.value,
    concept: concept.value,
    date: new Date(),
    filled: false,
    debtId: nanoid(6),
    to: user.id,
    from: debtor.user.id,
  };

  const createDebt = async () => {
    const newDebt = new debtModel(debt);
    try {
      await newDebt.save();
    } catch (e) {
      console.log(e);
    }
    return newDebt._id;
  };


  const debtId = await createDebt();
  console.log(debtId)


  const createDebtor = async () => {
    const existingDebtor = await userModel.find({ userId: debtor.user.id });

    if (!existingDebtor[0]) {
      const newDebtor = new userModel({
        username: debtor.user.username,
        userId: debtor.user.id,
        avatarId: debtor.user.avatar,
        debts: [debtId],
        oweMe: [],
      });
      try {
        await newDebtor.save();
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await userModel.updateOne(
          { userId: debtor.user.id },
          {
            debts: [...existingDebtor[0].debts, debtId],
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  //create ior update creditor

  const createCreditor = async () => {
    const currentCreditor = await userModel.findOne({ userId: user.id });

    if (!currentCreditor) {
      const newCreditor = new userModel({
        username: user.username,
        userId: user.id,
        avatarId: user.avatar,
        debts: [],
        oweMe: [debtId],
      });
      try {
        await newCreditor.save();
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await userModel.updateOne(
          { userId: user.id },
          {
            oweMe: [...currentCreditor.oweMe, debtId],
          }
        );
      } catch (e) {
        console.log(error);
      }
    }
  };

  await createCreditor();
  await createDebtor();

  const embed = {
    color: 0x0099ff,
    author: {
      name: debtor.user.username,
      icon_url: `https://cdn.discordapp.com/avatars/${debtor.user.id}/${debtor.user.avatar}.jpeg`,
    },
    title: `Debt created, you can access the debt by using: ***/debt ${debt.debtId}***`,
    timestamp: debt.date.toISOString(),
    description: `Now <@${debtor.user.id}> owes you ${amount.value} with the concept: *** ${concept.value}***`,
  };

  interaction.reply({ embeds: [embed] });
};
