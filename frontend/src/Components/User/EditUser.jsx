import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import Footer from "../Footer/Footer";

const EditUser = () => {
  const { SignUp, loading, setLoading, error, setError, message, user, getUser, updateUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    if (!user) {
      getUser();
    } else {
      // Set formData based on user data
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user, getUser]);

  useEffect(() => {
    if (message || error) {
      const msg = message || error;
      setFlashMessage(msg);

      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const [flashMessage, setFlashMessage] = useState(null);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }
      // Assuming user.id is available and represents the ID of the current user
      await updateUser(user._id, formData);
      setFlashMessage('User updated successfully');
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to update user');
    }
  };

  return (
    <>
      <Navbar />
      <SignupStyled className="container">
        {flashMessage && <p style={{ color: message ? 'green' : 'red' }}>{flashMessage}</p>}
        <h2>Edit User</h2>
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
          <button type="submit" className="btn btn-primary outline" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button><br />
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
  .form-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  input {
    width: 100%;
  }
  .form-group {
    margin-top: 2.5rem;
  }
  .btn {
    margin-top: 2.5rem;
  }
`;

export default EditUser;
