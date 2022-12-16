// Add/Remove Tasks
function addTask() {
  let taskDescription = prompt;
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
