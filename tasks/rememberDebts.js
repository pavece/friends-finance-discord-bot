import cron from "node-cron";
import { config } from "../config.js";
import { rememberDebtsComponent } from "./components/rememberDebtsComponent.js";

export const rememberDebt = cron.schedule(config.noticeFrequency, () => {
  rememberDebtsComponent();
});
