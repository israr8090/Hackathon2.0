const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write somthing!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

//for the click function and delete task
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        console.log(e);
        saveData();
    }
}, false);

// save data and not removed when refresh page or close window 
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
// show data in dom
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
