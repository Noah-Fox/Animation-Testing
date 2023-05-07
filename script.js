let bob;
let bobA1;
let bobA2;
let bobEnd;
let animatedBob;
let selectedBob;

let beganAnim;
let animLength;
let animating = false;

function setup() {
  angleMode(DEGREES);
  createCanvas(700, 700);

  bob = new BallMan();
  bobA1 = new BallMan();
  bobA2 = new BallMan();
  bobEnd = new BallMan();
  animatedBob = new BallMan();
  selectedBob = bob;
}

function draw() {
  background(255);

  push();
  noFill();
  strokeWeight(1);

  bezier(bob.rightArm.endX,bob.rightArm.endY,
    bobA1.rightArm.endX,bobA1.rightArm.endY,
    bobA2.rightArm.endX,bobA2.rightArm.endY,
    bobEnd.rightArm.endX,bobEnd.rightArm.endY);
  pop();
  
  if (animating){
    animatedBob.bezierAnimate(bob,bobA1,bobA2,bobEnd,(millis()-beganAnim)/animLength);
    animatedBob.draw();
    if (millis()-beganAnim > animLength){
      animating = false;
    }
  }
  else {
    selectedBob.draw();
  }
}

class BallMan{
  constructor(){
    this.xPos = 350;
    this.yPos = 350;
    this.body = {selected: false};

    //body part that is selected
    this.selected = "";
    //leave limbs in same place when body is moved
    this.anchorLimbsOnMove = true;

    this.color = [0,120,0];

    this.bodyWidth = 100;

    this.rightEye = new Eye(-55,40,40,0,5,8);
    this.leftEye = new Eye(-125,40,40,0,5,8);
    
    this.rightArm = new Limb(0,450,300,500,400,550,350);
    this.leftArm = new Limb(180,250,400,200,300,150,350);
    this.rightLeg = new Limb(60,420,500,400,600,400,650);
    this.leftLeg = new Limb(120,280,500,300,600,300,650);
  }

  draw(){
    fill(this.color[0],this.color[1],this.color[2]);
    strokeWeight(2);
    
    let makeLimbsAnchored = true;
    let makeXPos = this.xPos;
    let makeYPos = this.yPos;
    circle(this.xPos,this.yPos,this.bodyWidth);
    if (this.body.selected && mouseSelected(this.xPos,this.yPos) && !this.anchorLimbsOnMove){
      makeLimbsAnchored = false;
      makeXPos = mouseX;
      makeYPos = mouseY;
    }

    noFill();
    this.drawEye(this.rightEye);
    this.drawEye(this.leftEye);
    this.drawLimb(this.rightArm,makeLimbsAnchored,makeXPos,makeYPos);
    this.drawLimb(this.leftArm,makeLimbsAnchored,makeXPos,makeYPos);
    this.drawLimb(this.rightLeg,makeLimbsAnchored,makeXPos,makeYPos);
    this.drawLimb(this.leftLeg,makeLimbsAnchored,makeXPos,makeYPos);

    if (this.body.selected){
      fill(0);
      circle(this.xPos,this.yPos,5);
      if (mouseSelected(this.xPos,this.yPos)){
        this.xPos = mouseX;
        this.yPos = mouseY;
      }
    }
  }

  select(obj){
    if (this.selected){
      this[this.selected].selected = false;
    }
    if (obj){
      this[obj].selected = true;
    }
    this.selected = obj;
  }

  drawLimb(useLimb,makeAnchored,anchorOnX,anchorOnY){
    let beginX = this.xPos+0.5*this.bodyWidth*cos(useLimb.angle);
    let beginY = this.yPos+0.5*this.bodyWidth*sin(useLimb.angle);
    let a1x = beginX+useLimb.a1x;
    let a1y = beginY+useLimb.a1y;
    let a2x = beginX+useLimb.a2x;
    let a2y = beginY+useLimb.a2y;
    let endX = beginX+useLimb.endX;
    let endY = beginY+useLimb.endY;
    bezier(beginX,beginY,
      useLimb.a1x,useLimb.a1y,
      useLimb.a2x,useLimb.a2y,
      useLimb.endX,useLimb.endY);
    if (useLimb.selected){
      push();
      fill(0);
      strokeWeight(1);

      circle(beginX,beginY,5);
      if (mouseSelected(beginX,beginY)){
        let mouseAngle = getAngle(this.xPos,this.yPos,mouseX,mouseY);
        useLimb.angle = mouseAngle;
      }

      circle(useLimb.a1x,useLimb.a1y,5);
      if (mouseSelected(useLimb.a1x,useLimb.a1y)){
        useLimb.a1x = mouseX;
        useLimb.a1y = mouseY;
      }

      line(beginX,beginY,useLimb.a1x,useLimb.a1y);

      circle(useLimb.a2x,useLimb.a2y,5);
      if (mouseSelected(useLimb.a2x,useLimb.a2y)){
        useLimb.a2x = mouseX;
        useLimb.a2y = mouseY;
      }

      circle(useLimb.endX,useLimb.endY,5);
      if (mouseSelected(useLimb.endX,useLimb.endY)){
        useLimb.endX = mouseX;
        useLimb.endY = mouseY;
      }
      line(useLimb.a2x,useLimb.a2y,useLimb.endX,useLimb.endY);
      pop();
    }

    if (!makeAnchored){
      let shiftX = anchorOnX-this.xPos;
      let shiftY = anchorOnY-this.yPos;
      useLimb.a1x += shiftX;
      useLimb.a1y += shiftY;
      useLimb.a2x += shiftX;
      useLimb.a2y += shiftY;
      useLimb.endX += shiftX;
      useLimb.endY += shiftY;
    }
  }

