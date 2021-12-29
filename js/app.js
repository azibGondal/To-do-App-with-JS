let date_cover = document.querySelector("[data-date]");

function settingDate() {
  let date = new Date();
  date_cover.innerHTML = date;
  window.requestAnimationFrame(settingDate);
}

window.requestAnimationFrame(settingDate);

// setting up a todo list

let list = document.querySelector("[data-list]");
let input = document.querySelector("[data-input]");
let reset = document.querySelector("[data-reset]");

let linestyle = "lineThrough";
let circleStyle = "fa-circle";
let trashVal = false;

let List = [];
let i = 0;

let mockData = JSON.parse(localStorage.getItem("TODO"));

if (mockData == undefined) {
  mockData = [];
  id = 0;
} else if (mockData != []) {
  List = mockData;
  i = mockData.length;
  resetingEverything(mockData);
}

function resetingEverything(data) {
  data.forEach((item) => {
    addTodo(item.text, item.line, item.circle, item.id, item.trashv);
  });
}

function addTodo(text, infoLine, infoCircle, id, trashv) {
  if (trashv) {
    return;
  }

  linestyle = infoLine ? "lineThrough" : "";
  circleStyle = infoCircle ? "fa-check-circle" : "fa-circle";

  let data = `<li>
    <div class="todo-text">
    <i class='far ${circleStyle}' style = "color : blue" key="circle" id=${id}></i>
    <p class='${linestyle}' style = "color : red">${text}</p>
    </div>
    <i class="fa fa-trash" key="trash" style = "color : grey" id=${id}></i> 
    </li>`;

  list.insertAdjacentHTML("afterbegin", data);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addTodo(input.value, false, false, i, trashVal);
    List.push({
      text: input.value,
      line: false,
      circle: false,
      id: i,
      trashv: trashVal,
    });

    localStorage.setItem("TODO", JSON.stringify(List));

    input.value = "";
    i++;
  }
});

list.addEventListener("click", (e) => {
  if (e.target.getAttribute("key") === "circle") {
    completeTodo(e.target);
  } else if (e.target.getAttribute("key") === "trash") {
    removeTodo(e.target);
  }
});

function completeTodo(ele) {
  ele.classList.toggle("fa-circle");
  ele.classList.toggle("fa-check-circle");
  ele.nextElementSibling.classList.toggle("lineThrough");

  List[ele.getAttribute("id")].circle = List[ele.getAttribute("id")].circle
    ? false
    : true;
  List[ele.getAttribute("id")].line = List[ele.getAttribute("id")].line
    ? false
    : true;

  localStorage.setItem("TODO", JSON.stringify(List));
}

function removeTodo(ele) {
  ele.parentElement.style.display = "none";
  List[ele.getAttribute("id")].trashv = true;
  localStorage.setItem("TODO", JSON.stringify(List));
}
// setting reset to all task
reset.addEventListener("click", () => {
  reset.style.transform = "rotate(120deg)";
  localStorage.clear();
  list.innerHTML = "";
});
