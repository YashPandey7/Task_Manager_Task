const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const taskRouter = require("./routes/task.routers");
const userRouter = require("./routes/user.routers");
const cors = require("cors");
require('dotenv').config();

// const Mongo_URL = "mongodb://127.0.0.1:27017/task-manager-project";
// const PORT = 8082;

mongoose.connect(process.env.Mongo_URL)
.then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("Error with connecting with DB", err);
})
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(process.env.PORT, () => {
    console.log(`Backend is running on Port : ${process.env.PORT}`);
})