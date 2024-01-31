

let map = document.querySelector(".map");
let map_img = document.querySelector(".map img");
window.map = map;
window.map_img = map_img;

let drag = "none"

let drag_start = [0,0];


map.addEventListener("mousedown", (a) => {
    drag = a.target.className;
    let t = a.target;
    if ((a.button == 2) & !drag.includes("map")) {
      let el = document.querySelector("." + drag.replaceAll(" ", "."));
      el.remove()
    }
    console.log(drag);
})

map.addEventListener("mouseup", () => {
    drag = 'none'
})

var cursor_x = -1;
var cursor_y = -1;
document.onmousemove = function (event) {
  let dif_x = (event.pageX - cursor_x) / parseFloat(map.style.scale);
  let dif_y = (event.pageY - cursor_y) / parseFloat(map.style.scale);
  if (drag.includes("map")) {
      dif_x = (event.pageX - cursor_x);
      dif_y = (event.pageY - cursor_y);
  }
  cursor_x = event.pageX;
  cursor_y = event.pageY;
  if (drag.includes("drag")) {
    let el = document.querySelector("." + drag.replaceAll(" ", "."));
    el.style.top = (parseFloat(el.style.top.replaceAll('px', '')) + dif_y).toString() + "px";
    el.style.left = (parseFloat(el.style.left.replaceAll('px', '')) + dif_x).toString() + "px";
  }
};

let all = document.querySelectorAll(".drag");

function addedEl() {
for (let i in all) {
    all[i].style = 'scale: 1.0; top: 0px; left: 0px';
}
}

map.addEventListener("wheel", (a) => {
    let scale = parseFloat(map.style.scale);
    map.style.scale = (scale + scale*0.02 * (a.wheelDelta/120)).toString();
});


function addText() {
    let el = document.createElement("span");
    el.setAttribute("contenteditable", "true");
    el.className = "drag " + "id-"+parseInt(Math.random()*10000).toString()+"-id";
    el.style = "scale: 1.0; top: 0px; left: 0px";
    el.innerHTML = "Text"
    map.appendChild(el);
}


function addPlayer() {
  let el = document.createElement("span");
  el.setAttribute("contenteditable", "true");
  el.className =
    "drag " + "id-" + parseInt(Math.random() * 10000).toString() + "-id";
  el.style = "scale: 1.0; top: 0px; left: 0px";
  el.innerHTML = "Text";
  map.appendChild(el);
}

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});





confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
  favDialog.close(selectEl.value); 
});


function newPerson(name) {
  console.log(name)

  let newEl = document.createElement("div");
  let title = document.createElement("h3");
  let img = document.createElement("img");
  img.src = "https://picsum.photos/500";

  title.innerHTML = name;
  newEl.className = 
    "drag no-point person " + "id-" + parseInt(Math.random() * 10000).toString() + "-id";
    newEl.appendChild(img);
  newEl.appendChild(title);
  newEl.style = "scale: 1.0; top: 0px; left: 0px";
  map.append(newEl)
  
}

window.newPerson = newPerson;


function uploadImage() {
  var file = document.querySelector("#myfile").files[0];
    var reader = new FileReader();
     reader.onloadend = function () {
       map_img.src = reader.result;
     };

     if (file) {
       reader.readAsDataURL(file);
     } else {
       map_img.src = "";
     }
}

window.uploadImage = uploadImage;