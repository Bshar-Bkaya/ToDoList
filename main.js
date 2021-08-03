// [1] Add tasks to locale storage         ---> finished
// [2] Add Button to delete all tasks      ---> finished
// [3] Add Button to completed all tasks   ---> finished

// setting up variables
let theInput = document.querySelector(".add-task .input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let all = document.querySelector(".all");
let i = Number(localStorage.getItem("i"));

//Focus on input field
window.onload = function () {
  theInput.focus();
};

// function Add Task On Click Button Plus and Task Not Found
function creat() {
  if (theInput.value === "") {
    theInput.focus();
    Swal.fire({
      title: "error",
      text: "The input is empty!!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    // Check if span(no tasks messeage) exist
    if (tasksContainer.children[0].className == "no-tasks") {
      // Remove no tasks messeage
      document.querySelector(".no-tasks").remove();
      all.classList.add("visibil");
    }

    // Creat main span
    let mainSpan = document.createElement("span");

    // Add class task-box to main span
    mainSpan.className = "task-box";

    // Creat textnode
    let text = document.createTextNode(theInput.value);

    // Add the text to main span
    mainSpan.appendChild(text);

    // Creat delete Button
    let deleteElement = document.createElement("span");

    // Add class delete to Button deleteElement
    deleteElement.classList.add("delete");

    // Add class (i) to delete button
    deleteElement.classList.add(i);
    i++;
    // Add last i to localstorage
    localStorage.setItem("i", i);
    // Creat delete text
    let deleteText = document.createTextNode("Delete");

    // Add deleteText to delete Button
    deleteElement.appendChild(deleteText);

    // Add Text To LocalStorage
    localStorage.setItem(deleteElement.className, theInput.value);

    // Add delete Button to main span
    mainSpan.appendChild(deleteElement);

    // Add main span to container
    tasksContainer.appendChild(mainSpan);

    // Empty the input
    theInput.value = "";

    //Focus on field
    theInput.focus();
    calcolaterTasks();
    mainSpan.title = "Click to finished";
    deleteElement.title = "Delete task";
  }
}

// Add New Task
theAddButton.onclick = () => {
  let p = false;
  // check If Task Found Befor Creat It
  for (let i = 0; i < tasksContainer.children.length; i++) {
    if (tasksContainer.children[i].firstChild.textContent == theInput.value) {
      p = true;
      theInput.focus();
      theInput.value = "";
      Swal.fire({
        title: "warning",
        text: "This Task Is Found",
        icon: "error",
        confirmButtonText: "OK",
      });
      break;
    }
  }
  if (p == false) creat();
};

document.addEventListener("click", (e) => {
  //(1)Delete Task
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.remove();

    // Delete Task From LocalStorage
    localStorage.removeItem(e.target.className);

    // check if no tasks
    if (tasksContainer.childElementCount == 0) {
      creatNoTasks();
      all.classList.remove("visibil");
    }
  }

  //(2) Finish Task
  else if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }

  // Add class finished to all tasks
  else if (e.target.className == "complet-all") {
    for (let i = 0; i < tasksContainer.childElementCount; i++) {
      tasksContainer.children[i].classList.add("finished");
    }
  }

  //(3) Delete All Tasks
  else if (e.target.className == "delete-all") {
    // Show confirm massage
    Swal.fire({
      title: "Are you sure?",
      text: "You will Delete All Your Tasks!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        [...tasksContainer.children].forEach((element) => {
          element.remove();
        });
        localStorage.clear();
        creatNoTasks();
        all.classList.remove("visibil");
        theInput.focus();
        Swal.fire("Deleted!", "Your Tasks has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Tasks is safe :)", "error");
      }
    });
  }
  calcolaterTasks();
});

// Function To Creat No Tasks Message
function creatNoTasks() {
  // Creat message span element
  let messageSpan = document.createElement("span");
  // Creat text message
  let messageNoTask = document.createTextNode("No Tasks To Show ");
  // Add the text message to span message
  messageSpan.appendChild(messageNoTask);
  // Add class no-tasks to span message
  messageSpan.className = "no-tasks";
  // Add span message to tasks container
  tasksContainer.appendChild(messageSpan);
}

// function to calcolater all tasks
function calcolaterTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

// Function to creat old tasks
(function creatOldTasks() {
  if (localStorage.length > 1) {
    // Check if span(no tasks messeage) exist
    if (tasksContainer.children[0].className == "no-tasks") {
      // Remove no tasks messeage
      document.querySelector(".no-tasks").remove();
      all.classList.add("visibil");
    }
    // For to print the old tasks
    for (let [key, value] of Object.entries(localStorage)) {
      if (key == "i") continue;
      // Creat main span
      let mainSpan = document.createElement("span");

      // Add class task-box to main span
      mainSpan.className = "task-box";

      // Creat textnode
      let text = document.createTextNode(value);

      // Add the text to main span
      mainSpan.appendChild(text);

      // Creat delete Button
      let deleteElement = document.createElement("span");

      // Creat delete text
      let deleteText = document.createTextNode("Delete");

      // Add deleteText to delete Button
      deleteElement.appendChild(deleteText);

      // Add class delete to Button deleteElement
      deleteElement.className = key;

      // Add delete Button to main span
      mainSpan.appendChild(deleteElement);

      // Add main span to container
      tasksContainer.appendChild(mainSpan);

      // Focus on field
      theInput.focus();
      calcolaterTasks();
      mainSpan.title = "Click to finished";
      deleteElement.title = "Delete task";
    }
  } else console.log("Not found items");
})();
