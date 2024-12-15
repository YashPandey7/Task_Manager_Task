const Task = require("../models/task.models");

const findTask = async() => {
    const task = await Task.find({});
    return task;
}

const createsTask = async(req, res) => {
    const task = new Task(body);
    const savedTask = await Task.save();
    return savedTask;
}

const updates = async(id, body) => {
    const updatedTask = await Task.findByIdAndUpdate(id, body, {
        new : true,
    });
    return updatedTask;
}

const deletes = async(id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
}

module.exports = {findTask, createsTask, updates, deletes};