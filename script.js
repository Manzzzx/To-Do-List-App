// Select elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const progressBar = document.getElementById('progress-fill');

// Load todos from Local Storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos on page load
renderTodos();
updateProgress();

// Add todo
addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push({ text: task, completed: false });
    todoInput.value = '';
    saveTodos();
    renderTodos();
    updateProgress();
  }
});

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.className = todo.completed ? 'completed' : '';
    todoItem.innerHTML = `
      <span>${todo.text}</span>
      <button onclick="toggleComplete(${index})">Complete</button>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;
    todoList.appendChild(todoItem);
  });
}

// Toggle complete
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
  updateProgress();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
  updateProgress();
}

// Update progress bar
function updateProgress() {
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  progressBar.style.width = `${progressPercentage}%`;
}

// Save todos to Local Storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

