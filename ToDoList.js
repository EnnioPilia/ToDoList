class Task {
  constructor(name) {
    this.name = name;
    this.done = false;
  }
}

class ListTask {
  constructor() {
    this.tasks = [];
    this.tasksDiv = document.querySelector(".tasksDiv");
    this.input = document.getElementById("input");
    this.loadTasksFromLocalStorage();
  }

  addTask() {
    const taskText = this.input.value.trim();
    if (taskText === "") {
      alert("Veuillez saisir une tâche valide.");
      return;
    }

    const divBtn = document.getElementById('divBtn');
    if (divBtn.classList.contains('d-none')) {
      divBtn.classList.remove('d-none');
      divBtn.classList.add('d-flex');
    }

    const userTask = new Task(taskText);
    this.tasks.push(userTask);
    this.saveTasksToLocalStorage();
    this.displayArray();
  }

  displayArray() {
    this.tasksDiv.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const newTask = document.createElement("li");
      newTask.className = "list-group-item d-flex justify-content-between align-items-center";

      const leftPart = document.createElement("div");
      leftPart.className = "d-flex align-items-center gap-2";

      const checkbox = document.createElement("div");
      checkbox.className = "custom-checkbox";
      checkbox.style.width = "20px";
      checkbox.style.height = "20px";
      checkbox.style.border = "1px solid #000"; 
      checkbox.style.borderRadius = "50%";
      checkbox.style.position = "relative";
      checkbox.style.cursor = "pointer";
      checkbox.style.transition = "background-color 0.3s, border-color 0.3s";

      if (task.done) {
        checkbox.style.backgroundColor = "#28a745"; 
        checkbox.style.borderColor = "#28a745"; 
      }

      if (task.done) {
        const checkmark = document.createElement("div");
        checkmark.style.position = "absolute";

        checkbox.appendChild(checkmark);
      }

      checkbox.addEventListener("click", () => {
        task.done = !task.done;

        if (task.done) {
          checkbox.style.backgroundColor = "#28a745"; 
          checkbox.style.borderColor = "#28a745"; 
          taskName.classList.add("completed");


          const checkmark = document.createElement("div");
          checkmark.style.position = "absolute";
;
          checkbox.appendChild(checkmark);
        } else {
          checkbox.style.backgroundColor = ""; 
          checkbox.style.borderColor = ""; 
          checkbox.innerHTML = "";
          taskName.classList.remove("completed");

        }

        this.saveTasksToLocalStorage();
      });

      const taskName = document.createElement("span");
      taskName.innerText = task.name;
      if (task.done) taskName.classList.add("completed");

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-sm btn-danger";
      deleteBtn.innerText = "🗑";

      deleteBtn.addEventListener("click", () => {
        this.tasks.splice(index, 1);
        this.displayArray();
        this.saveTasksToLocalStorage();
      });

      leftPart.appendChild(checkbox);
      leftPart.appendChild(taskName);

      newTask.appendChild(leftPart);
      newTask.appendChild(deleteBtn);

      this.tasksDiv.appendChild(newTask);
    });
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.displayArray(); 
    }

    const divBtn = document.getElementById('divBtn');
    if (this.tasks.length > 0) {
      divBtn.classList.remove('d-none');
      divBtn.classList.add('d-flex');
    }
  }

  markAllComplete() {
    const allChecked = this.tasks.every(task => task.done);
    this.tasks.forEach((task) => {
      task.done = !allChecked;
    });

    this.displayArray();
    this.saveTasksToLocalStorage();
  }

  deleteAllTasks() {
    this.tasks = [];
    this.displayArray();
    this.saveTasksToLocalStorage();
  }
}

const myListTask = new ListTask();
const btn = document.getElementById("button");
const input = document.getElementById("input");
const markAllBtn = document.getElementById("markAllButton");
const deleteAllBtn = document.getElementById("deleteAllButton");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  myListTask.addTask();
});

markAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  myListTask.markAllComplete();
});

deleteAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  myListTask.deleteAllTasks();
});
