import Group from "../models/group.js";
import { saveData, getData } from "../utils/storage.js";
import { displayGroups, renderRecentActivity } from "../views/groupView.js";
// import { renderRecentActivity } from "../views/groupView.js";



export const addGroup = (groupName, members, description, category) => {
  const groups = getData("groups");
  const newGroup = new Group(groupName, members, description, category);
  groups.push(newGroup);
  saveData("groups", groups);
  displayGroups(groups);
  renderRecentActivity();
  };

export const deleteGroup = (groupId) => {
  let groups = getData("groups");

  // Remove the group by ID
  groups = groups.filter(group => group.groupId !== groupId);

  // Save updated groups back to localStorage
  saveData("groups", groups);

  // Refresh UI
 displayGroups(groups);
 
};

displayGroups();
renderRecentActivity();

// export function openEditGroupModal(groupId) {
//   const groups = getData("groups");
//   const group = groups.find(g => g.groupId === groupId);
//   if (!group) {
//     alert("Group not found.");
//     return;
//   }

//   // Set modal title and button text
//   document.getElementById("createGroupModalLabel").innerText = "Edit Group";
//   document.getElementById("createGroupBtn").innerText = "Update Group";

//   // Fill fields
//   document.getElementById("groupName").value = group.groupName;
//   document.getElementById("category").value = group.category;
//   document.getElementById("description").value = group.description;

//   // Fill members
//   const membersList = document.getElementById("membersList");
//   membersList.innerHTML = "";
//   group.members.forEach(member => {
//     const row = document.createElement("div");
//     row.className = "row g-2 mb-2";
//     row.innerHTML = `
//       <div class="col">
//         <input type="text" class="form-control" placeholder="Name" value="${member.name}" required>
//       </div>
//       <div class="col">
//         <input type="email" class="form-control" placeholder="Email" value="${member.email}" required>
//       </div>
//     `;
//     membersList.appendChild(row);
//   });

//   // Set current editing groupId globally (if needed)
//   window.currentEditingGroupId = groupId;

//   // Show modal
//   new bootstrap.Modal(document.getElementById("createGroupModal")).show();

// document.getElementById("createGroupBtn").addEventListener("click", () => {
//   const groups = getData("groups");

//   // Check if editing existing group
//     const group = groups.find(g => g.groupId === window.currentEditingGroupId);
//     group.groupName = groupName;
//     group.category = category;
//     group.description = description;
//     group.members = members;

//   // Reset modal + editing ID
//   document.getElementById("createGroupForm").reset();
//   window.currentEditingGroupId = null;

//   const modalInstance = bootstrap.Modal.getInstance(document.getElementById("createGroupModal"));
//   modalInstance.hide();
// });
// document.getElementById("createGroupModal").addEventListener("hidden.bs.modal", () => {
//   // document.getElementById("createGroupForm").reset();
//   window.currentEditingGroupId = null;
//   document.getElementById("createGroupModalLabel").innerText = "Create New Group";
//   document.getElementById("createGroupBtn").innerText = "Create Group";
// });

// }






