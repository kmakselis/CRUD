import FormComponent from "./components/form-component.js";
import ApiService from "./helpers/api-service.js";
import todoValidator from "./helpers/validators/todo-validator.js";

const todoList = document.querySelector('.js-todo-list');
const updateFormModal = new bootstrap.Modal('#update-form-modal');
const updateTitleField = document.querySelector('#update-title-input');
const updateCompletedField = document.querySelector('#update-completed-input');
const btnUpdateTodo = document.querySelector('#btn-update-todo');
let editableTodoId = null;
let editableTodoItemText = null;
let editableCheckbox = null;

const updateTodo = async () => {
  const { title, completed } = await ApiService.updateTodo({
    id: editableTodoId,
    title: updateTitleField.value,
    completed: updateCompletedField.checked,
  });

  editableTodoItemText.innerText = title;
  editableCheckbox.classList.remove('checked');
  if (completed) editableCheckbox.classList.add('checked');

  editableTodoId = null;
  editableTodoItemText = null;
  editableCheckbox = null;
}

const displayTodoItem = ({
  completed,
  title,
  id,
}) => {
  const todoItem = document.createElement('div');
  todoItem.className = 'todo-list__item';

  const checkbox = document.createElement('div');
  checkbox.className = 'checkbox';
  if (completed) checkbox.classList.add('checked');
  checkbox.addEventListener('click', async () => {
    await ApiService.updateTodo({
      id,
      completed: !checkbox.classList.contains('checked')
    });

    checkbox.classList.toggle('checked');
  });

  const todoItemText = document.createElement('div');
  todoItemText.className = 'todo-list__item__text';
  todoItemText.innerText = title;

  const btnUpdate = document.createElement('button');
  btnUpdate.className = 'button-update';
  btnUpdate.innerText = '↻';
  btnUpdate.addEventListener('click', () => {
    updateTitleField.value = todoItemText.innerText;
    updateCompletedField.checked = checkbox.classList.contains('checked');
    editableTodoId = id;
    editableTodoItemText = todoItemText;
    editableCheckbox = checkbox;

    updateFormModal.show();
  });

  const btnDelete = document.createElement('button');
  btnDelete.className = 'button-delete';
  btnDelete.innerText = '✖';
  btnDelete.addEventListener('click', async () => {
    await ApiService.deleteTodo(id);
    todoItem.remove();
  });

  todoItem.append(
    checkbox,
    todoItemText,
    btnUpdate,
    btnDelete
  );

  todoList.insertAdjacentElement('afterBegin', todoItem);
}

const formAddTodo = new FormComponent(
  '.js-add-todo-form',
  todoValidator,
  async ({ title }) => {
    const createdTodo = await ApiService.createTodo({ title });
    displayTodoItem(createdTodo);
  }
);

const todos = await ApiService.fetchTodos();
todos.forEach(displayTodoItem);

btnUpdateTodo.addEventListener('click', () => {
  updateTodo();
  updateFormModal.hide();
});

const bucketList = document.querySelector('.todo-list-container');
const crazyC = document.querySelector('.crazy-C');
const crazyR = document.querySelector('.crazy-R');
const crazyA = document.querySelector('.crazy-A');
const crazyZ = document.querySelector('.crazy-Z');
const crazyY = document.querySelector('.crazy-Y');
bucketList.addEventListener('mousemove', runEvent);

function runEvent(e) {
  crazyC.style.color = "rgb("+e.offsetX+", 0, "+e.offsetY+")";
  crazyR.style.color = "rgb(100, "+e.offsetX+","+e.offsetY+")";
  crazyA.style.color = "rgb("+e.offsetX+","+e.offsetY+", 100)";
  crazyZ.style.color = "rgb("+e.offsetX+", 0, "+e.offsetY+")";
  crazyY.style.color = "rgb("+e.offsetX+","+e.offsetY+", 200)";
}
