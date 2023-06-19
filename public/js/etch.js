// various variables

let customButton = document.getElementsByClassName("paintCustomButton")[0];
let randomButton = document.getElementsByClassName("paintRandomButton")[0];
let eraserButton = document.getElementsByClassName("eraser")[0];

// loop for making squared divs and initial board:

let container = document.getElementsByClassName("largeContainer")[0];

function countDivs(){
  for (let i = 0; i < slider.value; i++) {
      let divContainer = document.createElement("div");
      divContainer.classList.add("divContainer");
      for (let i = 0; i < slider.value; i++) {
          let divBlock = document.createElement("div");
          divBlock.classList.add("divBlock", "colorFalse");
          divContainer.appendChild(divBlock);
      };
      container.appendChild(divContainer);
  }
  Array.from(document.getElementsByClassName("divBlock")).forEach(e => e.style.cssText = `background-color: ${getColorBackground.value};`)
}

// slider

let slider = document.getElementsByClassName("slider")[0];
let output = document.getElementsByClassName("px")[0];

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = slider.value;
  removeDivs();
  countDivs();
  colorfy();
}

// currentColor or assign custom color

let getColor = document.getElementsByClassName("color")[0];
let currentColor = getColor.value;
let lastCurrentColor = currentColor;
let randomClicked = false;

getColor.oninput = () => { assignCustomColor() };
customButton.onclick = () => { 
  setLastColor();
  assignCustomColor(); 
};

function assignCustomColor() {
  highlightButton(customButton);
  currentColor = getColor.value;
  lastCurrentColor = currentColor
}

// randomColor

let intervalRandomColor;

randomButton.onclick = () => { 
  highlightButton(randomButton);
  intervalRandomColor = setInterval(() => {
    currentColor = `#${(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)}`;
    getColor.value = currentColor;
  }, 50);
}

function stopRandomColor() {
  clearInterval(intervalRandomColor);
}

// colorfy: 

function changeColor(event) {
  let target = event.target;
  if (!"divBlock") return;
  target.style.cssText = `background-color: ${currentColor};`;
  giveColorClass(target);
  save();
}

function giveColorClass(div) {
  if (currentColor != getColorBackground.value) {
  div.classList.remove("colorFalse");
  div.classList.add("colorTrue")}
  else {
  div.classList.add("colorFalse");
  div.classList.remove("colorTrue")}
}

function colorfy(){
  let largeContainer = document.querySelector(".largeContainer");
  let MDOWN = false;
  ["mousedown", "mouseup"].forEach(eventName => largeContainer.addEventListener(eventName, () => MDOWN = !MDOWN));
  document.addEventListener("mouseup", () => MDOWN = false);
  
  largeContainer.onclick = (event) => changeColor(event);
  largeContainer.onmousedown = (event) => changeColor(event);
  largeContainer.onmouseover = (event) => {
    if (MDOWN) {
      changeColor(event)
    }
  }
}

// previous colorfy or how not to do it: 
// event delegation is better assigning eventListeners to every single div

// function colorfy(){
//   let divBlock = document.getElementsByClassName("divBlock");
//   let MDOWN = false;
//   Array.from(divBlock).forEach(function(element) {
//       ["mousedown", "mouseup"].forEach(eventName => element.addEventListener(eventName, () => MDOWN = !MDOWN));
//       element.onclick = function() {
//         element.style.cssText = `background-color: ${currentColor};`; 
//         giveColorClass(element)}
//       document.addEventListener("mouseup", () => MDOWN = false); // fix for keep drawing when mouseup outside of the window
//       element.addEventListener("mouseover", () => { 
//         if (MDOWN) {
//         element.style.cssText = `background-color: ${currentColor};`;
//         giveColorClass(element)}
//         }
//       );
//   });
// }

// currentColorBackground:

let getColorBackground = document.getElementsByClassName("colorBackground")[0];

getColorBackground.oninput = function() {
  let colorFalseDivs = document.getElementsByClassName("colorFalse");
  let currentColorBackground = getColorBackground.value;
  Array.from(colorFalseDivs).forEach(function(e) {
      e.style.cssText = `background-color: ${currentColorBackground};`;
  });
}

// function for removing:

function removeDivs() {
  let elementsRemove = document.getElementsByClassName("divContainer");
  Array.from(elementsRemove).forEach(function(element) {
    element.remove();
  })
}

// button reset

let resetScreen = document.getElementsByClassName("reset")[0];

resetScreen.onclick = function(){
  removeDivs();
  removeSave();
  countDivs();
  colorfy();
}

// button eraser

eraserButton.onclick = function(){
  highlightButton(eraserButton);
  setLastColor();
  currentColor = getColorBackground.value;
  getColorBackground.addEventListener("change", () => currentColor = getColorBackground.value);
  getColor.addEventListener("click", () => getColorBackground.removeEventListener)
}

// drag fix:

let largeContainer = document.querySelector(".largeContainer")
largeContainer.ondragstart = () => { return false };

// color a button (color, random, eraser) and decolor others

function highlightButton(button) {
  stopRandomColor();
  button.classList.add("buttonActive");
  restButtons = [customButton, randomButton, eraserButton].filter(function(e) { return e !== button});
  restButtons.forEach(e => e.classList.remove("buttonActive"));
}

function setLastColor(){
  getColor.value = lastCurrentColor
}

// local storage

function save(){
  localStorage.setItem("canvas", container.innerHTML);
  if (typeof intervalRandomColor === "undefined") {
    console.log("regular proc")
    localStorage.setItem("color", getColor.value);
  }
  else {
    console.log("irregular proc")
    localStorage.setItem("color", lastCurrentColor)
  }
  localStorage.setItem("backgroundColor", getColorBackground.value);
  localStorage.setItem("size", slider.value)
}

function load(){
  container.innerHTML = localStorage.getItem("canvas");
  getColor.value = localStorage.getItem("color");
  currentColor = getColor.value
  getColorBackground.value = localStorage.getItem("backgroundColor");
  slider.value = localStorage.getItem("size", slider.value)
  output.innerHTML = slider.value
}

function removeSave(){
  localStorage.removeItem("canvas");
}

// first iteration: 

if (localStorage.getItem("canvas") === null) {
  countDivs();
}
else {
  load()
}

colorfy();
highlightButton(customButton);

