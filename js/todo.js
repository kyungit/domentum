const formTodo = document.getElementById('formTodo');
const listTodo = document.getElementById('lstTodo');
const inputTodo = document.querySelector('#formTodo input');
let todos = [];
const KEY_TODOS = 'todos';

// 투두리스트 항목 삭제
function deleteTodo(event) {
  const li = event.target.parentElement;
  console.log(li.id);
  li.remove();

  todos = todos.filter((item) => item.id !== parseInt(li.id));
  saveTodos(todos);
}

function displayTodo(arg) {
  const todoLi = document.createElement("li");
  todoLi.id = arg.id;

  // 체크박스 생성
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = arg.completed; // 체크박스의 상태 설정
  checkbox.addEventListener("change", handleCheckboxChange);
  todoLi.appendChild(checkbox);

  // 투두 텍스트 표시
  const todoText = document.createElement("span");
  todoText.innerHTML = arg.text;
  if (arg.completed) {
    // 체크된 경우 텍스트에 줄을 그어 완료된 상태로 표시
    todoText.style.textDecoration = "line-through";
  }
  todoLi.appendChild(todoText);
  todoLi.appendChild(document.createTextNode(" "));
  // 삭제 버튼 생성
  const button = document.createElement("Button");
  button.innerText = "X";
  button.addEventListener("click", deleteTodo);
  todoLi.appendChild(button);

  // 리스트에 추가
  listTodo.appendChild(todoLi);

  // 리스트 스타일 제거
  listTodo.style.listStyle = "none";
}

// 체크박스 상태가 변경될 때 호출되는 함수
function handleCheckboxChange(event) {
  const checkbox = event.target;
  const li = checkbox.parentElement;

  // todos 배열에서 해당 아이템을 찾아 체크 상태 업데이트
  todos = todos.map((item) => {
    if (item.id === parseInt(li.id)) {
      item.completed = checkbox.checked;
    }
    return item;
  });

  saveTodos(todos);
  // 아래 코드를 추가하여 displayTodo 함수를 호출하여 화면에 변경된 내용을 반영
  listTodo.innerHTML = "";
  todos.forEach(displayTodo);
}
function saveTodos(todos) {
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
}

function handleSubmitTodo(event) {
  event.preventDefault();
  const inputTodoValue = inputTodo.value;
  inputTodo.value = '';
  const newTodoObj = {
    text: inputTodoValue,
    id: Date.now(),
    completed: false, // 초기 상태는 체크되지 않은 상태
  };
  todos.push(newTodoObj);
  saveTodos(todos); // 이 부분을 추가하여 todos 배열을 로컬 스토리지에 저장
  displayTodo(newTodoObj);
}

// 체크박스 상태가 변경될 때 호출되는 함수에서 saveTodos를 호출하도록 변경
formTodo.addEventListener("submit", handleSubmitTodo);
formTodo.addEventListener("change", handleCheckboxChange);

const lsSaveTodos = localStorage.getItem(KEY_TODOS);
if (lsSaveTodos !== null) {
  const parseLsSaveTodos = JSON.parse(lsSaveTodos);
  todos = parseLsSaveTodos;
  parseLsSaveTodos.forEach(displayTodo);
}