import { addPayment } from "./controllers/balanceController.js";
// import { getData } from "./utils/storage.js";
import { getPaymentsData, renderPayments } from "./views/balanceView.js";


let group = localStorage.getItem("selectedGroupId");



const members = document.querySelectorAll(".membersList .member");

const ownerMembers = [];
const otherMembers = [];

members.forEach(member => {
  const memberId = member.getAttribute("member-id");
  let memberNameText = member.querySelector(".memberName").innerText;

  const isOwner = memberNameText.includes("(owner)");
  
  // Clean up the name by removing "(owner)" and trimming extra spaces
  const cleanName = memberNameText.replace("(owner)", "").trim();

  const memberData = {
    id: memberId,
    name: cleanName
  };

  if (isOwner) {
    ownerMembers.push(memberData);
  } else {
    otherMembers.push(memberData);
  }
});

console.log("Owner Members:", ownerMembers);
console.log("Other Members:", otherMembers);


document.getElementById("recordPaymentBtn").setAttribute("ownerId",ownerMembers[0].id)
document.querySelector("[data-bs-target='#recordPaymentModal']").addEventListener("click", () => {
  renderPayments(ownerMembers[0].name)
})

document.getElementById("recordPaymentBtn").addEventListener("click", () => {

  const fromId = document.getElementById("recordPaymentBtn").getAttribute("ownerId")
  const fromName = ownerMembers[0].name

  const toName = document.getElementById("paymentTo").value;

  const toId = otherMembers.find(member => member.name === toName);

  const amount = parseFloat(document.getElementById("paymentAmount").value);
  const note = document.getElementById("paymentNote").value;



    if (toName === "Select a person" || isNaN(amount) || amount <= 0) {
      alert("Please enter valid payment details.");
      return;
    }


    addPayment(fromName, fromId, toName, toId.id, amount, note, group);
    getPaymentsData(toId.id, amount);

    // Clear form inputs
    document.getElementById("paymentTo").value = "Select a person";
    document.getElementById("paymentAmount").value = "";
    document.getElementById("paymentNote").value = "";

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("recordPaymentModal"));
    modal.hide();
  });
  renderPayments(ownerMembers[0].name);

document.querySelectorAll(".paymentBtn").forEach(button => {
  button.addEventListener("click", () => {
    const modalElement = document.getElementById("recordPaymentModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // const personName = e.target.getAttribute("name");
    // console.log(personName)

    // const paidBySelect = document.getElementById("paymentTo");
    // paidBySelect.innerHTML = ""; 
    
    //   if ( personName) {
    //     const option = document.createElement("option");
    //     option.textContent = personName;
    //      // optional, if you want id as value
    //     paidBySelect.appendChild(option);
    //   }
    
  });
});