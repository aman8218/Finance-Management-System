import Navbar from "../Navbar/Navbar";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { MainLayout } from "../../styles/Layouts";
import styled from "styled-components";
import DashboardPage from "./DashboardPage";
import Expense from "../Expense/Expense";
import Income from "../Income/Income";
import Budget from "../Budget/Budget";
import Summary from "../summary/Summary";
import Footer from "../Footer/Footer";
// import './Dashboard.css'

export default function Dashboard()
{
    const {Login, loading,setLoading, error, setError, message} = useGlobalContext();
    const [active, setActive]=useState(1);



  const displayData = ()=>{
    switch(active){
      case 1:
        return <DashboardPage/>
      case 2:
        return <Summary/>
      case 3:
        return <Budget/>
      case 4:
        return <Income/>
      case 5:
        return <Expense/>
      default: 
        return <DashboardPage/>
    }
  }

    return(<>
      <Navbar/>
        <DashboardStyled className="component-con">
        <MainLayout>
        <Sidebar active={active} setActive={setActive} className="sidebar"/>
        <main>
              {displayData()}
        </main>

        </MainLayout>
        </DashboardStyled>
        </>
    )
}


const DashboardStyled = styled.div`
  height: 100%;
position: relative;
main{
  flex:1;
  // padding: 1rem;
  background-color: rgba(252, 246, 249, 0.78);
  box-sizing: border-box;
  box-shadow: 2px 2px 8px 4px black;
  border: 0.2px solid black;
  border-radius: 32px;
  overflow: auto;
  overflow-x: hidden;
  &:: -webkit-scroller{
  width: 0;
  }
}
 @media (max-width: 767px){
    height: 150%;
    .component-con{
      display: flex;
    }
   }
`;