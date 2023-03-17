// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions

function addTodo(event) {
  event.preventDefault(); // prevent form from submitting (default)
  
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // add todo to local storage
  saveLocalTodos(todoInput.value);

  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>' 
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>' 
  trashButton.classList.add('trash-btn');

  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);

  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  
  if (item.classList[0] === 'trash-btn') {
    let todo = item.parentElement;
    // Animation
    todo.classList.add('deleted');
    removeLocalTodos(todo);

    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  
  if (item.classList[0] === 'complete-btn') {
    let todo = item.parentElement;
    // Animation
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  let todos = todoList.childNodes;
  todos.forEach(todo => {
    switch(e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>' 
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>' 
    trashButton.classList.add('trash-btn');

    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);

  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}