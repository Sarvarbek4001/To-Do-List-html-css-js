//getting all required  elements
const inputBox = document.querySelector(".inputFiled input");
const addBtn = document.querySelector(".inputFiled button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user entered value
  if (userData.trim() != 0) {
    // if user entered value
    addBtn.classList.add("active"); // active the add button
  } else {
    addBtn.classList.remove("active"); // active the add button
  }
};
showTasks(); //calling showTasks function

//if user on the add button
addBtn.onclick = () => {
  let userData = inputBox.value; //getting user entered value;
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorage == null) {
    // if localStorage is null
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  listArr.push(userData); //pushing or adding user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //calling showTasks function
  addBtn.classList.remove("active"); // active the add button
};
//function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorage == null) {
    // if localStorage is null
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
  if (listArr.length > 0) {
    // if array length is greater than 0
    deleteAllBtn.classList.add("active"); // active the clearallbutton
  } else {
    deleteAllBtn.classList.remove("active"); // unactive the clearallbutton
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += ` <li> ${element} <span onclick="deleteTask(${index})">Delete</span> </li>`;
  });

  todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular indexed li
  // after remove the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //calling showTasks function
}

//delete all tasks function
deleteAllBtn.onclick = () => {
  listArr = [];
  // after delete all tasks again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //calling showTasks function
};
