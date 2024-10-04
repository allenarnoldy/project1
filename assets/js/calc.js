// store form data in localStorage
document.getElementById('saveTransaction').addEventListener('click', function() {
  const transactionType = document.getElementById('transactionType').value;
  const amount = document.getElementById('amount').value;
  
  document.getElementById('transactionTypeError').style.display = 'none';
  document.getElementById('amountError').style.display = 'none';

  let isValid = true;

  // this is where the magic happens
  if (!transactionType) {
    document.getElementById('transactionTypeError').style.display = 'block';
    isValid = false;
  }

  if (!amount || parseFloat(amount) <= 0) {
    document.getElementById('amountError').style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    const transaction = {
      type: transactionType,
      amount: parseFloat(amount)
    };
    
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Clears form
    document.getElementById('transactionType').value = ''; 
    document.getElementById('amount').value = '';

    displayTransactions();

    // show toast
    var toastEl = document.getElementById('transactionToast');
    var toast = new bootstrap.Toast(toastEl, { delay: 1500 });
    toast.show();
  }
});

// display stored transactions in the table
function displayTransactions() {
  const transactionsTableBody = document.getElementById('transactionsTableBody');
  transactionsTableBody.innerHTML = '';

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  let totalAmount = 0;
  
  transactions.forEach(transaction => {
      const row = document.createElement('tr');
      
      const typeCell = document.createElement('td');
      typeCell.textContent = transaction.type;
      row.appendChild(typeCell);
      
      const amountCell = document.createElement('td');
      amountCell.textContent = `$${transaction.amount.toFixed(2)}`;
      row.appendChild(amountCell);

      totalAmount += transaction.amount;

      const totalCell = document.createElement('td');
      totalCell.textContent = `$${totalAmount.toFixed(2)}`;
      row.appendChild(totalCell);
      
      transactionsTableBody.appendChild(row);
  });
}

// displaying the stored data
document.addEventListener('DOMContentLoaded', function() {
  displayTransactions(); 
});
