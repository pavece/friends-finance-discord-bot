import { deleteDebt } from "./components/deleteDebt.js";
import { fillDebt } from "./components/fillDebt.js";

export const otherInteractions = [
  {
    interactionStarter: "fillDebt",
    action: fillDebt,
  },
  {
    interactionStarter: "deleteDebt",
    action: deleteDebt,
  },
];
