import styled from "styled-components"
import Navbar from "../Navbar/Navbar"
import home from './../../img/home.png'
import { Link } from "react-router-dom"
import './Home.css'
import Footer from "../Footer/Footer"

export default function Home()
{
    return(
        <>
        <Navbar/>
        <HomeStyled className="home-con">
            <div className="content">
            <h1>Welcome to Finance Management App</h1>
            <br />
                <img src={home} className="finance-img"/>
            </div>
            <div className="text-con">
                <p>Hi, welcome to Finance Management Web Application here you will be able to manage your finances like incomes, expenses, budget and total balanace.
                    Here you will also get the graphical representation or chart information of expenses and incomes.
                </p><br />
                <h3>So what you are waiting for! sign up fast</h3><br /><br />
                <Link  to="/signup" className="sign-btn">Sign Up</Link>
            </div>
        </HomeStyled>
        <Footer/>
        </>
    )
}

const HomeStyled = styled.div`
    display: flex;
    margin-top: 1rem;
    width: 100%;
    justify-content: center
    padding: 0.5rem;
    .finance-img{
    border-radius: 0.5rem;
    }
    h1
    {
    font-size: 2.5rem;
    }
    .content{
    width: 100%;
    padding: 0.5rem;
    }
    .finance-img
    {
    width: 85%;
    }
    .text-con{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    }
    .sign-btn
    {
    background-color: #0b5ed7;
    border-radius: .5rem;
    width: 7rem;
    height: 3rem;
    text-align: center;
    padding-top: 0.6rem;
    color: white;
    text-decoration: none;
    }
    .sign-btn:hover{
        border: 2px solid #0b5ed7;
        background-color: white;
        color: #0b5ed7;
    }
    p{
        text-align: justify;
        margin-right: 0.5rem;
    }
`;