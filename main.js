// Improved Task Manager

// Html Elements

// Global Variables
let tasks = loadTasks();

// Add New Task Button

document.getElementById("newTaskBtn").addEventListener("click", addNewTask);

function addNewTask() {
  let newTask = prompt("Task Description:");
  tasks.push(defineTaskStatus(newTask));
  saveTasks();
}

// Helper Functions

function defineTaskStatus(task) {
  return {
    description: task,
    status: notcomplete,
  };
}

function saveTasks() {
  localStorage.setITem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasksStr = localStorage.getItem("tasks");
  return JSON.parse(tasksStr) ?? [];
}
