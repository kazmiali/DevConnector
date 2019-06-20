const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

//Init Middleware, Body parser is included in experss

//So here its the middleware for body-parser
app.use(express.json({ extended: true }));

// Define Routes
//      endpointUrl ,address for the file containing route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// A simple get request on root
// app.get('/', (req, res) => res.json(`the Get request is working`));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	//  Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// use the port by heroku cli or 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
