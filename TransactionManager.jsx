import React, { useState, useEffect } from 'react';
import './TransactionManager.css'; // Assuming you move the relevant CSS here

// A reusable currency formatter
const rupeeFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
});

// A dummy in-memory store. In a real app, this would be a backend call.
const getTransactionsFromStorage = () => {
    try {
        const savedData = localStorage.getItem('spendrAppData');
        return savedData ? JSON.parse(savedData).transactions : [];
    } catch (e) {
        console.error('Error loading state from localStorage', e);
        return [];
    }
};

const saveTransactionsToStorage = (transactions) => {
    try {
        localStorage.setItem('spendrAppData', JSON.stringify({ transactions }));
    } catch (e) {
        console.error('Error saving state to localStorage', e);
    }
};

const TransactionManager = () => {
    // State to hold the list of all transactions
    const [transactions, setTransactions] = useState(getTransactionsFromStorage());

    // State to hold the form data
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        category: 'Groceries',
        date: new Date().toISOString().slice(0, 10),
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newAmount = parseFloat(formData.amount);
        if (isNaN(newAmount) || newAmount <= 0) {
            // Display an alert for invalid entry
            alert('Please enter a valid amount.');
            return;
        }

        const newTransaction = {
            date: formData.date,
            description: formData.description,
            category: formData.category,
            amount: newAmount,
            type: 'expense'
        };

        // Update the transactions state
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        
        // Save the updated transactions to localStorage
        saveTransactionsToStorage(updatedTransactions);
        
        // Reset the form
        setFormData({
            amount: '',
            description: '',
            category: 'Groceries',
            date: new Date().toISOString().slice(0, 10),
        });

        // Display a success alert
        alert('Transaction added successfully!');
    };

    // Get the 5 most recent transactions
    const recentTransactions = transactions.slice(-5).reverse();

    return (
        <div className="container">
            <div className="quick-actions-container">
                <div className="card add-transaction-card">
                    <h3>Add New Transaction</h3>
                    <form id="transaction-form" className="form" onSubmit={handleSubmit}>
                        <label htmlFor="amount">Amount (₹):</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="e.g., 500.00"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                        
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="e.g., Coffee with a friend"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Groceries">Groceries</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Food & Drinks">Food & Drinks</option>
                            <option value="Transportation">Transportation</option>
                        </select>
                        
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                        
                        <button type="submit" className="btn">Add Expense</button>
                    </form>
                </div>
            </div>

            <div className="card transactions-history">
                <h3>Recent Transactions</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody id="transaction-list">
                        {/* Map over the recentTransactions array to render rows */}
                        {recentTransactions.length > 0 ? (
                            recentTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.category}</td>
                                    <td className={transaction.type === 'expense' ? 'expense' : 'income'}>
                                        {transaction.type === 'expense' ? '- ' : ''}{rupeeFormatter.format(transaction.amount)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No recent transactions.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionManager;