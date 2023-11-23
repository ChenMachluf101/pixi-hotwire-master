import { Container, Graphics } from "pixi.js";
export class MyRectangle extends Graphics {
  myY;
  myX;
  myWidth;
  myHeight;
  myRadius;

  constructor({ x, y, width, height, radius, color, container }) {
    super();
    this.myX = x;
    this.myY = y;
    this.myWidth = width;
    this.myHeight = height;
    this.myRadius = radius;
    this.beginFill(color)
      .drawRoundedRect(
        this.myX,
        this.myY,
        this.myWidth,
        this.myHeight,
        this.myRadius,
      )
      .endFill();
    container.addChild(this);
    container.pivot.set(600, 300);
    container.position.set(600, 300);
  }
}
