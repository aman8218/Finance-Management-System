# **Finance Management System**

A comprehensive Finance Management System built using Node.js, Express.js, React.js, and MongoDB. This application helps users manage their finances by tracking expenses, setting budgets, monitoring adherence to budgets, and generating detailed financial reports.

## **Features**

- **User Authentication**: Secure user registration and login using JWT.
- **Expense Tracking**: Add, update, delete, and view expenses with categories.
- **Budget Management**: Set monthly or yearly budgets, track adherence, and receive alerts when nearing budget limits.
- **Reporting**: Generate reports to analyze financial data over various periods.
- **Responsive Design**: User-friendly interface optimized for all devices.

## **Tech Stack**

- **Frontend**: React.js, styled-components, React DatePicker
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
<!-- - **Deployment**: (Optional) Mention where you’ve deployed the project if applicable (e.g., Vercel, Heroku) -->

## **Getting Started**

### **Prerequisites**

- Node.js v21.6.2
- MongoDB 
- (Optional) Git for version control

### **Installation**

1. **Clone the repository:**

    ```bash
    git clone https://github.com/aman8218/Finance-Management-System.git
    cd Finance-Management-System
    ```

2. **Install dependencies for the backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Install dependencies for the frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

4. **Run the backend server:**

    ```bash
    cd backend
    node app.js
    ```

6. **Run the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

7. **Access the application:**

    Open your browser and go to `http://localhost:5173/`.

## **API Endpoints**

### **Authentication**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### **Expense Management**

- `POST /api/expenses` - Add a new expense
- `GET /api/expenses` - Get all expenses
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

### **Budget Management**

- `POST /api/budgets` - Set a new budget
- `GET /api/budgets` - Get all budgets
- `PUT /api/budgets/:id` - Update a budget
- `DELETE /api/budgets/:id` - Delete a budget

## **Contributing**

Contributions, issues, and feature requests are welcome! Feel free to check issues page https://github.com/aman8218/Finance-Management-System.git if you want to contribute.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**

- **Name**: Aman
- **Email**: ak5654707@gmail.com
- **GitHub**: https://github.com/aman8218/