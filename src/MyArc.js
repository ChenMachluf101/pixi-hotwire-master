import { Container, Graphics } from "pixi.js";
export class MyArc extends Graphics{
    myY;
    myX;
    myStartAngle;
    myEndAngle;
    myRadius;
    myAnticlockwise;
    constructor( x , y , radius, startAngle, endAngle, color,container, pivotX, pivotY,anticlockwise){
        super();
        this.myX = x;
        this.myY = y;
        this.myRadius = radius;
        this.myStartAngle = startAngle;
        this.myEndAngle = endAngle;
        this.myAnticlockwise = anticlockwise;
        this.beginFill(color)
        .arc(x, y, radius,startAngle,endAngle,anticlockwise)
        .endFill();
        container.addChild(this);
        if (pivotX && pivotY){
            container.pivot.set(pivotX, pivotY);
            container.position.set(pivotX, pivotY);
        }
        else{
            container.pivot.set(x, y);
            container.position.set(x, y);
        }
    }

 changeColor (color){
     let x = this.myX;
     let y =  this.myY;
     let radius = this.myRadius;
     let startAngle = this.myStartAngle;
     let endAngle = this.myEndAngle;
     let anticlockwise = this.myAnticlockwise;

     this.clear()
     .beginFill(color)
     .arc(x, y, radius, startAngle, endAngle, anticlockwise)
     .endFill();
    }
 }

