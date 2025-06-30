import { balanceOverView, totalAmountOwesMe, totalMeOwes } from "../utils/calculator.js";
import { getData, saveData } from "../utils/storage.js";
import { renderExpense } from "./expenseView.js";





export const renderPayments = (fromName) => {

  const payments = getData("payments") || [];
  const groupId = localStorage.getItem("selectedGroupId");
  const groups = getData("groups");
  const group = groups.find(g => g.groupId === groupId);
  const groupPayments = payments.filter(payment => payment.groupId === groupId);
  console.log(groupPayments);


  const mainUser = getData("mainUser");
  console.log(mainUser)
  let owner = group.members.find(member =>member.name === mainUser.name || member.email === mainUser.email) || group.members[0];
  console.log("owner:", owner.name);
  const members = group.members;



  
  const paidBySelect = document.getElementById("paymentTo");
  paidBySelect.innerHTML = ""; // clear existing options

  // Populate options with member names
  members.forEach(member => {
    if(member.name != fromName){
      const option = document.createElement("option");
      option.textContent = member.name;
      paidBySelect.appendChild(option);
    }
  });

  const paymentContainer = document.getElementById("paymentList");
  if (!paymentContainer) return;
  paymentContainer.innerHTML = "";

  if (payments.length === 0) {
    paymentContainer.innerHTML = "<p class='text-secondary'>No recorded payments.</p>";
    return;
  }

  payments.forEach(payment => {
     let gName = null
    groups.forEach(g => {
      if (g.groupId === payment.groupId) {
        gName = g.groupName
      }

    });
    // console.log(paymentGroup)
    const item = document.createElement("div");
    item.className = "listItem d-flex align-items-center justify-content-between mb-3";

    item.innerHTML = `
      <div class="d-flex align-items-center column-gap-sm-3">
          <div class="pendingIcon">
              <span class="p-3 rounded-circle d-flex justify-content-center align-items-center d-none d-sm-inline py-sm-2" style="background-color:  rgb(225 228 255)">
                  <i class="fa-solid fa-file-invoice" style="color: #2a74f4;"></i>
              </span>
          </div>
          <div class="d-flex flex-column justify-content-center">
              <p class="m-0 fw-medium" style="font-size: 0.9rem;">You Paid to ${payment.toName} </p>
              <p class="m-0 fw-semibold text-secondary" style="font-size: 0.8rem;">${new Date(payment.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })} . with ${gName ? gName : "Group which was deleted"}</p>
          ${payment.note ? `<p class="m-0 fw-semibold text-secondary" style="font-size: 0.8rem;">Note: ${payment.note}</p>` : ""}
          </div>
      </div>
      <div>
          <p class="m-0 fw-bold" style="font-size: 0.9rem;">$${payment.amount}</p>
      </div>
    `;

    paymentContainer.prepend(item);
  });



};

export const getPaymentsData = (toId, amount) => {

  const groups = getData("groups")
  const groupId = localStorage.getItem("selectedGroupId");
  const group = groups.find(g => g.groupId === groupId);
  const members = group.members;
  
  const mainUser = getData("mainUser");
  console.log(mainUser)
  let owner = group.members.find(member =>member.name === mainUser.name || member.email === mainUser.email) || group.members[0];
  console.log(toId);
  console.log(amount);
  console.log(members);
  const updatedMembers = balanceOverView(members, toId, amount);
  group.members = updatedMembers;
  console.log(updatedMembers)
  saveData("groups", groups);
  let amountOwesMe = totalAmountOwesMe(updatedMembers);
  let amountMeOwes = totalMeOwes(updatedMembers);

  const totalAmount = document.querySelector(".totalOwesYou");
  totalAmount.innerText = "$" + (amountOwesMe ? amountOwesMe : 0) ;

  const totalAmountMeOwes = document.querySelector(".totalYouOwes");
  totalAmountMeOwes.innerText = "$" + (amountMeOwes ? amountMeOwes : 0) ;

  const netBalance = document.querySelector(".netBalance");
  netBalance.innerText = "$" + (amountOwesMe + amountMeOwes)

    
  const memberList = document.querySelector(".membersList");
  memberList.innerHTML = "";
  
  updatedMembers.forEach(member => {
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
        <p class="memberName m-0 fw-medium">${member.name === owner.name ? owner.name+"  (owner)" : member.name}</p>
      </div>
      <div class="amountGot d-flex align-items-center justify-content-end flex-wrap column-gap-2">
        <p class="m-0 fw-medium ${colorClass}" style="font-size: 0.9rem;">${member.name === owner.name ? "" : amountText}</p>
      </div>

  `;


  const payButton = document.createElement("span");
  payButton.className = "btn btn-primary fw-medium m-0 px-3 paymentBtn";
  payButton.style.fontSize = "0.8rem";
  payButton.innerText = "Pay";
  payButton.setAttribute("name",member.name);
  const notificationBell = document.createElement("i");
  notificationBell.className = "fa-solid fa-bell text-primary"
  const amountGot = div.querySelector(".amountGot");
  if (amountGot.children[0].innerText != "") {
    if (amountOwed >= 0) {
      amountGot.appendChild(notificationBell);
    } else {
      amountGot.appendChild(payButton);
    }
  }



  memberList.appendChild(div);
  memberList.appendChild(document.createElement("hr"));
  });

}



renderPayments();
getPaymentsData();

