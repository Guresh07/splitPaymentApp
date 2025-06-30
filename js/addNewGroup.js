import { addGroup } from "./controllers/groupController.js";

document.addEventListener("DOMContentLoaded", () => {
  const addMoreMembersLink = document.getElementById("addMoreMembers");
  if (addMoreMembersLink) {
    addMoreMembersLink.addEventListener("click", (e) => {
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
  }

  const createGroupBtn = document.getElementById("CreateGroupBtn");
  if (createGroupBtn) {
    createGroupBtn.addEventListener("click", () => {
      const groupName = document.getElementById("groupName").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;

      const memberRows = document.querySelectorAll("#membersList .row");
      const members = [];

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

      // Add group via controller function
      addGroup(groupName, members, description, category);

      // Close the modal
      const createGroupModal = bootstrap.Modal.getInstance(document.getElementById("createGroupModal"));
      createGroupModal.hide();

      // Redirect to index or refresh
      window.location.href = "index.html";
    });
  }
});












// console.log("hi")

// import { addGroup } from "./controllers/groupController.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.getElementById("CreateGroupBtn");
//   console.log(btn);

//   if (btn) {
//     btn.addEventListener("click", () => {
//       console.log("Button clicked!");

//       addGroup("Test Group", [], "Test desc", "trip");

//       const createGroupModal = bootstrap.Modal.getInstance(document.getElementById("createGroupModal"));
//       if (createGroupModal) createGroupModal.hide();

//       window.location.href = "index.html";
//     });
//   }
// });
