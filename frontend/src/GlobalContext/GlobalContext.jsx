import { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/"

const GlobalContext = createContext();


export const GlobalProvider = ({children})=>{

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null); 
    const [incomes, setIncomes] = useState([]); 
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [user, setUser] = useState(null);

    //Api Calls

    useEffect(() => {
      const checkTokenValidity = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            // Send a request to the backend to verify the token
            await axios.get(`${BASE_URL}auth/validate-token`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
          } catch (error) {
            localStorage.removeItem('token');
          }
        } 
      };
    
      checkTokenValidity();
    }, []);

    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}users/${userId}`, userData, config);
      setMessage('user updated.')
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to update user');
    }
  }

  const getBudgets = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${BASE_URL}budgets`, config);
        if (response.data) {
            setBudgets(response.data);
        }
    } catch (error) {
        setError('Failed to fetch budgets');
    } finally {
        setLoading(false);
    }
};
  const addBudget = async (budgetData) => {
    setLoading(true);
    try {
        const response = await axios.post(`${BASE_URL}budgets/add-budget`, budgetData, config);
        if (response.data) {
            setBudgets([...budgets, response.data]); // Add the new budget to the state
            setMessage('Budget added successfully');
        }
    } catch (error) {
        setError('Failed to add budget');
    } finally {
        setLoading(false);
    }
};
const updateBudget = async (id, updatedBudget) => {
  setLoading(true);
  try {
      const response = await axios.put(`${BASE_URL}budgets/${id}`, updatedBudget, config);
      if (response.data) {
          // Update the budget in the local state
          setBudgets(budgets.map(budget => budget._id === id ? response.data : budget));
          setMessage('Budget updated successfully');
      }
  } catch (error) {
      setError('Failed to update budget');
  } finally {
      setLoading(false);
  }
};

const deleteBudget = async (id) => {
  setLoading(true);
  try {
      await axios.delete(`${BASE_URL}budgets/${id}`, config);
      // Remove the budget from the local state
      setBudgets(budgets.filter(budget => budget._id !== id));
      setMessage('Budget deleted successfully');
  } catch (error) {
      setError('Failed to delete budget');
  } finally {
      setLoading(false);
  }
};

    // Add Income
  const addIncome = async (incomeData) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}incomes/add`, incomeData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage('Income added successfully'||response.data.msg);
      setIncomes(prevIncomes => [...prevIncomes, response.data]);
    } catch (error) {
      setError('Failed to add income');
    } finally {
      setLoading(false);
    }
  };

  //get incomes
  const getIncomes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}incomes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIncomes(response.data);
    } catch (error) {
      setError('Failed to fetch incomes');
    } finally {
      setLoading(false);
    }
  };

  //delete income
  const deleteIncome = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
     const response= await axios.delete(`${BASE_URL}incomes/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIncomes(prevIncomes => prevIncomes.filter(income => income._id !== id)); // Update the incomes state
      setMessage(response.data.msg || 'income deleted')
    } catch (error) {
      setError('Failed to delete income' || error.respnse.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) =>{
        totalIncome = totalIncome + income.amount
    })

    return totalIncome;
}

const updateIncome = async (id, updatedIncome) => {
  try {
    const token = localStorage.getItem('token'); // Assume the token is stored in localStorage
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,  // Include the JWT token for authentication
        'Content-Type': 'application/json',  // Specify that the data is JSON
      }
    };
    const response = await axios.put(`${BASE_URL}incomes/${id}`, updatedIncome, config);
    if (response.data) {
      getIncomes(); // Refresh the incomes list
    }
    setMessage(response.data.msg || 'Income updated successfully.');
  } catch (error) {
    setError(error.response?.data?.msg || 'Error updating income');
  }
};


