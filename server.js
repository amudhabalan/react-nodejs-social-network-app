const express = require('express');
const app = express();

app.listen(5000, () => console.log('Running'));
app.use(express.json({ extended: false }));

// Database Connection
const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => res.send('API Running'));
// Routing
app.use('/api/users', require('./router/api/users'));
app.use('/api/profiles', require('./router/api/profiles'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/posts', require('./router/api/posts'));
