import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import BudgetItem from "./BudgetItem";
import BudgetForm from "./BudgetForm";
import './Budget.css'

function Budget()
{
    const {budgets, updateBudget, deleteBudget, getBudgets}=useGlobalContext()
    const [currentBudget, setCurrentBudget] = useState(null);
    const editBudget = (id) => {
        const budgetToEdit = budgets.find(budget => budget._id === id);
        setCurrentBudget(budgetToEdit);
    };
    const handleFormSubmit = (budgetData) => {
        if (currentBudget) {
            updateBudget(currentBudget._id, budgetData);
            setCurrentBudget(null);
        }
    };

    useEffect(()=>{
        getBudgets()
    }, [])
    return(
        <ExpenseStyled className="comp-con">
            <InnerLayout>
                <h1>Budget</h1>
                <div className="income-content">
                    <div className="form-container">
                    <BudgetForm currentBudget={currentBudget} onSubmit={handleFormSubmit} />
                    </div>
                    <div className="incomes">
                        {budgets.map((budget)=>{
                            const {_id, amount,startDate,endDate, category, duration} = budget;
                            const type = 'budget';
                            return <BudgetItem
                                key={_id}
                                id={_id}
                                duration={duration}
                                amount={amount}
                                startdate={startDate}
                                enddate={endDate}
                                type={type}
                                category={category}
                                indicatorColor="green"
                                deleteItem={deleteBudget}
                                editItem={editBudget}
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

export default Budget;