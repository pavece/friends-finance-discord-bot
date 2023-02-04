export const config = {
  currency: "€",
  maxDebtAmount: 40,
  debtDetailsThumbnail:
    "https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //The ID from the channel you want to publish the notices about who has pending debts
  noticeChannelId: "",
  //Cron expression for the notice publishing job you can use this website to generate the cron expression if you don't know how to create them https://cron-ai.vercel.app/
  noticeFrequency: "0 22 * * *", //every day at 22:00
};