// Add expense
const addExpense = async (expenseData) => {
  setLoading(true);
  setError(null);
  setMessage(''); // Clear any previous messages

  try {
    // Ensure expenseData has an amount property to compare
    if (totalBalance() >= expenseData.amount) {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}expenses/add`, expenseData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setExpenses(prevExpenses => [...prevExpenses, response.data]);
    } else {
      setMessage("Don't have enough balance. Please increase your budget.");
    }
  } catch (error) {
    setError('Failed to add expense');
  } finally {
    setLoading(false);
  }
};


  const getExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}expenses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setExpenses(response.data);
    } catch (error) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const totalExpense = () => {
    let totalIncome = 0;
    expenses.forEach((income) =>{
        totalIncome = totalIncome + income.amount
    })

    return totalIncome;
}

const totalBudget = () => {
  let totalIncome = 0;
  budgets.forEach((income) =>{
      totalIncome = totalIncome + income.amount
  })

  return totalIncome;
}
const deleteExpense = async (id) => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${BASE_URL}expenses/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id)); 
  } catch (error) {
    setError('Failed to delete expense');
  } finally {
    setLoading(false);
  }
};

const updateExpense = async (id, updatedExpense) => {
  try {
    const token = localStorage.getItem('token'); // Assume the token is stored in localStorage
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,  // Include the JWT token for authentication
            'Content-Type': 'application/json',  // Specify that the data is JSON
        }
    };
    const response = await axios.put(`${BASE_URL}expenses/${id}`, updatedExpense, config);
      if (response.data) {
          getExpenses(); // Refresh the expenses list
      }
      setMessage(response.data.msg || 'expense updated.')
  } catch (error) {
      setError(error.response.data.msg||'error updating expense')
  }
};


  //Sign up
  const SignUp = async (formData, onSuccess) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage(response.data.msg || "Sign up successful! Redirecting to dashboard..."); 
      localStorage.setItem('token', response.data.token); // Save the token
      window.localStorage.setItem("isLoggedIn", true)
      if(onSuccess) onSuccess(); // Use navigate to redirect
      setError(null)
    } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
            setError(error.response.data.msg);
            setMessage(null);
          } else {
            setError('An unexpected error occurred');
          }
    } finally {
      setLoading(false);
    }
  };

  //Login 
  const Login = async (formData, onSuccess) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`${BASE_URL}auth/login`, formData);
      setMessage(response.data.msg || "Login successful! Redirecting to dashboard...");
      localStorage.setItem('token', response.data.token); // Save the token
      window.localStorage.setItem("isLoggedIn", true)
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
        setMessage(null);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  //Logout

  const Logout = (onSuccess) => {
    try{
      localStorage.removeItem('token');
      window.localStorage.removeItem("isLoggedIn");
      setMessage("logout successful")
      if (onSuccess) onSuccess();
    }
    catch(error)
    {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
        setMessage(null);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  // Forgot Password
  const ForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`${BASE_URL}auth/request-password-reset`, { email });
      setMessage(response.data.msg || "Password reset link sent to your email. Please check your inbox and spam folder");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const ResetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    setMessage(null);
  
    try {
      const response = await axios.post(`${BASE_URL}auth/reset-password/${token}`, { newPassword });
      setMessage(response.data.msg || "Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page after 5 seconds
      }, 2000); // Redirect after 5 seconds
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
        setMessage(null);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );


  const totalBalance = ()=>{
    return totalBudget() - totalExpense()
}

  const budgetTrack = ()=>{
      const totalExp = totalExpense();
      const budgetUsed = (totalExp/totalBudget())*100;
      if(budgetUsed>=80)
      {
        setMessage('"Alert: You have used 80% or more of your budget."')
      }
      else if(budgetUsed>=100)
      {
        setMessage("Alert: You have exceeded your budget.")
      }
      else{
        setMessage("You are within your budget")
      }
  }

  //Flash message
  const [flashMessage, setFlashMessage] = useState(null);

   useEffect(() => {
    if (message || error) {
      const msg = message || error;
      setFlashMessage(msg);

      const timer = setTimeout(() => {
        setFlashMessage(null);
        setMessage(''); 
        setError(''); 
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [message, error]);
  

    return (
        <GlobalContext.Provider value={{loading, SignUp, error, message, setError, setLoading, Login,Logout,
          ForgotPassword,
          ResetPassword,
          addIncome,
          incomes,
          getIncomes,
          deleteIncome,
          totalIncome,
          addExpense,
          getExpenses,
          expenses,
          totalExpense,
          deleteExpense,
          flashMessage,
          updateExpense,
          updateIncome,
          addBudget,
          updateBudget,
          deleteBudget,
          getBudgets,
          budgets,
          totalBalance,
          totalBudget,
          budgetTrack,
          user,
          getUser,
          updateUser
        }}>
            {children}
        </GlobalContext.Provider>
    )


}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext);
}