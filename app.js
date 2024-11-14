// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db_connection');
const authRoutes = require('./routes/user_routes');
const postRoutes = require('./routes/post_routes');
dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));