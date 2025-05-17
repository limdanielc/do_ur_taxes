import React from 'react';
import '../styling/Home.css';

const Home = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Expense & Tax Dashboard</h1>
        <p>Track your spending and stay tax-ready, all in one place.</p>
      </header>

      <section className="dashboard-cards">
        <div className="card card-expenses">
          <h2>Monthly Expenses</h2>
          <p className="amount">RM2,345.60</p>
        </div>
        <div className="card card-savings">
          <h2>Savings This Month</h2>
          <p className="amount">RM854.40</p>
        </div>
        <div className="card card-tax">
          <h2>Next Tax Due</h2>
          <p className="amount">30 June 2025</p>
        </div>
      </section>

      <section className="dashboard-tips">
        <h2>📌 Quick Tax Tips</h2>
        <ul>
          <li>Organize receipts by category.</li>
          <li>Track deductible business expenses.</li>
          <li>Declare all freelance or side income.</li>
          <li>Use e-Filing before the deadline.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
