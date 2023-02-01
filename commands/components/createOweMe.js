import { userModel } from "../../models/userModel.js";

export const createOweMe = async (interaction) => {
  const options = interaction.options;
  const user = interaction.user;

  const debtor = options.get("friend");
  const amount = options.get("amount");
  const concept = options.get("concept");

  const createDebtor = async () => {
    const existingDebtor = await userModel.find({ userId: debtor.user.id });

    if (!existingDebtor[0]) {
      const newDebtor = new userModel({
        username: debtor.user.username,
        userId: debtor.user.id,
        avatarId: debtor.user.avatar,
        debts: [
          {
            amount: amount.value,
            concept: concept.value,
            date: new Date(),
            to: user.id,
          },
        ],
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
            debts: [
              ...existingDebtor[0].debts,
              {
                amount: amount.value,
                concept: concept.value,
                date: new Date(),
                to: user.id,
              },
            ],
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
        oweMe: [
          {
            amount: amount.value,
            concept: concept.value,
            date: new Date(),
            from: debtor.user.id,
          },
        ],
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
            oweMe: [
              ...currentCreditor.oweMe,
              {
                amount: amount.value,
                concept: concept.value,
                date: new Date(),
                from: debtor.user.id,
              },
            ],
          }
        );
      } catch (e) {
        console.log(error);
      }
    }
  };

  createCreditor();
  createDebtor();

  const embed = {
    color: 0x0099ff,
    title: "Debt created",
    description: `Now <@${debtor.user.id}> owes you ${amount.value} with the concept: *** ${concept.value}***`,
  };

  interaction.reply({ embeds: [embed] });
};
