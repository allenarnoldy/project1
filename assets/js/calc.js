// Function to store form data in localStorage
document.getElementById('saveTransaction').addEventListener('click', function() {
    // Get the values from the dropdown and input field
    const transactionType = document.getElementById('transactionType').value;
    const amount = document.getElementById('amount').value;
    
    if (amount && transactionType) {
      // Prepare data to store
      const transaction = {
        type: transactionType,
        amount: parseFloat(amount)
      };
      
      // Get existing transactions from localStorage or initialize empty array
      let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      
      // Add new transaction to the array
      transactions.push(transaction);
      
      // Store updated transactions back to localStorage
      localStorage.setItem('transactions', JSON.stringify(transactions));
      
      alert('Transaction saved!');
      
      // Optionally, clear form inputs after saving
      document.getElementById('transactionType').value = 'income';
      document.getElementById('amount').value = '';
    } else {
      alert('Please fill in all fields');
    }
  });
  
  // Example of retrieving and displaying the stored data
  document.addEventListener('DOMContentLoaded', function() {
    const transactionsEl = JSON.parse(localStorage.getItem('transactions')) || [];
    console.log('Stored transactions:', transactionsEl);
  });
  