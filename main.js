// Improved Task Manager / Kanban Board JS

// Global Elements
let tasks = loadTasks();

// Add/Remove Tasks
function addTask() {
  let taskDescriptionSimple = prompt("Enter Task Name / Header");
  let taskDescriptionDetailed = prompt();
  tasks.push(newTask(taskDescriptionSimple, taskDescriptionDetailed));
}

// Drag and drop API
const draggableElement = document.querySelector("#task");

draggableElement.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", draggableElement.id);
});

for (const dropZone of document.querySelectorAll(".container-dropzone")) {
  // When draggable element is over a drop zone
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  });

  // When draggable element is no longer over drop zone
  dropZone.addEventListener("dragleave", (e) => {
    dropZone.classList.remove("drop-zone--over");
  });

  // When draggable element is dropped onto drop zone
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    const droppedElementId = e.dataTransfer.getData("text/plain");
    const droppedElement = document.getElementById(droppedElementId);

    dropZone.appendChild(droppedElement);
    dropZone.classList.remove("drop-zone--over");
  });
}

// Helper Functions

// Return task object
function newTask(taskDescriptionSimple, taskDescriptionDetailed) {
  return {
    taskHeader: taskDescriptionSimple,
    taskDescription: taskDescriptionDetailed,
  };
}

// Save tasks array to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks array from local storage
function loadTasks() {
  let tasksStr = localStorage.getItem("tasks");
  return JSON.parse(tasksStr) ?? [];
}

// Create tasks HTML using JS
function getTasksHTML(taskDescriptionSimple, taskDescriptionDetailed) {
  // Collapsable button element
  let collapsableBtnEl = document.createElement("collapsableBtn");
  collapsableBtnEl.type = "button";
  collapsableBtnEl.class = "collapsable";
  collapsableBtnEl.innerHTML = taskDescriptionSimple;

  // Drop box description
  let dropBoxDescriptionEl = document.createElement("dropBoxP");
  dropBoxDescriptionEl.innerHTML = taskDescriptionDetailed;

  // Add description to drop box div Element
  let dropBoxDivEl = document.createElement("dropBoxDiv");
  dropBoxDivEl.appendChild("dropBoxP");
}
