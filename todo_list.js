'use strict';

//selectors
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');

//event listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

//functions
function saveTodo() {
    localStorage.setItem('data', todoList.innerHTML);
}

function showTodo(){
    todoList.innerHTML = localStorage.getItem('data');
}

function addTodo(event) {
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //todo LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);
    if(todoInput.value === ""){
        return null
    }
    
    let deleteButton  = document.createElement("span");
    deleteButton.innerHTML = "\u00d7";
    newTodo.appendChild(deleteButton);
    
    //Append to Actual LIST
    todoList.appendChild(todoDiv);
    
    //Clear todo input VALUE
    todoInput.value = ""
    saveTodo();
}

//DELETE & CHECK
function deleteCheck(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle('complete');
        saveTodo();
    }
    
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveTodo();
    }  
}


//FILTERING THE TASKS ACCORDING THE OPTION
function filterTodo(e) {
    const todos = todoList.childNodes;
    for(let i = 1; i < todos.length; i++ ){
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains('complete')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (todos[i].classList.contains('complete')) {
                    todos[i].style.display = "none";
                } else {
                    todos[i].style.display = "flex";
                }
                break;
        }
    }
    saveTodo();
} 
showTodo();