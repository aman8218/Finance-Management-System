import React from "react";
import styled from "styled-components";
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, edit } from "../../utils/Icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";
import './BudgetItem.css'

export default function BudgetItem({
    id,
    amount,
    startdate,
    enddate,
    category,
    duration,
    deleteItem,
    indicatorColor,
    type,
    editItem
})
{

  

    return(
        <IncomeItemStyled indicator={indicatorColor} className="comp-con">
            <div className="icon">
                {dollar}
            </div>
            <div className="content">
                 <h5>{duration}-Budget</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar}{amount}</p>
                        <p>{calender}{dateFormat(startdate)}-</p>
                        <p>{calender}{dateFormat(enddate)}</p>
                        {/* <p>{comment}{category}</p> */}
                    </div>
                    <div className="btn-con">
                    <p>{comment}{category}</p>
                        <Button
                        icon={trash}
                        bpad={'1rem'}
                        bRad={'50%'}
                        bg={'red'}
                        color={'white'}
                        iColor={'white'}
                        hColor={'green'}
                        onClick={()=> deleteItem(id)}
                        />
                        <Button
                        icon={edit}
                        bpad={'1rem'}
                        bRad={'50%'}
                        bg={'black'}
                        color={'white'}
                        iColor={'white'}
                        hColor={'green'}
                        onClick={()=> editItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    width: 8rem;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px black;
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }
        
        .btn-con{
        margin-left: 3rem; 
        display: flex;
        gap: 2rem;
        }

        .inner-content{
            display: flex;
            justify-content: left;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;