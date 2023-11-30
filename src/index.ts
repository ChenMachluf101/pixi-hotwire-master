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
play(-1);

async function play(times: number) {
  playCircles();
  let i = 0;
  let whiteBlack = false;
  while (times === -1 || times > i) {
    if (whiteBlack) {
      await rotateRectangle(
        60 + 180 * i,
        90 + 180 * i,
        120 + 180 * i,
        180 + 180 * i,
        white,
        black,
      );
    } else {
      await rotateRectangle(
        60 + 180 * i,
        90 + 180 * i,
        120 + 180 * i,
        180 + 180 * i,
        black,
        white,
      );
    }
    whiteBlack = !whiteBlack;
    i++;
  }
}

function rotateRectangle(
  angle1: number,
  angle2: number,
  angle3: number,
  angle4: number,
  leftColor: number,
  rightColor: number,
) {
  return firstStep(angle1)
    .then(() => {
      secondStep(angle2, leftColor, rightColor);
    })
    .then(() => {
      thirdStep(angle3, leftColor, rightColor);
    })
    .then(() => {
      lastStep(angle4);
    });
}

function firstStep(angle: number) {
  return gsap.to(rectanglesCont, {
    duration: 0.2,
    ease: "none",
    delay: 3,
    angle: angle,
  });
}

function secondStep(angle: number, colorLeft: number, colorRight: number) {
  topRightArc.changeColor(colorLeft);
  bottomLeftArc.changeColor(colorRight);
  return gsap.to(rectanglesCont, {
    duration: 0.15,
    ease: "none",
    angle: angle,
  });
}

function thirdStep(angle: number, colorLeft: number, colorRight: number) {
  topLeftArc.changeColor(colorRight);
  smallLeftCircle.changeColor(colorLeft);
  bottomRightArc.changeColor(colorLeft);
  smallRightCircle.changeColor(colorRight);
  return gsap.to(rectanglesCont, {
    duration: 0.15,
    ease: "none",
    angle: angle,
  });
}

function lastStep(angle: number) {
  return gsap.to(rectanglesCont, {
    duration: 0.2,
    ease: "power2.out",
    repeatRefresh: true,
    angle: angle,
  });
}

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
