import config from "../config";
const environment = process.env.NODE_ENV || "development";
const { baseURL } = config[environment] || "http://127.0.0.1:5000/";

export const fetchAllTasks = async () => {
  try {
    const response = await fetch(`${baseURL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

export const fetchSingleTask = async (taskId) => {
  try {
    const response = await fetch(`${baseURL}/tasks/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch task ${taskId}: ${error.message}`);
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${baseURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    return response.json();
  } catch (error) {
    throw new Error(`Failed to create task ${taskData}: ${error.message}`);
  }
};

export const deleteSingleTask = async (taskId) => {
  try {
    const response = await fetch(`${baseURL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    throw new Error(`Failed to delete task ${taskId}: ${error.message}`);
  }
};

export const updateSingleTask = async (taskId, taskData) => {
  try {
    const response = await fetch(`${baseURL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    return response.json();
  } catch (error) {
    throw new Error(`Failed to update task ${taskId}: ${error.message}`);
  }
};
