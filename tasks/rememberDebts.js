import cron from "node-cron";
import { rememberDebtsComponent } from "./components/rememberDebtsComponent.js";

import * as dotenv from "dotenv";
dotenv.config();

export const rememberDebt = cron.schedule(
  process.env.NOTICE_FREQUENCY || "00 22 * * *",
  () => {
    rememberDebtsComponent();
  },
  {
    timezone: process.env.NOTICE_TIMEZONE || "Europe/Madrid",
    scheduled: true,
  }
);
