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
  }

  addTask() {
    const taskText = this.input.value.trim();
    if (taskText === "") {
      alert("Veuillez saisir une tâche valide.");
      return;
    }

    const userTask = new Task(taskText);
    this.tasks.push(userTask);
  }

  displayArray() {
    this.tasksDiv.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const newTask = document.createElement("li");
      newTask.className = "list-group-item d-flex justify-content-between align-items-center";

      const leftPart = document.createElement("div");
      leftPart.className = "d-flex align-items-center gap-2";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;

      const taskName = document.createElement("span");
      taskName.innerText = task.name;
      if (task.done) taskName.classList.add("completed");

      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        taskName.classList.toggle("completed");
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-sm btn-danger";
      deleteBtn.innerText = "🗑";

      deleteBtn.addEventListener("click", () => {
        this.tasks.splice(index, 1);
        this.displayArray();
      });

      leftPart.appendChild(checkbox);
      leftPart.appendChild(taskName);

      newTask.appendChild(leftPart);
      newTask.appendChild(deleteBtn);

      this.tasksDiv.appendChild(newTask);
    });
  }
}

const myListTask = new ListTask();
const btn = document.getElementById("button");
const input = document.getElementById("input");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  myListTask.addTask();
  myListTask.displayArray();
  input.value = "";
});
