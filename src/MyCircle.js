import { Container, Graphics } from "pixi.js";
export class MyCircle extends Graphics{
    myY;
    myX;
    myRadius;

    constructor( x , y , radius, color, container, pivotX, pivotY){
        super();
        this.myX = x;
        this.myY = y;
        this.myRadius = radius;
        this.beginFill(color)
        .drawCircle(this.myX, this.myY, this.myRadius)
        .endFill();
        container.addChild(this);
        if (pivotX && pivotY){
            container.pivot.set(pivotX, pivotY);
            container.position.set(pivotX, pivotY);
        }
        else{
            container.pivot.set(this.myX, this.myY);
            container.position.set(this.myX, this.myY);
        }
    }

    changeColor (color){
        let x = this.myX;
        let y =  this.myY;
        let radius = this.myRadius;

        this.clear();
        this.beginFill(color);
        this.drawCircle(x, y, radius);
        this.endFill();
    }
}

