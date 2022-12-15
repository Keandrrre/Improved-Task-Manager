const draggableElement = document.querySelector("#draggableEl");

draggableElement.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", draggableElement.id);
});

for (const dropZone of document.querySelectorAll(".container-dropzone")) {
  // When draggable element is over a drop zone
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  });

  // When draggable element is dropped onto drop zone
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
  });
}
