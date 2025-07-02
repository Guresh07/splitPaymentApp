import { deleteGroup } from "./controllers/groupController.js";
import { addGroup } from "./controllers/groupController.js";
import { getData } from "./utils/storage.js";
// import {  openEditGroupModal } from "./controllers/groupController.js";
// import { getData } from "./utils/storage.js";
// import { renderPayments } from "./views/balanceView.js";
// import { getData } from "./utils/storage.js";










// Add More Members dynamically
document.getElementById("addMoreMembers").addEventListener("click", function (e) {
  e.preventDefault();
  const membersList = document.getElementById("membersList");

  const newRow = document.createElement("div");
  newRow.classList.add("row", "g-2", "mb-2");
  newRow.innerHTML = `
    <div class="col">
      <input type="text" class="form-control" placeholder="Name">
    </div>
    <div class="col">
      <input type="email" class="form-control" placeholder="Email">
    </div>
  `;

  membersList.appendChild(newRow);
});

// Create Group button event
document.getElementById("createGroupBtn").addEventListener("click", function () {
  const groupName = document.getElementById("groupName").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const memberRows = document.querySelectorAll("#membersList .row");
  let members = [];

  memberRows.forEach(row => {
    const nameInput = row.querySelector('input[type="text"]');
    const emailInput = row.querySelector('input[type="email"]');

    if (nameInput.value && emailInput.value) {
      members.push({
        id: "m" + Date.now() + Math.floor(Math.random() * 1000),
        name: nameInput.value,
        email: emailInput.value,
        youOwed: 0
      });
    }
  });

  if (!groupName || category === "Select category" || members.length === 0) {
    alert("Please fill all required fields.");
    return;
  }

  if (groupName && members.length > 0) {
    addGroup(groupName, members, description, category);
    // Close the modal
    const createGroupModal = bootstrap.Modal.getInstance(document.getElementById("createGroupModal"));
    createGroupModal.hide();
  } else {
    alert("Please enter a group name and at least one member.");
  }

});



document.addEventListener("click", (e) => {

  const card = e.target.closest(".groupCard");

  // Handle delete button click

  if (e.target.matches(".delete-group-btn")) {
    e.stopPropagation();
    const groupId = e.target.getAttribute("delete-group-id");
    if (confirm("Are you sure you want to delete this group?")) {
      deleteGroup(groupId);
    }
    return;  // Stop here — don't process further
  }







  // Handle group card click

  if (card) {
    const groupId = card.getAttribute("data-group-id");
    localStorage.setItem("selectedGroupId", groupId);
    window.location.href = "groups.html";
  }
});



document.addEventListener("click", (e) => {
  const card = e.target.closest(".activityDetails");
  if (card) {
    const groupId = card.getAttribute("groupId");
    if (groupId) {
      localStorage.setItem("selectedGroupId", groupId);
      window.location.href = "groups.html"; // or your expenses page name
    }
  }
});

// async function getGroups() {
//   try {
//     const response = await fetch("http://10.196.53.76:8000/groupdata/");
//     const data = await response.json();
//     console.log("Groups:", data);
//   } catch (error) {
//     console.error("Error fetching groups:", error);
//   }
// }

// getGroups();















