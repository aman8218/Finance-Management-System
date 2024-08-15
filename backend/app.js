const express = require('express');
const connectDB = require('./config/db')
require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT || 5000;

const app = express();

// Connect Database

app.listen(PORT, ()=>{
    console.log("server is listening to port", PORT);
    connectDB();
})

// Init Middleware
app.use(express.json());
app.use(cors())

app.get("/", (req, res)=>{
    res.send("This is home.");
})

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/incomes', require('./routes/incomeRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));

// module.exports = app;
