const express = require('express');
const connectDB = require('./config/db');
const enforce = require('express-sslify');
const compression = require('compression');
const path = require('path');

const app = express();

connectDB();

app.use(compression());
// Middleware for body-parser
app.use(express.json({ extended: true }));

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //  Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
