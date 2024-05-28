const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodo function before edit it in the todoList
        editLocalTodo(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        //Creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);


        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodo(inputText);
    }
}

// Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// Function to save local todo
const saveLocalTodo = (Todo) => {
    let Todo;
    if (localStorage.getItem("Todo") === null) {
        Todo = [];
    }
    else {
        Todo = JSON.parse(localStorage.getItem("Todo"));
    }
    Todo.push(Todo);
    localStorage.setItem("Todo", JSON.stringify(Todo));
}

// Function to get local todo
const getLocalTodo = () => {
    let Todo;
    if (localStorage.getItem("Todo") === null) {
        Todo = [];
    }
    else {
        Todo = JSON.parse(localStorage.getItem("Todo"));
        Todo.forEach(todo => {

            //Creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);


            // Creating Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // Creating Delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo
const deleteLocalTodo = (todo) => {
    let todo;
    if (localStorage.getItem("Todo") === null) {
        todo = [];
    }
    else {
        todo = JSON.parse(localStorage.getItem("Todo"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todo.indexOf(todoText);
    todo.splice(todoIndex, 1);
    localStorage.setItem("Todo", JSON.stringify(Todo));
    // Array functions : slice / splice
    console.log(todoIndex);
}

const editLocalTodo = (Todo) => {
    let Todo = JSON.parse(localStorage.getItem("Todo"));
    let TodoIndex = todo.indexOf(todo);
    todo[todoIndex] = inputBox.value;
    localStorage.setItem("todo", JSON.stringify(Todo));
}

document.addEventListener('DOMContentLoaded', getLocalTodo);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);