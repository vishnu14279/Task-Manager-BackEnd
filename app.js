const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require("./Routes/auth");
const taskRoutes = require("./Routes/task");
const userRoutes = require("./Routes/userRoute");
const app = express();

app.use(cors());

app.use(helmet());


app.use(express.json({
    limit: '15kb'
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    next(req, res, next);
});

module.exports = app;