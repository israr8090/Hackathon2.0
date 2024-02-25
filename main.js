// creating variable for geting access in html file-------------
const inputBox = document.getElementById("input-box");
const todoInputContainer = document.querySelector(".todo-inputs");
const listContainer = document.getElementById("list-container");
const outputs = document.querySelector(".todo-outputs");
const todoUpdateBox = document.querySelector(".todo-update");
const inputEdit = document.querySelector(".input-edit");
const removePtag = document.querySelector(".message-tag");

//creating an empty array for storing inputs data in array--
let todoArray = [];

// making an edit-id null for getting index of array 
let edit_id = null;

// getting data witch is store in localStorage and then converting in objet for str--
let objStr = localStorage.getItem('todoes');
if (objStr) {
    todoArray = JSON.parse(objStr);
    // checking condition for message class
    if (todoArray.length > 0) {
        outputs.removeChild(removePtag);
    };
};

//calling display fucntion for showing output--
DisplayInfo();

//creating funcion for onclick of add button--
function addTask() {
    //checking condition whether input.value empty or Not and then perform--
    if (inputBox.value == "") {
        alert("Enter your task...");
    }
    else {
        //insert action
        const todoEnter = inputBox.value;
        //pushing value of input in array in form of object--
        todoArray.push({"todoItems": todoEnter});
    };

    // after clicking on add button making input field empty--
    inputBox.value = '';

    // calling function of saveInfo for storing in localStorage--
    SaveInfo(todoArray);

    // removing child of outputs--
    outputs.removeChild(removePtag);
};

//making fucntion for storing todoArray in local storage--
function SaveInfo(todoArray) {
    // conveting in string--
    let str = JSON.stringify(todoArray);

    //storing in loclaStorage--
    localStorage.setItem('todoes', str);

    //calling function for show output display after store--
    DisplayInfo();
};

// making function for display output on browser--
function DisplayInfo() {
    let statement = '';

    //appling forEach loop for itreating element with Index--
    todoArray.forEach((todo, i) => {
        statement += `<li><span class="toggling"> ${todo.todoItems}</span>
        <div class="todo-btn">
            <button class="checked" onclick='checkedTask(${i})'><i class="fa-solid fa-check color" ></i></button>
            <button class="edit" onclick='EditInfo(${i})'><i class="fa-regular fa-pen-to-square fa-beat-fade"></i></button>
            <button class="delete" onclick='DeleteInfo(${i})'><i class="fa-regular fa-trash-can"></i></button>
        </div>`;
    });

    //DOM--display--
    listContainer.innerHTML = statement;
};

// making fucntion for delete todos with index--
function DeleteInfo(id) {
    //using splice() method for delete--
    todoArray.splice(id, 1);

    //checking condition if array[0] show message--
    if (id == 0) {
        outputs.appendChild(removePtag);
    };

    //calling function for save after delete and display--
    SaveInfo(todoArray);
    DisplayInfo();
};

// Making Edit function for opeing editing section div--
function EditInfo(id) {
    // storign id in edit_id--
    edit_id = id;

    // appling styling flex when clicked on edit button--
    todoUpdateBox.style.display = "flex";

    // adding content of todoArray of index in input of edit secton--
    inputEdit.value = todoArray[id].todoItems;
    // for auto select of text in input tag--
    inputEdit.select();
};

// Making function for for submit button--
function updateSubmit() {
    //edit action
    const updatedTask = inputEdit.value;

    // checking condition 
    if (edit_id != null) {
        todoArray.splice(edit_id, 1, { "todoItems": updatedTask });
        edit_id = null;
    };

    inputEdit.value = '';
    SaveInfo(todoArray);
    todoUpdateBox.style.display = "none";
};

// Making function for closing updeting box--
function closeBox() {
    todoUpdateBox.style.display = "none";
}

// Making function for Applying checked mark on Todos--
function checkedTask(i) {
    let el = document.getElementsByClassName("toggling");
    el[i].classList.toggle("toggel-line-through");
};

// ---------------------------------End-----------------------------//