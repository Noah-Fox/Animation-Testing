export class ThreeCircles{
    constructor(xPos,yPos){
        this.xPos = xPos;
        this.yPos = yPos;
    }
    drawCircles(){
        circle(this.xPos,this.yPos,20);
        circle(this.xPos+40,this.yPos,20);
        circle(this.xPos,this.yPos+40,20);
    }
}
