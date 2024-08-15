import React, { useEffect, useState } from "react";
import styled from "styled-components";
import avatar from '../../img/avatar.png';
import { menuItems } from "../../utils/menuItems";
import { dollar, edit, signout } from "../../utils/Icons";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";

function Sidebar({ active, setActive }) {
    const { user, getUser } = useGlobalContext();
    const [username, setUserName] = useState('');
    useEffect(() => {
        // Fetch user data when component mounts
        if (!user) {
            getUser();
        }
        else {
            setUserName(user.name);
        }
    }, [getUser]);

    const { Logout, totalBalance } = useGlobalContext();

    const handleLogout = () => {
        Logout(() => {
            <Navigate to="/login" />
        });
    };

    return (
        <>
            <SidebarStyled className="sidebar-con">
                <div className="user-con">
                    <img src={avatar} alt="" />
                    <div className="text">
                        <h2>{username}</h2>
                        <p>{dollar} {totalBalance()}</p>
                        <Link to="/edit-user-info" className="edit">{edit} edit</Link>
                    </div>
                </div>
                <ul className="menu-items" >
                    {menuItems.map((item) => {
                        return <li key={item.id} onClick={() => { setActive(item.id) }} className={active === item.id ? 'active' : ''}>
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    })}
                </ul>
                <div className="bottom-nav">
                    <li >
                        <button onClick={handleLogout} className="btn">{signout} Sign Out</button>
                    </li>
                </div>
            </SidebarStyled>
        </>
    )
}

const SidebarStyled = styled.nav`
 padding: 1rem ;
 padding-top: 2rem;
 margin-top: 1rem;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px 4px black;
 width: 20%;
 height: 90%;
 background: rgba(252, 246, 249, 0.78);
 border: 3px solid #ffffff;
 background-filter: blur (4.5px);
 border-radius: 32px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 gap: 2rem;
 .user-con{
 height: 100px;
 display: flex;
 align-items: center;
 gap: 1rem;

 img{
 width: 5rem;
 height: 5rem;
 border-radius: 50%;
 object-fit: cover;
 background-color: #fcf6f9;
 border: 2px solid #ffffff;
 padding: .2rem;
 box-shadow: 0px 1px 17px rgba(0,0,0, 0.96);

 }
 }
 h2{
 color: rgba(34, 34, 96, 1);
 }
 p{
  color: rgba(34, 34, 96, .6);
 }

    .menu-items{
    flex: 1;
    display: flex;
    flex-direction: column;
   margin-right: 2rem;
    li{
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all .4s ease in out;
    color: rgba(34, 34, 96, .6);
    position: relative;
    i{
    transition: all .4s ease in out;
    color: rgba(34, 34, 96, .6);
    font-size: 1.4rem;
    }
    }
    }
    .active{
    color: rgba(34, 34, 96, 1) !important;
    i{
    color: rgba(34, 34, 96, 1) !important;
    }
    &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #222260;
    border-radius: 0 10px 10px 0;
    }
    }
    .bottom-nav
    {
        color: rgba(34, 34, 96, 1) !important;
        list-style: none;
    }
    .edit{
        text-decoration: none;
        color: rgba(34, 34, 96, 1);
        font-weight: bold;
    }
    .btn{
        font-weight: bold;
        border: none;
        font-size: 1rem;
    }
    @media (max-width: 767px)
    {
     height: 40%;
     width: 100%;
    }
     @media (min-width: 768px) and (max-width: 1180px)
     {
        width: 30%;
     }
 `;

export default Sidebar;