import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import IncomeForm from "../Form/Form";
import IncomeItem from "../IncomeItem/incomeitem";

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome, updateIncome } = useGlobalContext();
    const [currentIncome, setCurrentIncome] = useState(null);

    useEffect(() => {
        getIncomes();
    });

    const editIncome = (id) => {
        const expenseToEdit = incomes.find(income => income._id === id);
        setCurrentIncome(expenseToEdit);
    };


    const handleFormSubmit = (incomeData) => {
        if (currentIncome) {
            updateExpense(currentIncome._id, incomeData);
            setCurrentIncome(null);
        }
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <IncomeForm currentIncome={currentIncome} onSubmit={handleFormSubmit} />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    type={type}
                                    date={date}
                                    category={category}
                                    indicatorColor="green"
                                    deleteItem={deleteIncome}
                                    editItem={editIncome} 
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
    .btn-secondary {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: #e0e0e0;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
            background-color: #d4d4d4;
        }
    }
`;

export default Income;
