import React, { useEffect, useState } from "react";
import PieChartComponent from "../PieChart/PieChart";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { InnerLayout } from "../../styles/Layouts";
import './DashboarPage.css'
import ReportPageCsv from "../Report/ReportPageCSV";

export default function DashboardPage() {
  const { totalBalance, totalBudget, totalIncome, totalExpense, message, flashMessage } = useGlobalContext();

  const [data, setData] = useState([
    { name: 'Budget', value: 0 },
    { name: 'Income', value: 0 },
    { name: 'Expenses', value: 0 },
    { name: 'Balance', value: 0 }
  ]);

  useEffect(() => {

    const fetchDataAndSet = () => {
      const budget = totalBudget();
      const income = totalIncome();
      const expense = totalExpense();
      const balance = totalBalance();

      setData([
        { name: 'Budget', value: budget },
        { name: 'Expenses', value: expense },
        { name: 'Income', value: income },
        { name: 'Balance', value: balance }
      ]);
    };

    fetchDataAndSet();
  }, [totalBalance, totalBudget, totalIncome, totalExpense]); // Dependencies can be adjusted based on your needs

  return (
    <InnerLayout>
      <h1>Dashboard</h1><br />
      {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
      <div className="comp-con">
            <PieChartComponent data={data} />
            <br />
        <div className="content">
        <ul>
            <li>Total Budget: {totalBudget()}</li>
            <li>Total Income: {totalIncome()}</li>
            <li>Total Expense: {totalExpense()}</li>
            <li>Total Balance: {totalBalance()}</li>
        </ul>
      </div>
      </div>
      <div className="export-pdf">
        <ReportPageCsv/>
      </div>
      
    </InnerLayout>
  );
}