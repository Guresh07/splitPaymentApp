import { getData } from "../utils/storage.js";




// Function to display groups dynamically
export function displayGroups() {

  const groups = getData("groups");
  const container = document.getElementById("groupsContainer");
  container.innerHTML = "";

  groups.forEach(group => {

    const mainUser = getData("mainUser");
    console.log(mainUser)
    const owner = group.members.find(member => member.name === mainUser.name || member.email === mainUser.email) || group.members[0];
    console.log("owner:", owner);
    console.log(group.expenses)
    const amountOwed = group.youOwed ? parseFloat(group.youOwed).toFixed(2) : "0.00";
    const amountText = amountOwed >= 0 ? `owes you $${amountOwed}` : `you owe $${amountOwed}`;
    const colorClass = amountOwed >= 0 ? "text-success" : "text-danger";

    const div = document.createElement("div");
    div.className = " groupCard col-12  col-sm-12 col-lg-6 pb-2 d-flex flex-column justify-content-center align-items-center";
    div.setAttribute("data-group-id", group.groupId);
    div.innerHTML = `
      <div class="shadow-sm px-3 py-2 rounded bg-white col-11 d-flex justify-content-between align-items-center">
        <div class="groupDetails row-gap-1 d-flex flex-column justify-content-center align-items-start">
          <h6 class="m-0 ">${group.groupName}</h6>
          <p class="m-0 fw-semibold" style="font-size: 0.7rem;">${group.members.length} members</p>
          <p class="m-0 fw-semibold text-secondary" style="font-size: 0.75rem;">Created by: ${owner.name}</p>
          ${amountOwed == 0 & group.totalAmount > 0 ?
        `<p class="m-0 fw-semibold  px-2 py-1 rounded-pill" style="font-size: 0.8rem; background-color: rgb(201 255 211); color: darkgreen;"><span>settled</span></p>` :
        `<p class="m-0 fw-semibold ${colorClass}" style="font-size: 0.8rem;">${amountText}</p>`}
          
        </div>
        <div class="totalAmmount d-flex flex-column justify-content-center align-items-end">
          <p class="m-0 fw-semibold" style="font-size: 0.8rem;">$${group.totalAmount} total</p>
          <button delete-group-id="${group.groupId}" class="btn btn-danger delete-group-btn " style="font-size: 0.5rem;">Delete Group</button>
        </div>
      </div>
      <div class="d-flex  justify-content-between align-items-center">
      </div>
          `;
    // <button data-group-id="${group.groupId}" class="btn btn-primary edit-group-btn " style="font-size: 0.5rem;" data-bs-toggle="modal" data-bs-target="#createGroupModal">Edit Group</button>

    container.prepend(div);
  });

}



export const renderRecentActivity = () => {
  const expenses = getData("expenses") || [];
  const groups = getData("groups") || [];
  const payments = getData("payments") || [];
  console.log(payments)

  const recentActivityContainer = document.getElementById("recentActivityList");
  recentActivityContainer.innerHTML = "";

  // If no activity at all
  if (expenses.length === 0 && groups.length === 0) {
    recentActivityContainer.innerHTML = "<p class='text-secondary'>No recent activity.</p>";
    return;
  }

  // ✅ Combine both expenses and groups into one array
  const activities = [
    ...expenses.map(expense => ({
      type: "expense",
      date: expense.date,
      data: expense
    })),
    ...groups.map(group => ({
      type: "group",
      date: group.date,
      data: group
    })),
    ...payments.map(payment => ({
      type: "payment",
      date: payment.date,
      data: payment
    }))
  ];

  // ✅ Sort by date descending
  activities.sort((a, b) => new Date(b.date) - new Date(a.date));

  // ✅ Show latest 5 actions
  activities.slice(0, 5).forEach(activity => {
    const activityItem = document.createElement("div");

    if (activity.type === "expense") {
      const expense = activity.data;
      activityItem.className = "activityDetails shadow-sm d-flex flex-column row-gap-1 px-3 mb-1 py-3 bg-white col-12 rounded";
      activityItem.innerHTML = `
        <p class="m-0 fw-medium" style="font-size: 0.9rem;">
          ${expense.paidBy} paid $${expense.amount} for "${expense.description}"
        </p>
        <p class="m-0 fw-semibold text-secondary" style="font-size: 0.8rem;">
          ${new Date(expense.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
        </p>
      `;
    } else if (activity.type === "group") {
      const group = activity.data;
      activityItem.className = "activityDetails shadow-sm d-flex flex-column row-gap-1 px-3 mb-1 py-3 bg-white col-12 rounded";
      activityItem.setAttribute("groupId", group.groupId)
      activityItem.innerHTML = `
        <p class="m-0 fw-medium" style="font-size: 0.9rem;">
          Group "${group.groupName}" is created.
        </p>
        <p class="m-0 fw-semibold text-secondary" style="font-size: 0.8rem;">
          ${new Date(group.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
        </p>
      `;
    } else if (activity.type === "payment") {
      const payment = activity.data;
      const matchedGroup = groups.find(g => g.groupId === payment.groupId);
      const groupName = matchedGroup ? matchedGroup.groupName : "Unknown Group || Group was Deleted";
      activityItem.className = "activityDetails shadow-sm d-flex flex-column row-gap-1 px-3 mb-1 py-3 bg-white col-12 rounded";
      // activityItem.setAttribute("groupId",group.groupId)
      activityItem.innerHTML = `
        <p class="m-0 fw-medium" style="font-size: 0.9rem;">
          You settled up with "${payment.toName}" in ${groupName}.
        </p>
        <p class="m-0 fw-semibold text-secondary" style="font-size: 0.8rem;">
          ${new Date(payment.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
        </p>
      `;
    }

    // Add to container
    recentActivityContainer.appendChild(activityItem);
  });
};






