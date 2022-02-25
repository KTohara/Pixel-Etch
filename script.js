const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

const gridSize = 500;
const scale = document.getElementById('scale');
const scaleText = document.getElementById('scale-value');
const pixelContainer = document.querySelector('.pixel-container');
const colorSwatch = document.querySelector('.color-swatch');
const colorBtn = document.querySelector('.color-button');
const randomBtn = document.querySelector('.random-button');
const eraserBtn = document.querySelector('.eraser-button')
const clearBtn = document.querySelector('.clear-button');

colorBtn.onclick = () => changeMode('color');
randomBtn.onclick = () => changeMode('random');
eraserBtn.onclick = () => changeMode('eraser');
clearBtn.onclick = () => changeSize(currentSize);
colorSwatch.onchange = (e) => updateColorSwatch(e.target.value);
scale.onmousemove = (e) => updateSize(e.target.value);
scale.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
pixelContainer.addEventListener('mousedown', () => {
  mouseDown = true;
})
pixelContainer.addEventListener('mouseup', () => {
  mouseDown = false;
})

function updateColorSwatch(newColor) {
  currentColor = newColor;
}

function updateMode(newMode) {
  changeMode(newMode);
  currentMode = newMode;
}

function updateSize(size) {
  scaleText.innerHTML = `${size} x ${size}`;
}

function changeSize(size) {
  currentSize = size
  clearPixelContainer();
  setPixelContainer(size);
}

function clearPixelContainer() {
  pixelContainer.innerHTML = ''
}

function setPixelContainer(size) {
  pixelContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  pixelContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const pixelDiv = document.createElement('div');
    pixelDiv.classList.add('pixel');
    pixelContainer.appendChild(pixelDiv);
    pixelDiv.addEventListener('mouseover', changeColor)
    pixelDiv.addEventListener('mousedown', changeColor)
  }
}

function randomColor() {
  const randR = Math.floor(Math.random() * 256);
  const randG = Math.floor(Math.random() * 256);
  const randB = Math.floor(Math.random() * 256);
  return `rgb(${randR}, ${randG}, ${randB})`
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'random') {
    e.target.style.backgroundColor = randomColor()
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = 'var(--white)'
  }
}

function changeMode(newMode) {
  const depressedBtns = document.querySelectorAll('.depressed')
  depressedBtns.forEach((button) => {
    button.classList.remove('depressed')
  });

  currentMode = newMode

  switch(newMode) {
    case('random'):
      randomBtn.classList.add('depressed');
      break;
    case('color'):
      colorBtn.classList.add('depressed');
      break;
    case('eraser'):
      eraserBtn.classList.add('depressed');
      break;
  }
}

window.onload = () => {
  setPixelContainer(DEFAULT_SIZE)
  scale.value = DEFAULT_SIZE;
  colorSwatch.value = DEFAULT_COLOR;
  colorBtn.classList.add('depressed');
}