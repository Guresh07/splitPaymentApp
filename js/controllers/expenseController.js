import Expense from "../models/expense.js";
import { getData, saveData } from "../utils/storage.js";
import { renderExpense } from "../views/expenseView.js";




export const addExpense = (paidPersonId, groupId, description, amount, paidBy, category, splitType) => {
  const groups = getData("groups");
  const group = groups.find(g => g.groupId === groupId);
  
  if (!group) {
    alert("Group not found");
    return;
  }
  const newExpense = new Expense(description, amount, paidBy, paidPersonId, category, splitType);
  let expenses = getData("expenses");
    if (!Array.isArray(expenses)) {
    expenses = [];
  }
  group.expenses.push(newExpense);
  expenses.push(newExpense)
  saveData("groups", groups);
  saveData("expenses", expenses);
};
renderExpense();
