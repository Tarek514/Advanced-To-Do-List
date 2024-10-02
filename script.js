$(document).ready(function () {
  loadTasks();

  $("#add-task").click(function () {
    const taskText = $("#new-task").val().trim();
    const category = $("#category").val();

    if (taskText) {
      const task = {
        text: taskText,
        category: category,
        completed: false,
      };
      addTaskToDOM(task);
      saveTaskToLocalStorage(task);
      $("#new-task").val("");
    }
  });

  $(document).on("click", ".complete", function () {
    const taskItem = $(this).closest("li");
    taskItem.toggleClass("completed");

    const taskText = taskItem.find(".task-text").text();
    updateTaskInLocalStorage(taskText, "complete");
  });

  $(document).on("click", ".delete", function () {
    const taskItem = $(this).closest("li");
    const taskText = taskItem.find(".task-text").text();
    taskItem.remove();
    deleteTaskFromLocalStorage(taskText);
  });

  function addTaskToDOM(task) {
    const completedClass = task.completed ? "completed" : "";
    $("#task-list").append(`
        <li class="${completedClass}">
          <span class="category-label">${task.category}</span>
          <span class="task-text">${task.text}</span>
          <div class="task-buttons">
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
          </div>
        </li>
      `);
  }

  function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
      addTaskToDOM(task);
    });
  }

  function updateTaskInLocalStorage(taskText, action) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
      if (task.text === taskText) {
        if (action === "complete") {
          task.completed = !task.completed;
        }
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function deleteTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(function (task) {
      return task.text !== taskText;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
