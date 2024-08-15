import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import Button from "../Button/Button";
import { plus } from '../../utils/Icons';

function IncomeForm({ currentIncome }) {
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
    });


    const { addIncome, updateIncome, setError, message, flashMessage, } = useGlobalContext();
    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentIncome) {
            updateIncome(currentIncome._id, inputState);
        } else {
            addIncome(inputState);
        }
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: ''
        });
    };

    useEffect(() => {
        if (currentIncome) {
            setInputState({
                title: currentIncome.title,
                amount: currentIncome.amount,
                date: new Date(currentIncome.date),
                category: currentIncome.category,
                description: currentIncome.description
            });
        }
    }, [currentIncome]);


    return (
        <>
        {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
        <IncomeFormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Income Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={amount}
                    name="amount"
                    placeholder="Income Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder="Add A Reference"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <button type="submit" className="btn btn-success">
                    {plus}&nbsp;&nbsp;{ (currentIncome ? 'Update' : 'Add')}
                </button>
            </div>
        </IncomeFormStyled>
        </>
    );
}

const IncomeFormStyled = styled.form`
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

export default IncomeForm;
