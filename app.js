// SELECTORS
const input = document.querySelector("input");
const addBtn = document.querySelector(".add");
const listContainer = document.querySelector("ol");
const clear = document.querySelector(".clear");
const standardTheme = document.querySelector(".standard-theme");
const lightTheme = document.querySelector(".light-theme");
const darkerTheme = document.querySelector(".darker-theme");


// EVENT LISTENERS
window.onload = function() {
    getTodo()
}
addBtn.addEventListener("click", addTodo);
listContainer.addEventListener("click", edit_done_delete);
clear.addEventListener("click", clearAll);
standardTheme.addEventListener("click", () => changeTheme("standard"));
lightTheme.addEventListener("click", () => changeTheme("light"));
darkerTheme.addEventListener("click", () => changeTheme("darker"));

let savedTheme = localStorage.getItem("savedTheme");
if (savedTheme === null) {
    changeTheme("standard");
} else{
    changeTheme(localStorage.getItem("savedTheme"));
}


// ADDING NEW TO-DOs
function addTodo(e) {
    e.preventDefault();
    
    if (input.value !== "") {
        // CREATING NEW LIST
        const li = document.createElement("li");
        li.textContent = input.value;
        li.classList.add("todo", `${savedTheme}-todo`);
        saveTodo();

        // listContainer.innerHTML = "";
        // getTodo()
        // CREATING EDIT, DONE AND DELETE BUTTONS
        const btnDiv = document.createElement("div");
        const editBtn = document.createElement("button");
        const delBtn = document.createElement("button");
        const chkBtn = document.createElement("button");
        
        editBtn.innerHTML = `<i class="fa-solid fa-edit"></i>`
        delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
        chkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
    
        // ADDING CLASSES TO BUTTONS
        editBtn.classList.add("edit");
        chkBtn.classList.add("check");
        delBtn.classList.add("delete");

        // APPENDING BUTTONS TO BUTTON DIV
        btnDiv.append(editBtn, chkBtn, delBtn)
        
        // APPENDING BUTTON DIV TO LIST
        li.appendChild(btnDiv);
        
        // APPENDING LIST TO LIST CONTAINER
        listContainer.appendChild(li);
        
    } else{
        alert("Please enter a task.");
    }

    // TO CLEAR INPUT WHEN A NEW TO-DO IS ADDED
    input.value = "";
}

// CHANGING THEMES
function changeTheme(style) {
    console.log(style);
    document.body.className = style;
    
    if (style === "darker-header") {
        document.querySelector(".heading").classList.add("darker-header");
    } 
    else {
        document.querySelector(".heading").classList.remove("darker-header");
    }

    input.className = `${style}-input`;
    addBtn.className = `${style}-button`;
}

//SAVE TODO
function saveTodo() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
     else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (input.value !== "") {
        tasks.push(input.value);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//GET TODO
function getTodo() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        // CREATING NEW LIST
        const li = document.createElement("li");
        li.innerText = task;
        li.classList.add("todo", `${savedTheme}-todo`);
    
        // CREATING EDIT, DONE AND DELETE BUTTONS
        const btnDiv = document.createElement("div");
        const editBtn = document.createElement("button");
        const delBtn = document.createElement("button");
        const chkBtn = document.createElement("button");
        
        editBtn.innerHTML = `<i class="fa-solid fa-edit"></i>`
        delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
        chkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
    
        // ADDING CLASSES TO BUTTONS
        editBtn.classList.add("edit");
        chkBtn.classList.add("check");
        delBtn.classList.add("delete");

        // APPENDING BUTTONS TO BUTTON DIV
        btnDiv.append(editBtn, chkBtn, delBtn)

        if (li.innerText !== "") {
            // APPENDING BUTTON DIV TO LIST
            li.appendChild(btnDiv);
            
            // APPENDING LIST TO LIST CONTAINER
            listContainer.appendChild(li);
            saveTodo()
        }
    });
}

// EDIT, DONE AND DELETE FUNCTIONS
function edit_done_delete(e) {
    const item = e.target.parentElement;
    const todo = item.parentElement.parentElement;
    // DONE FUNCTION
    if (item.classList[0] === "check") {
        todo.classList.toggle("done");
    }
    // EDIT FUNCTION
    if (item.classList[0] === "edit") {
        if (todo.classList.contains("done")) {
            alert("You have completed this task.")
        } else{
            input.value = todo.innerText;
            input.focus();
            todo.remove();
        }
    }
    // DELETE FUNCTION
    if (item.classList[0] === "delete") {
        const del = confirm("You are about to delete this task")
        
        if (del == true) {
            todo.classList.add("remove");
            todo.addEventListener("transitionend", () => {
                todo.remove();
            });
        }

    }
}

function clearAll() {
    if (listContainer.innerText === "") {
        alert("No task has been added.");
    } else{
        const delAll = confirm("You are about to clear all tasks.")
        if (delAll == true) {
            localStorage.clear();
            listContainer.innerHTML = "";
            getTodo();
        }
    }
}
