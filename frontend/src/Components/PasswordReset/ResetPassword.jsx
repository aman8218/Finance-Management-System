// ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ResetPassword = () => {
  const { ResetPassword, loading, message, error, setError, flashMessage } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    ResetPassword(token, password);
  };

  return (
    <>
      <Navbar />
      <ResetStyled>
        <div className="form-container">
          <h2>Reset Password</h2>
          {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
          <form onSubmit={handleSubmit} className="form-con">
            <div className="form-group">
              <label htmlFor="password">New Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary outline" disabled={loading}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </ResetStyled>
      <Footer/>
    </>
  );
};

const ResetStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;

  .form-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
  }

  .form-con {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .form-group {
    margin-top: 1.5rem;
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .btn {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn:disabled {
    background-color: #ccc;
  }
`;

export default ResetPassword;
