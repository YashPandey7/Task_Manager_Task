const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const taskRouter = require("./routes/task.routers");

const Mongo_URL = "mongodb://127.0.0.1:27017/task-manager-project";
const PORT = 8082;

mongoose.connect(Mongo_URL)
.then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("Error with connecting with DB", err);
})

app.use(express.json());
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
    console.log(`Backend is running on Port : ${PORT}`);
})