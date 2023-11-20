// @ts-ignore
import gsap from "gsap";
import {Application, Container} from "pixi.js";
// @ts-ignore
import {MyCircle} from "./MyCircle.js";
// @ts-ignore
import {MyRectangle} from "./MyRectangle.js";
// @ts-ignore
import {MyArc} from "./MyArc.js";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x58E02C,
	width:1200,
	height: 600
});

const smallRightCirCont = new Container();
const smallLeftCircCont = new Container();
const bigRightCircCont = new Container();
const bigLeftCircCont = new Container();
const rectanglesCont = new Container();
const bigCircleRadius = 150;
const smallCircleRadius = 30;
const rectangleRadius = 0 ;
const screenW = app.screen.width;
const screenH = app.screen.height;
const smallWhiteCircleX = screenW / 4 + bigCircleRadius - smallCircleRadius;
const smallBlackCircleX = screenW * 3 / 4 - bigCircleRadius + smallCircleRadius;
const black = 0x000000;
const white = 0xFFFFFF;


new MyRectangle(- screenW * 2,  - screenH, screenW * 3 , screenH * 3, rectangleRadius, white, rectanglesCont);
new MyRectangle(screenW / 2 , - screenH, screenW  * 3, screenH * 3, rectangleRadius, black, rectanglesCont);
const topLeftArc = new MyArc(screenW / 4,screenH / 2, bigCircleRadius,Math.PI, 2 * Math.PI,black, bigLeftCircCont);
const bottomLeftArc = new MyArc(screenW / 4, screenH / 2, bigCircleRadius, Math.PI, 2 * Math.PI,black, bigLeftCircCont,false,false,true);
const smallLeftCircle = new MyCircle(smallWhiteCircleX, screenH / 2, smallCircleRadius, white, smallLeftCircCont,screenW / 4, screenH / 2);
const topRightArc = new MyArc(screenW * 3 / 4,screenH / 2,bigCircleRadius,Math.PI, 2 * Math.PI,white, bigRightCircCont,screenW * 3 / 4 , screenH / 2);
const bottomRightArc = new MyArc(screenW * 3 / 4, screenH / 2, bigCircleRadius, Math.PI, 2 * Math.PI,white, bigRightCircCont,screenW * 3 / 4 , screenH / 2,true);
const smallRightCircle = new MyCircle(smallBlackCircleX, screenH / 2, smallCircleRadius, black, smallRightCirCont, screenW * 3 / 4 , screenH / 2);

bigRightCircCont.addChild(smallRightCirCont);
bigLeftCircCont.addChild(smallLeftCircCont);
app.stage.addChild(rectanglesCont, bigLeftCircCont,bigRightCircCont);
play();

function play(){
	playCircles();
	rotateRectangle(1.05,1.57,2.1,3.14, black, white,3000);
	rotateRectangle(4.19,4.71,5.24,6.2848, white, black,7000);
	rotateRectangle(7.33,7.854,8.374,9.425, black, white,10000);
	rotateRectangle(10.475,10.995,11.525,12.565, white, black,13000);
}



function playCircles(){
	gsap.from (bigRightCircCont, { rotation: 0, y: - 300, duration: 1,repeat: -1, repeatDelay: 3, startAt: {x: screenW * 3 / 4,y: 300, opacity: 0} });
	gsap.from (bigRightCircCont, { rotation: 0, y: - 300, duration: 1,repeat: -1, repeatDelay: 10, startAt: {x: screenW * 3 / 4,y: 300, opacity: 0} });
	gsap.to (smallLeftCircCont, {  duration: 3,rotation: -6.28 , repeat: -1});
	gsap.to (smallRightCirCont, { duration: 2,rotation: -6.28, repeat: -1 });
}
function rotateRectangle(rotation1: number, rotation2: number, rotation3: number, rotation4: number, leftColor: number, rightColor: number, timeout: number){
	setTimeout(() => {firstStep(rotation1)},timeout);//0.52
	setTimeout(() => {secondStep(rotation2, leftColor, rightColor)},timeout + 50);//0.53
	setTimeout(() => {thirdStep(rotation3, leftColor, rightColor)},timeout + 100);//1.04
	setTimeout(() => {lastStep(rotation4)},timeout + 150);//1.05
}
function firstStep(rotation: number) {
	gsap.to(rectanglesCont, {duration: 0.2,ease: "none",delay: 2000,  rotation:rotation});
}

function secondStep(rotation: number, colorLeft: number, colorRight: number) {
	gsap.to(rectanglesCont, { duration: 0.15,ease: "none",  rotation:rotation});
	setTimeout(() => {topRightArc.changeColor(colorLeft)}, 100);
	setTimeout(() => {bottomLeftArc.changeColor(colorRight)}, 100);
}

function thirdStep(rotation: number, colorLeft: number, colorRight: number) {
	gsap.to(rectanglesCont, { duration: 0.15,ease: "none",  rotation:rotation});
	setTimeout(() => {topLeftArc.changeColor(colorRight)}, 100);
	setTimeout(() => {smallLeftCircle.changeColor(colorLeft)}, 100);
	setTimeout(() => {bottomRightArc.changeColor(colorLeft)}, 100);
	setTimeout(() => {smallRightCircle.changeColor(colorRight)}, 100);
}

function lastStep(rotation: number) {
	gsap.to(rectanglesCont, {duration: 0.2,ease: "power2.out", rotation: rotation});
}
