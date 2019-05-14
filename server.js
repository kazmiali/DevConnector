const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

//Init Middleware, Body parser is included in experss
//So here its the middleware for body-parser

app.use(express.json({ extended: true }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => res.json(`the Get request is working`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
