import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { plus } from '../../utils/Icons';

function BudgetForm({ currentBudget }) {
    const [inputState, setInputState] = useState({
        amount: '',
        startDate: '',
        endDate: '',
        category: '',
        duration: ''
    });

    const { addBudget, updateBudget, error, setError, loading,message, flashMessage } = useGlobalContext();
    const {  amount, startDate,endDate, category, duration } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentBudget) {
            updateBudget(currentBudget._id, inputState);
        } else {
            addBudget(inputState);
        }
        setInputState({
            amount: '',
            startDate: '',
            endDate: '',
            category: '',
            duration: ''
        });
    };

    useEffect(() => {
        if (currentBudget) {
            setInputState({
                amount: currentBudget.amount,
                startDate: new Date(currentBudget.startDate),
                endDate: new Date(currentBudget.endDate),
                category: currentBudget.category,
                duration: currentBudget.duration
            });
        }
    }, [currentBudget]);

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Start Date"
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(startDate) => setInputState({ ...inputState, startDate })}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="End Date"
                    selected={endDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(endDate) => setInputState({ ...inputState, endDate })}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={duration}
                    name="duration"
                    id="duration"
                    onChange={handleInput('duration')}
                >
                    <option value="" disabled>Duration</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={category}
                    placeholder="Add A Category Reference to Budget"
                    id="category"
                    cols="30"
                    rows="4"
                    onChange={handleInput('category')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <button type="submit" className="btn btn-success">
                    {plus}&nbsp;&nbsp;{loading ? 'Processing...' : (currentBudget ? 'Update' : 'Add')}
                </button>
            </div>
        </ExpenseFormStyled>
    );
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        border: 1px solid black;
        border-radius: 6px;
        input {
            width: 100%;
        }
    }
    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn {
        button {
            width: 10rem;
            height: 4rem;
            border-radius: 2rem;
            font-size: 1.3rem;
            text-align: center;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                border: 2px solid green;
                background-color: white;
                color: green;
            }
        }
    }
`;

export default BudgetForm;
