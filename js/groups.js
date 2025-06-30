import { addExpense } from "./controllers/expenseController.js";
import { renderExpense } from "./views/expenseView.js";

const groupId = localStorage.getItem("selectedGroupId");

// Add Expense button click
document.querySelector("#addExpenseData").addEventListener("click", function() {
  const description = document.getElementById("expenseDescription").value;
  const amount = document.getElementById("expenseAmount").value;
  let paidBy = document.getElementById("paidBy").value;
  let paidPersonId = null;
  if (paidBy) {
    const opts = document.querySelectorAll("option")
    opts.forEach(opt => {   
      if(opt.innerText == paidBy){
        paidPersonId = opt.getAttribute("paidPersonId")
      }
    
    })
  }
  const category = document.getElementById("expenseCategory").value;
  const splitType = document.getElementById("splitType").value;

  if (!description || !amount) {
    alert("Please enter a description and amount.");
    return;
  }else{
    addExpense(paidPersonId, groupId, description, amount, paidBy, category, splitType);
      // Close the modal
    // const createGroupModal = bootstrap.Modal.getInstance(document.getElementById("createGroupModal"));
    // // createGroupModal.hide();
    // Close the modal
    const addExpenseModal = bootstrap.Modal.getInstance(document.getElementById("addExpenseModal"));
    addExpenseModal.hide();

  }


  // Clear form
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("paidBy").selectedIndex = 0;
  document.getElementById("expenseCategory").selectedIndex = 0;
  document.getElementById("splitType").selectedIndex = 0;

  // Refresh expense list
  renderExpense(paidPersonId, amount, paidBy);
});


//   // Add More Members dynamically
// document.getElementById("addMoreMembers").addEventListener("click", function(e) {
//   e.preventDefault();
//   const membersList = document.getElementById("membersList");

//   const newRow = document.createElement("div");
//   newRow.classList.add("row", "g-2", "mb-2");
//   newRow.innerHTML = `
//     <div class="col">
//       <input type="text" class="form-control" placeholder="Name">
//     </div>
//     <div class="col">
//       <input type="email" class="form-control" placeholder="Email">
//     </div>
//   `;

//   membersList.appendChild(newRow);
// });


// // Create Group button event
// document.getElementById("createGroupBtn").addEventListener("click", function() {
//   const groupName = document.getElementById("groupName").value;
//   const category = document.getElementById("category").value;
//   const description = document.getElementById("description").value;

//   const memberRows = document.querySelectorAll("#membersList .row");
//   let members = [];

//   memberRows.forEach(row => {
//     const nameInput = row.querySelector('input[type="text"]');
//     const emailInput = row.querySelector('input[type="email"]');

//     if (nameInput.value && emailInput.value) {
//       members.push({
//         id: "m"+Date.now() + Math.floor(Math.random() * 1000),
//         name: nameInput.value,
//         email: emailInput.value,
//         youOwed: 0
//       });
//     }
//   });

//   if (!groupName || category === "Select category" || members.length === 0) {
//     alert("Please fill all required fields.");
//     return;
//   }

//   if (groupName && members.length > 0) {
//     addGroup(groupName, members, description, category);
//     window.location.href("index.html")
//       // Close the modal
//     const createGroupModal = bootstrap.Modal.getInstance(document.getElementById("createGroupModal"));
//     createGroupModal.hide();
//   } else {
//     alert("Please enter a group name and at least one member.");
//   }

// });

// console.log("hi")


