// <----- Global Variables -----> //

// Html Elements
let taskEl1 = document.getElementById("taskEl1");
let taskEl2 = document.getElementById("taskEl2");
let taskEl3 = document.getElementById("taskEl3");
let addTaskBtn = document.getElementById("add-task");

// Arrays
let tasksToDo = loadArray1();
let tasksOnHold = loadArray2();
let tasksDone = loadArray3();
displayAll();

// <----- Manager Functions -----> //

// Add Task
addTaskBtn.addEventListener("click", createNewTask);
function createNewTask() {
  let taskDescription = prompt("Task Description: ");
  let taskHeader = prompt("Task Header");
  if (taskDescription.length > 0 && taskHeader.length > 0) {
    tasksToDo.splice(0, 0, newTask(taskDescription, taskHeader));
  } else {
    alert("Could not add new task.");
  }
  displayAll();
  saveArrays();
}

// <----- Drag And Drop -----> //

// Html Elements
const draggableTask = document.querySelectorAll(".task-dropbox");
const taskContainers = document.querySelectorAll(".taskbox");

// Drag Start
draggableTask.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  // Drag End
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    saveArrays();
  });
});

// Drag Over
taskContainers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

// Determine Position/Order of Drop
function getDragAfterElement(container, y) {
  const draggableTaskElements = [
    ...container.querySelectorAll(".task-dropbox:not(.dragging)"),
  ];

  return draggableTaskElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// <----- Helper Functions -----> //

// Save Task Arrays
function saveArrays() {
  // First
  tasksToDo = [];
  let contArray1 = [...taskEl1.querySelectorAll(".task-dropbox")];
  for (i = 0; i < contArray1.length; i++) {
    let header = contArray1[i].firstChild.firstChild.innerHTML;
    console.log(header);
    let description = contArray1[i].lastChild.innerHTML;
    tasksToDo.push(newTask(description, header));
  }
  localStorage.setItem("tasks-to-do", JSON.stringify(tasksToDo));
  // Second
  tasksOnHold = [];
  let contArray2 = [...taskEl2.querySelectorAll(".task-dropbox")];
  for (i = 0; i < contArray2.length; i++) {
    let header = contArray2[i].firstChild.firstChild.innerHTML;
    let description = contArray2[i].lastChild.innerHTML;
    tasksOnHold.push(newTask(description, header));
  }
  localStorage.setItem("tasks-on-hold", JSON.stringify(tasksOnHold));
  // Third
  tasksDone = [];
  let contArray3 = [...taskEl3.querySelectorAll(".task-dropbox")];
  for (i = 0; i < contArray3.length; i++) {
    let header = contArray3[i].firstChild.firstChild.innerHTML;
    let description = contArray3[i].lastChild.innerHTML;
    tasksDone.push(newTask(description, header));
  }
  localStorage.setItem("tasks-done", JSON.stringify(tasksDone));
}

// Load Tasks
function loadArray1() {
  let taskStr = localStorage.getItem("tasks-to-do");
  return JSON.parse(taskStr) ?? [];
}
function loadArray2() {
  let taskStr = localStorage.getItem("tasks-on-hold");
  return JSON.parse(taskStr) ?? [];
}
function loadArray3() {
  let taskStr = localStorage.getItem("tasks-done");
  return JSON.parse(taskStr) ?? [];
}

// Display Tasks
function displayAll() {
  // First Box
  taskEl1.innerHTML = "";
  for (i = 0; i < tasksToDo.length; i++) {
    taskEl1.appendChild(getTaskHTML(tasksToDo[i], i));
  }
  // Second Box
  taskEl2.innerHTML = "";
  for (i = 0; i < tasksOnHold.length; i++) {
    taskEl2.appendChild(getTaskHTML(tasksOnHold[i], i));
  }
  // Third Box
  taskEl3.innerHTML = "";
  for (i = 0; i < tasksDone.length; i++) {
    taskEl3.appendChild(getTaskHTML(tasksDone[i], i));
  }
}

// Get Task Html
function getTaskHTML(task, index) {
  // Create Header Text
  let headerText = document.createElement("span");
  headerText.innerHTML = task.taskHeader;
  headerText.className = "header-text";
  // Create Delete Button
  let delBtn = document.createElement("button");
  delBtn.innerHTML = "&times;";
  delBtn.dataset.index = index;
  delBtn.addEventListener("click", removeTask);
  // Create Header
  let taskHeader = document.createElement("div");
  taskHeader.appendChild(headerText);
  taskHeader.appendChild(delBtn);
  taskHeader.className = "task-header";
  // Create Span
  let taskDescription = document.createElement("div");
  taskDescription.className = "task-span";
  taskDescription.innerHTML = task.taskDescription;
  // Create Div
  let divEl = document.createElement("div");
  divEl.appendChild(taskHeader);
  divEl.appendChild(taskDescription);
  divEl.draggable = "true";
  divEl.className = "task-dropbox";
  // Return
  return divEl;
}

// Return objects of array
function newTask(description, header) {
  return {
    taskDescription: description,
    taskHeader: header,
  };
}

function removeTask(e) {
  // Get index of task to remove
  let taskIndex = +e.target.dataset.index;
  if (e.target.parentNode.parentNode.parentNode === taskEl1) {
    tasksToDo.splice(taskIndex, 1);
  } else if (e.target.parentNode.parentNode.parentNode === taskEl2) {
    tasksOnHold.splice(taskIndex, 1);
  } else {
    tasksDone.splice(taskIndex, 1);
  }
  displayAll();
  saveArrays();
}
