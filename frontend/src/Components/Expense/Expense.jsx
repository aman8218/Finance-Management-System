import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import ExpenseForm from './ExpenseForm'
import IncomeItem from "../IncomeItem/incomeitem";

function Expenses()
{
    const {expenses, getExpenses, deleteExpense, totalExpense}=useGlobalContext()
    const [currentExpense, setCurrentExpense] = useState(null);
    const editExpense = (id) => {
        const expenseToEdit = expenses.find(expense => expense._id === id);
        setCurrentExpense(expenseToEdit);
    };
    const handleFormSubmit = (expenseData) => {
        if (currentExpense) {
            updateExpense(currentExpense._id, expenseData);
            setCurrentExpense(null);
        }
    };

    useEffect(()=>{
        getExpenses()
    }, [])
    return(
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total-Expense: <span>${totalExpense()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                    <ExpenseForm currentExpense={currentExpense} onSubmit={handleFormSubmit} />
                    </div>
                    <div className="incomes">
                        {expenses.map((income)=>{
                            const {_id, title, amount, date, category, description} = income;
                            const type = 'expense';
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="green"
                                deleteItem={deleteExpense}
                                editItem={editExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
display: flex;
overflow: auto;
.total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
    display: flex;
    gap: 2rem;
    .incomes{
    flex: 1; 
        }
    }
`;

export default Expenses;