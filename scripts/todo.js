"use strict";

class Task {
  constructor(task, owner, isDone, id) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
    this.id = id;
  }
}

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoListEle = document.getElementById("todo-list");
const closeEle = document.getElementsByClassName("close");
const currentUser = getFromStorage("CURRENT_USER") || [];
const todoArr = getFromStorage("TODO_LIST") || [];

const renderTask = function (todoArr) {
  let text = "";
  todoArr.forEach(function (task) {
    if (task.owner === currentUser[0].userName) {
      text += `<li id=${task.id} class="task-content ${
        task.isDone === true ? "checked" : ""
      }" onclick="isChecked('${task.id}')">
          ${task.task}
          <span class="close" onclick="deleteTask('${task.id}')">×</span>
        </li>`;
    }
  });
  todoListEle.innerHTML = text;
};
if (currentUser.length !== 0) {
  renderTask(todoArr);
} else {
  todoListEle.innerHTML = "";
}

const isChecked = function (id) {
  todoArr.forEach(function (item, index) {
    if (id === item.id) {
      const taskContentEle = document.getElementById(id);
      taskContentEle.classList.toggle("checked");
      item.isDone ? (item.isDone = false) : (item.isDone = true);
      saveToStorage("TODO_LIST", todoArr);
    }
  });
};

const deleteTask = function (id) {
  todoArr.forEach(function (item, index) {
    if (id === item.id) {
      todoArr.splice(index, 1);
    }
  });
  renderTask(todoArr);
  saveToStorage("TODO_LIST", todoArr);
};

//generates unique id;
const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

btnAdd.addEventListener("click", function () {
  if (currentUser.length === 1) {
    const id = guid();
    const data = new Task(inputTask.value, currentUser[0].userName, false, id);
    todoArr.push(data);
    renderTask(todoArr);
    saveToStorage("TODO_LIST", todoArr);
    inputTask.value = "";
  } else {
    alert("You need to login first");
    window.location.href = "../pages/login.html";
  }
});
