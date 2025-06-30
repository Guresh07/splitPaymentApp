import { getData, saveData } from "../utils/storage.js";
import  {totalMembers,totalExpenses,  updateSplitAmounts, amountOwesMe, } from "../utils/calculator.js";
// import  totalMembers  from "../utils/calculator.js";


window.addEventListener("DOMContentLoaded", () => {
    const groupId = localStorage.getItem("selectedGroupId");
    const groups = getData("groups");
    const group = groups.find(g => g.groupId === groupId);

  if (!group) {
    alert("Group not found.");
    return;
  }else{
    document.getElementById("groupTitle").innerText = `${group.groupName}`;
  }
});



export const renderExpense = (paidPersonId, paidAmount, paidBy) => {
  
  
  const groupId = localStorage.getItem("selectedGroupId");
  const groups = getData("groups");
  const group = groups.find(g => g.groupId === groupId);
  const mainUser = getData("mainUser");
  console.log(mainUser)
  let owner = group.members.find(member =>member.name === mainUser.name || member.email === mainUser.email) || group.members[0];
  console.log("owner:", owner.name);
  console.log(group.expenses)
  const expenses = group.expenses;
  const members = group.members;
  console.log("before:",members)


  
  const amount = totalExpenses(expenses);
  const totalPeople =  totalMembers(members);
  console.log(totalPeople)
  console.log("paidBy:",paidBy)
  // console.log("amount",amountOwes)




  // Update split amounts
  const updatedMembers = updateSplitAmounts(members,paidPersonId,paidAmount, paidBy, owner);
  // Update the group object
  group.members = updatedMembers;
  console.log("updated:",updatedMembers)
  // Save the entire groups array back to localStorage
  saveData("groups", groups);
  const updatedGroups = getData("groups");
  const updatedGroup = updatedGroups.find(g => g.groupId === groupId);
  const updatedMembersGroup = updatedGroup.members;
  let amountOwes = amountOwesMe(updatedMembersGroup);
  console.log(amountOwes)



  
  
  group.totalAmount = amount;
  group.youOwed = amountOwes;
  
  saveData("groups", groups);





  
  const amountData = document.querySelector('.totalAmount');
  amountData.innerText = "$"+amount ;

  const totalBalance = document.querySelector(".totalBalance");
  totalBalance.innerText = "$"+amountOwes;

  const membersData = document.querySelector('.totalMembers');
  membersData.innerText = totalPeople ;




  const memberList = document.querySelector(".membersData");
  memberList.innerHTML = "";
  
  members.forEach(member => {
      const div = document.createElement("div");
      div.className = "member d-flex flex-wrap align-items-center justify-content-sm-between justify-content-center";
      div.setAttribute("member-id", member.id);
      const initial = member.name.charAt(0).toUpperCase();
      const amountOwed = member.youOwed ? parseFloat(member.youOwed).toFixed(2) : "0.00";
      const amountText = amountOwed >= 0 ? `owes you $${amountOwed}`: `you owe $${amountOwed}`;
      const colorClass = amountOwed >= 0 ? "text-success" : "text-danger"; 



      
      div.innerHTML = `
      <div class="d-flex align-items-center justify-content-start">
        <p class="fw-medium px-3 py-2 me-2 rounded-circle m-0" style="background-color: #e5e5ff">
          <span style="color: darkblue;">${initial}</span>
        </p>
        <p class="memberName m-0 fw-medium">${member.name === owner.name ? "You" : member.name}</p>
      </div>
      <div class="amountGot ">
        <p class="m-0 fw-medium ${colorClass}" style="font-size: 0.9rem;">${member.name === owner.name ? "" :amountText}</p>
      </div>
  `;

      // const Icon = document.querySelector(".amountGot")
      



    memberList.appendChild(div);
    memberList.appendChild(document.createElement("hr"));
  });





  const paidBySelect = document.getElementById("paidBy");
  paidBySelect.innerHTML = ""; // clear existing options
  // Populate options with member names
  members.forEach(member => {
      const option = document.createElement("option");
      option.setAttribute("paidPersonId",member.id)
      option.textContent = member.name;
      paidBySelect.appendChild(option);
  });
  console.log(expenses)
  const container = document.getElementById("expenseListContainer");
  container.className = `expenseList-${groupId} px-sm-4`
  container.innerHTML = "";
  expenses.forEach((expense)=>{
      const div = document.createElement("div");
      div.className = "listItem d-flex align-items-center justify-content-between";
  
      div.innerHTML = `
          <div class="d-flex flex-column justify-content-center">
          <p class="m-0 fw-medium">${expense.description}</p>
          <p class="m-0 text-secondary">${new Date(expense.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })} . Paid by ${expense.paidBy} . ${expense.splitType} split</p>
          </div>
          <div>
          <p class="m-0 fw-bold">$${expense.amount}</p>
          </div>
      `;
  
      container.prepend(div);
      const hr = document.createElement("hr");
      div.after(hr);
    })
};

// renderExpense();



