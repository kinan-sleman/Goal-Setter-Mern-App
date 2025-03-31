const express = require('express'); // which is an backend web application
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config(); // which is an environment variables
const port = process.env.PORT || 5000;

// Initialize Express
const app = express();

// Support send data in body
app.use(express.json())
app.use(express.urlencoded())

//  Goals
app.use('/api/goals', require('./routes/goalRoutes'));

// Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => console.log(`Server Started On Port ${port}`))
