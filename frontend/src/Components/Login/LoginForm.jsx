import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";


const LoginForm = () => {
  const {Login, loading,setLoading, error, setError, message, flashMessage} = useGlobalContext();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); 

  const onChange = async e => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null)
    setLoading(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(formData, () => navigate('/dashboard'));
    setFormData({
      email: "",
      password: ""
    })
  };

  return (
    <>
    <Navbar/>
    <LoginStyled className="container">
      {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
      <h2>Log in</h2>
      <form onSubmit={handleSubmit} className="form-con">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <Link to="/forgotpassword">Forgot your password?</Link>
        <button type="submit" className="btn btn-primary outline" disabled={loading}> {loading ? 'Logging in...' : 'Log in'}</button><br />
        <p>Don't have an account ? <Link to="/signup">Create account</Link></p>
      </form>
    </LoginStyled>
    <Footer/>
    </>
  );
};

const LoginStyled = styled.div`
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

export default LoginForm;
