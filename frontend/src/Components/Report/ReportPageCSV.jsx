import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';

const ReportPageCsv = () => {
  const [data, setData] = useState({
    TotalIncome: 0,
    TotalExpense: 0,
    TotalBudget: 0,
    balance: 0,
  });

  const {
    getExpenses,
    getIncomes,
    getBudgets,
    totalBalance,
    totalBudget,
    totalExpense,
    totalIncome,
    incomes,
    expenses,
    budgets
  } = useGlobalContext();

  useEffect(() => {
    getBudgets();
    getExpenses();
    getIncomes();
    const fetchData = async () => {
      try {
        // Await all data fetching calls
        const [
          balanceResponse,
          totalInc,
          totalExp,
          totalBud,
        ] = await Promise.all([
          totalBalance(),
          totalIncome(),
          totalExpense(),
          totalBudget(),
        ]);

        setData({
          TotalIncome: totalInc || 0,
          TotalExpense: totalExp || 0,
          TotalBudget: totalBud || 0,
          balance: balanceResponse || 0,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [
  ]);

  // Prepare CSV data
  const csvData = [
    ['Incomes'],
    ['Title', 'Amount', 'Category', 'Description', 'Date'],
    ...incomes.map(item => [
      item.title || 'N/A', 
      item.amount || 0, 
      item.category || 'N/A', 
      item.description || '', 
      new Date(item.date).toLocaleDateString()
    ]),
    [], // Blank row
    ['Expenses'],
    ['Title', 'Amount', 'Category', 'Description', 'Date'],
    ...expenses.map(item => [
      item.title || 'N/A', 
      item.amount || 0, 
      item.category || 'N/A', 
      item.description || '', 
      new Date(item.date).toLocaleDateString()
    ]),
    [], // Blank row
    ['Budgets'],
    ['Amount', 'Duration', 'Category', 'Start Date', 'End Date'],
    ...budgets.map(item => [
      item.amount || 0, 
      item.duration || 'N/A', 
      item.category || 'N/A', 
      new Date(item.startDate).toLocaleDateString(), 
      new Date(item.endDate).toLocaleDateString()
    ]),
    [], // Blank row
    ['Summary'],
    ['Balance', data.balance || 0],
    ['Total Budget', data.TotalBudget || 0],
    ['Total Income', data.TotalIncome || 0],
    ['Total Expense', data.TotalExpense || 0],
  ];

  return (
    <div>
      <br />
      <button className="btn btn-primary">
        <CSVLink
          data={csvData}
          filename="finance_report.csv"
          className="btn btn-primary"
        >
          Export Report as CSV
        </CSVLink>
      </button>
    </div>
  );
};

export default ReportPageCsv;
