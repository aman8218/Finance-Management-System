import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";


const SignupForm = () => {
  const {SignUp, loading,setLoading,message,setError,flashMessage} = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
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
    await SignUp(formData, () => navigate('/dashboard'));
    setFormData({
      name: "",
      email: "",
      password: ""
    })
  };

  return (
    <>
    <Navbar/>
    <SignupStyled className="container">
      {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form-con">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary outline" disabled={loading}> {loading ? 'Signing Up...' : 'Sign Up'}</button><br />
        <p>Already have an account ? <Link to="/login">Login</Link></p>
      </form>
    </SignupStyled>
    <Footer/>
    </>
  );
};

const SignupStyled = styled.div`
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
    margin-top: 2.5rem;
    }
`;

export default SignupForm;
