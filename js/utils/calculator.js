import { getData } from "./storage.js";


export const calculateSplit = (amount, members) => {
  const share = (amount / members.length).toFixed(2);
  return members.map(name => ({ name, owed: parseFloat(share) }));
};

export const totalExpenses = (expenses) => {
  let totalExpenses = 0;
  expenses.forEach(element => {
    totalExpenses += element.amount
  });
  return totalExpenses;
};

export const totalMembers = (members) => {
  return members.length;
};



// export const splitPaidPersonExpense = (members, paidAmount) => {
    
//   const splitAmount = paidAmount/members.length; 
    
//      return parseFloat(splitAmount).toFixed(2);
// }

// export const updateSplitAmounts = (members, paidPersonId, paidAmount, paidBy, owner) => {
//   const splitAmount = parseFloat((paidAmount / members.length).toFixed(2));
//   console.log("o",owner)
//   console.log("p",paidBy)

  
//   members.forEach(member => {
//     if(owner.name == paidBy){
//       member.youOwed += splitAmount 
//     }
//     if (member.id === paidPersonId) {
//       member.youOwed -= splitAmount ;
//     } 
//   });

//   return members;
// };

export const updateSplitAmounts = (members, paidPersonId, paidAmount, paidBy, owner) => {
  const totalMembers = members.length;
  const baseSplit = Math.floor((paidAmount / totalMembers) * 100) / 100; // floor to 2 decimals
  const totalBaseSplit = baseSplit * totalMembers;
  const remainder = Math.round((paidAmount - totalBaseSplit) * 100) / 100; // fix tiny float issues

  console.log("Base Split:", baseSplit, "Remainder:", remainder);

  members.forEach(member => {
    if (owner.name === paidBy) {
      member.youOwed += baseSplit;
    }

    if (member.id === paidPersonId) {
      member.youOwed -= baseSplit;
    }
  });

  // Add remainder to owner to balance precision loss
  const ownerMember = members.find(m => m.name === owner.name);
  if (ownerMember) {
    ownerMember.youOwed += remainder;
  }

  return members;
};



export const amountOwesMe = (members) => {
   
  let total = 0;
  members.forEach(member => {
    total += member.youOwed
  })
  return total

}

export const totalAmountOwesMe = (members) => {

  let totalAmount = null;
  const owedMembers = members
  .filter(member => member.youOwed > 0)
  .map(member => ({
    name: member.name,
    amount: member.youOwed
  }));

  owedMembers.forEach(member => {
    totalAmount += member.amount
  })

  return totalAmount;

}
export const totalMeOwes = (members) => {

  let totalAmount = null;
  const owedMembers = members
  .filter(member => member.youOwed < 0)
  .map(member => ({
    name: member.name,
    amount: member.youOwed
  }));

  owedMembers.forEach(member => {
    totalAmount += member.amount
  })

  return totalAmount;

}


export const balanceOverView = (members, toId, amount) => {

  members.forEach(member => {
    if(member.id == toId){
      member.youOwed += amount;
    }
  });
  return members;
}

