import Payment from "../models/balance.js";
import { getData, saveData } from "../utils/storage.js";
import { renderPayments } from "../views/balanceView.js";

export const addPayment = (fromName, fromId, toName, toId, amount, note, group) => {
  let payments = getData("payments");
  if (!Array.isArray(payments)) payments = [];

  const newPayment = new Payment(group, fromName, fromId, toName, toId, amount, note);
  payments.push(newPayment);

  saveData("payments", payments);

  renderPayments();  // Update UI immediately
};
