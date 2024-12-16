import React from "react";
import { FaEdit } from "react-icons/fa";
import "./TaskTable.css";

function TaskTable({ tasks, onEditTask }) {
  const calculateDurationInHours = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours.toFixed(2);
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Title</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Time (hrs)</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task._id}>
            <td>{index + 1}</td>
            <td>{task.title}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.startTime}</td>
            <td>{task.endTime}</td>
            <td>{calculateDurationInHours(task.startTime, task.endTime)}</td>
            <td>
              <button
                className="btn btn-link"
                onClick={() => onEditTask(task)}
                title="Edit"
              >
                <FaEdit />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
