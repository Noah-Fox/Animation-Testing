let dotSpacing = 8;
let minDotSize = 1;
let maxDotSize = 6;
let midDotSize = minDotSize + 0.5 * (maxDotSize - minDotSize);
let dotSizeRange = 0.5 * (maxDotSize - minDotSize);

let circleX = 350;
let circleY = 350;
let circleRadius = 100;

function setup() {
  angleMode(DEGREES);
  createCanvas(700, 700);
}

function draw() {
  background(255);
  fill(0);
  
  for (let i = 0; i < 700; i += dotSpacing){
    for (let x = 0; x < 700; x += dotSpacing){
      let useSize = minDotSize;
      
    }
  }
}


