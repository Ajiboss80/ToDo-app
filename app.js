// SELECTORS
const input = document.querySelector('input');
const addBtn = document.querySelector('.add');
const listContainer = document.querySelector('ol');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// EVENT LISTENERS
addBtn.addEventListener('click', addTodo);
listContainer.addEventListener('click', doneOrDelete);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// ADDING NEW TO-DOs
function addTodo(e) {
    e.preventDefault();

    if (input.value !== '') {
        var li = document.createElement('li');
        li.innerText = input.value;
        
        // CREATE DONE AND DELETE BUTTONS
        const btnDiv = document.createElement('div');
        const chkBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        const del = document.createElement('i');
        const chk = document.createElement('i');
    
        chkBtn.classList.add('check');
        delBtn.classList.add('delete');
        chkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        
        chkBtn.appendChild(chk);
        delBtn.appendChild(del);
        btnDiv.appendChild(chkBtn);
        btnDiv.appendChild(delBtn);
        li.appendChild(btnDiv);
        listContainer.appendChild(li);
    }

    // TO CLEAR INPUT WHEN A NEW TO-DO IS ADDED
    input.value = '';
}

// DONE AND DELETE FUNCTIONS
function doneOrDelete(e) {
    const item = e.target.parentElement;
    const todo = item.parentElement.parentElement;
    if (item.classList[0] === 'check') {
        todo.classList.toggle('done');
    }
    if (item.classList[0] === 'delete') {
        todo.classList.add('remove');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }
}

// CHANGING THEMES
function changeTheme(style) {
    document.body.className = style;

    if (style === 'darker') {
        document.querySelector('.heading').classList.add('darker');
    } 
    else {
        document.querySelector('.heading').classList.remove('darker');
    }

    input.className = `${style}-input`;
    addBtn.className = `${style}-button`;
}