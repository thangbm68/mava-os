require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV, version: '1.0.0' }));

// Routes
app.use('/auth',          require('./modules/auth/auth.routes'));
app.use('/users',         require('./modules/users/users.routes'));
app.use('/departments',   require('./modules/departments/departments.routes'));
app.use('/tasks',         require('./modules/tasks/tasks.routes'));
app.use('/dashboard',     require('./modules/dashboard/dashboard.routes'));
app.use('/notifications', require('./modules/notifications/notifications.routes'));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route không tồn tại' }));

module.exports = app;
