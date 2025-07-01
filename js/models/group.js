export default class Group {
  constructor(groupName, members, description, category) {
    this.groupId = "g"+Date.now();
    this.groupName = groupName;
    this.members = members; // array of member names
    this.category = category;
    this.description = description;
    this.expenses = []; // expenses linked to this group
    this.payments = [];
    this.totalAmount = 0,   // default for now
    this.youOwed = 0        // default for now
    this.date = new Date().toISOString();
  }
}