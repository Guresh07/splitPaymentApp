export default class Expense {
  constructor(description, amount, paidBy, paidPersonId, category, splitType) {
    this.id = "e"+Date.now();
    this.description = description;
    this.amount = parseFloat(amount);
    this.paidBy = paidBy;
    this.paidPersonId = paidPersonId;
    this.category = category;
    this.splitType = splitType;
    this.date = new Date().toISOString();
  }
}

