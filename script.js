const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;


const gridSize = 500;
const scale = document.getElementById('scale');
const scaleText = document.getElementById('scale-value');
const pixelContainer = document.querySelector('.pixel-container');
const colorSwatch = document.querySelector('.color-swatch');
const colorBtn = document.querySelector('.color-button');
const randomBtn = document.querySelector('.random-button');
const clearBtn = document.querySelector('.clear-button');


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

// clearBtn.addEventListener('click', () => clearPixelContainer(currentSize));
// document.body.onmousedown = () => (mouseDown = true);
// document.body.onmouseup = () => (mouseDown = false);

// document.addEventListener('mouseover', (e) => {
//   if (mouseDown) {
//     if (e.target.className === 'pixel') {
//       e.target.style.backgroundColor = currentColor;
//     }
//   }
// })


function updateColorSwatch(newColor) {
  currentColor = newColor;
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

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  e.target.style.backgroundColor = currentColor;
}

window.onload = () => {
  setPixelContainer(DEFAULT_SIZE)
  scale.value = DEFAULT_SIZE;
  colorSwatch.value = DEFAULT_COLOR;
}



// HELPER FUNCTIONS

function width() {
  let style = getComputedStyle(pixelContainer);
  let pixels = style.width;
  return pixels.slice(0, -2);
}