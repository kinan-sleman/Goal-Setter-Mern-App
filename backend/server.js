const express = require('express');
const colors = require('colors')
const cors = require("cors")
const path = require("path")

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.BASE_URI,
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
};

connectDB();

const app = express();

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
        )
    )
} else {
    app.get("/", (req,res) => res.send('Please set as production'))
}
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started On Port ${port}`))
