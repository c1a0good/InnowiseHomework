let expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (category && amount) {
        expenses.push({ category, amount });
        updateExpenseList();
        clearForm();
    }
});

document.getElementById('calculateBtn').addEventListener('click', calculateExpenses);

function clearForm() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString()}</td>
        `;
        expenseList.appendChild(row);
    });
}

function calculateExpenses() {
    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = `$${total.toLocaleString()}`;
    
    // Calculate average daily expense
    const averageDaily = total / 30;
    document.getElementById('averageExpense').textContent = `$${averageDaily.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
    
    // Find top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
    
    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString()}`;
        topExpensesList.appendChild(li);
    });
} 