import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import Footer from "../Footer/Footer";


const ForgotPassword = () => {
  const {ForgotPassword, loading,setLoading, error, setError, message,flashMessage} = useGlobalContext();
  const [email, setEmail] = useState("");



  const onChange = async e => {
    e.preventDefault();
    setEmail(e.target.value)
    setError(null)
    setLoading(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ForgotPassword(email);
    setEmail('')
  };

  return (
    <>
    <Navbar/>
    <ForgotStyled className="container">
      {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
      <h2>Forgot password</h2>
      <form onSubmit={handleSubmit} className="form-con">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary outline" disabled={loading}> {loading ? 'Sending email...' : 'Send email'}</button><br />
      </form>
    </ForgotStyled>
    <Footer/>
    </>
  );
};

const ForgotStyled = styled.div`
    padding: 1rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .form-con
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    input{
    width: 100%;
    }
    .form-group
    {
    margin-top: 2.5rem;
    }
    .btn{
    margin-top: 1rem;
    }
`;

export default ForgotPassword;
