// @ts-ignore
import gsap from "gsap";
import { Application, Container } from "pixi.js";
// @ts-ignore
import { MyCircle } from "./MyCircle.js";
// @ts-ignore
import { MyRectangle } from "./MyRectangle.js";
// @ts-ignore
import { MyArc } from "./MyArc.js";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x58e02c,
  width: 1200,
  height: 600,
});

const smallRightCirCont = new Container();
const smallLeftCircCont = new Container();
const bigRightCircCont = new Container();
const bigLeftCircCont = new Container();
const rectanglesCont = new Container();
const bigCircleRadius = 150;
const smallCircleRadius = 30;
const rectangleRadius = 0;
const screenW = app.screen.width;
const screenH = app.screen.height;
const smallWhiteCircleX = screenW / 4 + bigCircleRadius - smallCircleRadius;
const smallBlackCircleX =
  (screenW * 3) / 4 - bigCircleRadius + smallCircleRadius;
const black = 0x000000;
const white = 0xffffff;

const whiteRectangleConfig = {
  x: -screenW * 2,
  y: -screenH,
  width: screenW * 3,
  height: screenH * 3,
  radius: rectangleRadius,
  color: white,
  container: rectanglesCont,
};
new MyRectangle(whiteRectangleConfig);

const blackRectangleConfig = {
  x: screenW / 2,
  y: -screenH,
  width: screenW * 3,
  height: screenH * 3,
  radius: rectangleRadius,
  color: black,
  container: rectanglesCont,
};

new MyRectangle(blackRectangleConfig);

const topLeftArcConfig = {
  x: screenW / 4,
  y: screenH / 2,
  radius: bigCircleRadius,
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  color: black,
  container: bigLeftCircCont,
};

const topLeftArc = new MyArc(topLeftArcConfig);

const bottomLeftArcConfig = {
  x: screenW / 4,
  y: screenH / 2,
  radius: bigCircleRadius,
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  color: black,
  container: bigLeftCircCont,
  pivotX: false,
  pivotY: false,
  anticlockwise: true,
};
const bottomLeftArc = new MyArc(bottomLeftArcConfig);

const smallLeftCircleConfig = {
  x: smallWhiteCircleX,
  y: screenH / 2,
  radius: smallCircleRadius,
  color: white,
  container: smallLeftCircCont,
  pivotX: screenW / 4,
  pivotY: screenH / 2,
};

const smallLeftCircle = new MyCircle(smallLeftCircleConfig);

const topRightArcConfig = {
  x: (screenW * 3) / 4,
  y: screenH / 2,
  radius: bigCircleRadius,
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  color: white,
  container: bigRightCircCont,
  pivotX: (screenW * 3) / 4,
  pivotY: screenH / 2,
};

const topRightArc = new MyArc(topRightArcConfig);

const bottomRightArcConfig = {
  x: (screenW * 3) / 4,
  y: screenH / 2,
  radius: bigCircleRadius,
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  color: white,
  container: bigRightCircCont,
  pivotX: (screenW * 3) / 4,
  pivotY: screenH / 2,
  anticlockwise: true,
};

const bottomRightArc = new MyArc(bottomRightArcConfig);

const smallRightCircleConfig = {
  x: smallBlackCircleX,
  y: screenH / 2,
  radius: smallCircleRadius,
  color: black,
  container: smallRightCirCont,
  pivotX: (screenW * 3) / 4,
  pivotY: screenH / 2,
};

const smallRightCircle = new MyCircle(smallRightCircleConfig);

bigRightCircCont.addChild(smallRightCirCont);
bigLeftCircCont.addChild(smallLeftCircCont);
app.stage.addChild(rectanglesCont, bigLeftCircCont, bigRightCircCont);
play();

// @ts-ignore
function play() {
  playCircles();
  rotateRectangle(1.05, 1.57, 2.1, 3.14, black, white);
  // rectanglesCont.rotation = 0;
  // rotateRectangle(1.05, 1.57, 2.1, 3.14, white, black);
  // rotateRectangle(4.19, 4.71, 5.24, 6.2848, white, black);
  // rotateRectangle(7.33, 7.854, 8.374, 9.425, black, white);
  // rotateRectangle(10.475, 10.995, 11.525, 12.565, white, black);
}

// @ts-ignore
function playCircles() {
  gsap.from(bigRightCircCont, {
    rotation: 0,
    y: -300,
    duration: 1,
    repeat: -1,
    repeatDelay: 3,
    startAt: { x: (screenW * 3) / 4, y: 300, opacity: 0 },
  });
  gsap.from(bigRightCircCont, {
    rotation: 0,
    y: -300,
    duration: 1,
    repeat: -1,
    repeatDelay: 10,
    startAt: { x: (screenW * 3) / 4, y: 300, opacity: 0 },
  });
  gsap.to(smallLeftCircCont, { duration: 3, rotation: -6.28, repeat: -1 });
  gsap.to(smallRightCirCont, { duration: 2, rotation: -6.28, repeat: -1 });
}

function rotateRectangle(
  rotation1: number,
  rotation2: number,
  rotation3: number,
  rotation4: number,
  leftColor: number,
  rightColor: number,
) {
  firstStep(rotation1)
    .then(() => {
      console.log("after first step");
      return secondStep(rotation2, leftColor, rightColor);
    })
    .then(() => {
      return thirdStep(rotation3, leftColor, rightColor);
    })
    .then(() => {
      return lastStep(rotation4);
    })
    .then(() => {
      console.log("finished");
    });
}

// @ts-ignore
function firstStep(rotation: number) {
  return gsap
    .to(rectanglesCont, {
      duration: 0.2,
      ease: "none",
      delay: 2000,
      rotation: rotation,
    })
    .then(() => {});
}
// @ts-ignore
function secondStep(rotation: number, colorLeft: number, colorRight: number) {
  console.log("in second step");
  return gsap
    .to(rectanglesCont, { duration: 0.15, ease: "none", rotation: rotation })
    .then(() => {
      topRightArc.changeColor(colorLeft);
      bottomLeftArc.changeColor(colorRight);
    });
}

// @ts-ignore
function thirdStep(rotation: number, colorLeft: number, colorRight: number) {
  console.log("in third step");
  return gsap
    .to(rectanglesCont, {
      duration: 0.15,
      ease: "none",
      rotation: rotation,
    })
    .then(() => {
      topLeftArc.changeColor(colorRight);
      smallLeftCircle.changeColor(colorLeft);
      bottomRightArc.changeColor(colorLeft);
      smallRightCircle.changeColor(colorRight);
    });
}

// @ts-ignore
function lastStep(rotation: number) {
  console.log("in last step");
  return gsap
    .to(rectanglesCont, {
      duration: 0.2,
      ease: "power2.out",
      rotation: rotation,
    })
    .then(() => {});
}