  drawEye(useEye){
    let eyeX = this.xPos + useEye.pos*cos(useEye.angle);
    let eyeY = this.yPos + useEye.pos*sin(useEye.angle);
    let pX = eyeX+useEye.pPos*cos(useEye.pAngle);
    let pY = eyeY+useEye.pPos*sin(useEye.pAngle);
    push();
    fill(255);
    circle(eyeX,eyeY,useEye.width);
    fill(0);
    circle(pX,pY,useEye.pWidth);
    
    if (useEye.selected){
      fill(0);
      strokeWeight(1);
      let conX = this.xPos+(useEye.pos+0.5*useEye.width+20)*cos(useEye.angle);
      let conY = this.xPos+(useEye.pos+0.5*useEye.width+20)*sin(useEye.angle);
      line(this.xPos+(useEye.pos+0.5*useEye.width)*cos(useEye.angle),
        this.xPos+(useEye.pos+0.5*useEye.width)*sin(useEye.angle),conX,conY);
      circle(conX,conY,5);
      if (mouseSelected(conX,conY)){
        let mouseAngle = getAngle(this.xPos,this.yPos,mouseX,mouseY);
        let mouseDist = getDistance(this.xPos,this.yPos,mouseX,mouseY)-20-0.5*useEye.width;
        useEye.angle = mouseAngle;
        useEye.pos = mouseDist;
      }

      if (mouseSelected(pX,pY)){
        let mouseAngle = getAngle(eyeX,eyeY,mouseX,mouseY);
        let mouseDist = getDistance(eyeX,eyeY,mouseX,mouseY);
        useEye.pAngle = mouseAngle;
        useEye.pPos = mouseDist;
      }
    }
    pop();
  }

  bezierAnimate(begin,a1,a2,end,point){
    this.xPos = bezierPoint(begin.xPos,a1.xPos,a2.xPos,end.xPos,point);
    this.yPos = bezierPoint(begin.yPos,a1.yPos,a2.yPos,end.yPos,point);
    this.rightArm.bezierAnimate(begin.rightArm,a1.rightArm,a2.rightArm,end.rightArm,point);
    this.leftArm.bezierAnimate(begin.leftArm,a1.leftArm,a2.leftArm,end.leftArm,point);
    this.rightLeg.bezierAnimate(begin.rightLeg,a1.rightLeg,a2.rightLeg,end.rightLeg,point);
    this.leftLeg.bezierAnimate(begin.leftLeg,a1.leftLeg,a2.leftLeg,end.leftLeg,point);
  }
}

function animate(timeLength=2000){
  beganAnim = millis();
  animLength = timeLength;
  animating = true;
}

function allSelect(obj){
  bob.select(obj);
  bobA1.select(obj);
  bobA2.select(obj);
  bobEnd.select(obj);
}

class Limb{
  constructor(angle,a1x,a1y,a2x,a2y,endX,endY){
    this.angle = angle;
    this.a1x = a1x;
    this.a1y = a1y;
    this.a2x = a2x;
    this.a2y = a2y;
    this.endX = endX;
    this.endY = endY;
    this.selected = false;
  }

  bezierAnimate(begin,a1,a2,end,point){
    let values = ["angle","a1x","a1y","a2x","endX","endY"];
    for (let i = 0; i < values.length; i ++){
      this[values[i]] = bezierPoint(begin[values[i]],a1[values[i]],a2[values[i]],end[values[i]],point);
    }
  }
}

class Eye{
  constructor(angle,pos,width,pAngle,pPos,pWidth){
    this.angle = angle;
    this.pos = pos;
    this.width = width;
    this.pAngle = pAngle;
    this.pPos = pPos;
    this.pWidth = pWidth;
    this.selected = false;
  }
}

function mouseSelected(x,y,threshold=10){
  if (mouseIsPressed && getDistance(mouseX,mouseY,x,y) <= threshold){
    return true;
  }
  return false;
}

function getDistance(x1,y1,x2,y2){
  return sqrt(pow(x1-x2,2) + pow(y1-y2,2));
}

function getAngle(x1,y1,x2,y2){
  var ang = atan((y1-y2)/(x1-x2));
  if (x2 <= x1){
    ang += 180;
  }
  return ang;
}

