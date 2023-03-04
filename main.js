const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo');

// Get todos from local storage or initialize an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Add todos to the list
function renderTodos() {
  // Clear the current list of todos
  todoList.innerHTML = '';

  // Add each todo item to the list
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo}</span>
      <div>
        <button class="edit" onclick="editTodo(${index})">Edit</button>
        <button class="delete" onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });

  // Save todos to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add a new todo item to the list
function addTodo() {
  const todo = todoInput.value.trim();
  if (todo) {
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
  }
}


 //Edit a todo item
function editTodo(index) {
  const li = todoList.children[index];
  const span = li.querySelector('span');
  if (li.querySelector('input.edit-input')) {
    // Edit input already exists, do nothing
    return;
  }
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = span.textContent;
  editInput.classList.add('edit-input');
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save');
  saveButton.addEventListener('click', () => {
    const newTodo = editInput.value.trim();
    if (newTodo !== '') {
      todos[index] = newTodo;
      span.textContent = newTodo;
      li.removeChild(editInput);
      li.removeChild(saveButton);
      span.style.display = 'inline';
      renderTodos();
    }
  });
  li.appendChild(editInput);
  li.appendChild(saveButton);
  span.style.display = 'none';
}

// Delete a todo item
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Initialize the todo list
renderTodos();
