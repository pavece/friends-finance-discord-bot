import { checkUserDetails } from "./components/checkUserDetails.js";
import { createOweMe } from "./components/createOweMe.js";
import { getDebt } from "./components/getDebt.js";

export const commands = [
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
  {
    name: "debt",
    description: "View the details of a desired debt",
    options: [
      {
        name: "id",
        description:
          "The id of the debt. Provided when you create them or when you visualize a user's debts",
        type: 3,
        required: true,
      },
    ],
    action: await getDebt,
  },
  {
    name: "userdetails",
    description: "Check a user's debts",
    options: [
      {
        name: "user",
        description:
          "The username of the person you want to check details from",
        type: 6,
        required: true,
      },
    ],
    action: checkUserDetails
  },
];
