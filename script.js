
let x = 0;

class twoCircles{
  constructor(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }
  drawCircles(){
    circle(this.xPos,this.yPos,20);
    circle(this.xPos+40,this.yPos,20);
  }
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  circle(200,200,100);
}
