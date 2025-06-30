export default class Payment {
  constructor(groupId, fromName, fromId, toName, toId, amount, note) {
    this.paymentId = "p"+Date.now();
    this.groupId = groupId;
    this.fromName = fromName;
    this.fromId = fromId;
    this.toName = toName;
    this.toId = toId;
    this.amount = amount;
    this.note = note;
    this.date = new Date().toISOString();
  }
}
