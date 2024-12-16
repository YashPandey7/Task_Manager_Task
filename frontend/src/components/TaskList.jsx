import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import config from "../config";
import TaskTable from "./TaskTable";

function TaskList() {
  const [task, setTask] = useState({
    title: "",
    priority: 1,
    status: "Pending",
    startTime: "",
    endTime: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const getTask = async() => {
    try {
      const res = await axios.get(`${config.endpoint}/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Error while fetching the data of Tasks: ", error);
    }
  
  }

  useEffect(() => {
    getTask();
  }, [])


  const saveTask = async (e) => {
    e.preventDefault();
    console.log("Task saved:", task);

    try {
      const response = await axios.post(`${config.endpoint}/tasks/`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Task successfully saved:", response.data);

      
      const modalElement = document.getElementById('taskModal');
      const modal = new window.bootstrap.Modal(modalElement);
      modal.hide();

      setTask({
        title: "",
        priority: 1,
        status: "Pending",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <>
      <Header />
      <h1>Task list</h1>
      <br/>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#taskModal"
      >
        + Add task
      </button>
      <button className="btn btn-danger ms-2">Delete selected</button>

      {/* Modal */}
      <div
        className="modal fade"
        id="taskModal"
        tabIndex="-1"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={saveTask}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="taskModalLabel">
                  Add new task
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Book travel tickets"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    placeholder="4"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="statusToggle"
                      checked={task.status === "Finished"}
                      onChange={(e) =>
                        setTask({
                          ...task,
                          status: e.target.checked ? "Finished" : "Pending",
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="statusToggle">
                      {task.status}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startTime"
                      value={task.startTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="endTime"
                      value={task.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add task
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <br/><br/>

      <div>
        <TaskTable/>
      </div>
    </>
  );
}

export default TaskList;
