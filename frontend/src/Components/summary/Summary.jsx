import React from "react"
import { InnerLayout } from "../../styles/Layouts"
import { useGlobalContext } from "../../GlobalContext/GlobalContext"
import { useEffect, useState } from "react"
import { dollar } from "../../utils/Icons"
import styled from "styled-components"
import './Summary.css'

export default function Summary() {
    const { totalExpense, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses, totalBudget, getBudgets, budgetTrack, message, error, flashMessage } = useGlobalContext()

    useEffect(() => {
        getExpenses()
        getIncomes()
        getBudgets()
        budgetTrack()
    }, [])



    return (
        <>
            <SummaryStyled>
                <InnerLayout>
                    <h1>Summary</h1>
                    {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
                    <div className="stats-con">
                        <div className="amount-con">
                            <div className="budget">
                                <h2>Total Budget</h2>
                                <p>
                                    {dollar} {totalBudget()}
                                </p>
                            </div>
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expenses</h2>
                                <p>
                                    {dollar} {totalExpense()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                </InnerLayout>
            </SummaryStyled>
        </>
    )
}

const SummaryStyled = styled.div`
    .amount-con{
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 50%;
    }
    .income, .expense, .balance, .budget{
     border: 1px solid black;
     box-shadow: 2px 2px 8px 4px black;
     border-radius: 1rem;
     text-align: center;
        width: 14rem;
    }
`;