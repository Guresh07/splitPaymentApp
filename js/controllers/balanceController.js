import Payment from "../models/balance.js";
import { getData, saveData } from "../utils/storage.js";
import { renderPayments } from "../views/balanceView.js";

export const addPayment = (fromName, fromId, toName, toId, amount, note, groupId) => {
  const groups = getData("groups");
  const group = groups.find(g => g.groupId === groupId);

  if (!group) {
    alert("Group not found");
    return;
  }

  let payments = getData("payments");
  if (!Array.isArray(payments)) payments = [];

  const newPayment = new Payment(groupId, fromName, fromId, toName, toId, amount, note);
  payments.push(newPayment);
  group.payments.push(newPayment);

  saveData("payments", payments);
  saveData("groups",groups);

  renderPayments();  // Update UI immediately
};
