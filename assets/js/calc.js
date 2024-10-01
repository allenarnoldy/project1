// store form data in localStorage
document.getElementById('saveTransaction').addEventListener('click', function() {
  const transactionType = document.getElementById('transactionType').value;
  const amount = document.getElementById('amount').value;
  
  if (amount && transactionType) {
      const transaction = {
          type: transactionType,
          amount: parseFloat(amount)
      };

      let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      
      document.getElementById('transactionType').value = ''; 
      document.getElementById('amount').value = '';
      
      displayTransactions();
  } else {
      alert('Please fill in all fields');
  }
});

// Working on showing the total amount and storing it in localStorage
function getTotal() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  let total = 0;
  
  transactions.forEach(transaction => {
    total += transaction.amount;
    Document.getElementById('total').value = total.toFixed(2);
  });
  return total.toFixed(2);
}

// display stored transactions in the table
function displayTransactions() {
  const transactionsTableBody = document.getElementById('transactionsTableBody');
  transactionsTableBody.innerHTML = '';

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
  transactions.forEach(transaction => {
      const row = document.createElement('tr');
      
      const typeCell = document.createElement('td');
      typeCell.textContent = transaction.type;
      row.appendChild(typeCell);
      
      const amountCell = document.createElement('td');
      amountCell.textContent = transaction.amount.toFixed(2);
      row.appendChild(amountCell);
      
      transactionsTableBody.appendChild(row);
  });
}

// displaying the stored data
document.addEventListener('DOMContentLoaded', function() {
  displayTransactions(); 
});
