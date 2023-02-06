import { userModel } from "../../models/userModel.js";
import { client } from "../../app.js";

export const rememberDebtsComponent = async () => {
  const users = await userModel.find({}).populate("debts").populate("oweMe");

  if (process.env.NOTICE_CHANNEL_ID === "" || !process.env.NOTICE_CHANNEL_ID)
    return console.log(
      "CONFIG ERROR: No notice channel ID specified in the dotenv file. If you don't specify a NOTICE_CHANNEL_ID the bot can't sent automatic notifications."
    );

  const channel = client.channels.cache.get(process.env.NOTICE_CHANNEL_ID);

  const debtors = users
    .filter((e) => {
      const debts = e.debts.filter((d) => !d.filled && !d.deleted);
      return debts.length > 0;
    })
    .map((c) => `<@${c.userId}>`);

  const creditors = users
    .filter((e) => {
      const oweMe = e.oweMe.filter((d) => !d.filled && !d.deleted);
      return oweMe.length > 0;
    })
    .map((c) => `<@${c.userId}>`);

  if (!creditors[0] && !debtors[0]) return;

  channel.send("***IMPORTANT NOTICE***");

  channel.send(
    `${debtors.join()} You have pending debts, make sure to review them using /userdetails @yourUserName`
  );
  channel.send(
    `${creditors.join()} Someone owes you money :eyes: make sure to review the details using /userdetails @yourUserName`
  );
};
