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


/*****functions*****/
function play(){
	initCircles();
// @ts-ignore
	setTimeout(() => {init()},1000);
	setTimeout(() => {init2()},3000);
	setTimeout(() => {init3()},3050);
	setTimeout(() => {init4()},3150);
	setTimeout(() => {init5()},7000);
	setTimeout(() => {init6()},7050);
	setTimeout(() => {init7()},7050);
	setTimeout(() => {init8()},7150);
	setTimeout(() => {init9()},10000);
}

function initCircles (){
	//let bigRightCircleTween =
	gsap.from (bigRightCircCont, { rotation: 0, y: - 300, duration: 1,repeat: -1, repeatDelay: 3, startAt: {x: screenW * 3 / 4,y: 300, opacity: 0} });
	gsap.from (bigRightCircCont, { rotation: 0, y: - 300, duration: 1,repeat: -1, repeatDelay: 10, startAt: {x: screenW * 3 / 4,y: 300, opacity: 0} });

	//let bigLeftCircleTween =
	gsap.to (smallLeftCircCont, {  duration: 3,rotation: -6.28 , repeat: -1});

	//let smallRightCircleTween =
	gsap.to (smallRightCirCont, { duration: 2,rotation: -6.28, repeat: -1 });
}

function init(){
	gsap.to(rectanglesCont, {duration: 0.2,ease: "none",delay: 2000,  rotation:1.05});
}
// @ts-ignore
 function init2(){
	 gsap.to(rectanglesCont, { duration: 0.15,ease: "none",  rotation:1.57});
	 setTimeout(() => {topRightArc.changeColor(black)}, 100);
	  setTimeout(() => {bottomLeftArc.changeColor(white)}, 100);
 }
// @ts-ignore
function init3(){
	gsap.to(rectanglesCont, { duration: 0.15,ease: "none",  rotation:2.1});
	  setTimeout(() => {topLeftArc.changeColor(white)}, 110);
	  setTimeout(() => {bottomRightArc.changeColor(black)}, 110);
	 setTimeout(() => {smallRightCircle.changeColor(white)}, 100);
	 setTimeout(() => {smallLeftCircle.changeColor(black)}, 100);
}
// @ts-ignore
function init4() {
	gsap.to(rectanglesCont, {duration: 0.2, rotation: 3.14});
}
// @ts-ignore
function init5() {
	gsap.to(rectanglesCont, {duration: 0.2,ease: "none", rotation: 4.19});
}
// @ts-ignore
function init6(){
	gsap.to(rectanglesCont, { duration: 0.15,ease: "none",  rotation:4.71});
	setTimeout(() => {topRightArc.changeColor(white)}, 100);
	setTimeout(() => {bottomLeftArc.changeColor(black)}, 100);
}
// @ts-ignore
function init7(){
	gsap.to(rectanglesCont, { duration: 0.15,ease: "none",  rotation:5.24});
	setTimeout(() => {topLeftArc.changeColor(black)}, 100);
	setTimeout(() => {bottomRightArc.changeColor(white)}, 100);
	setTimeout(() => {smallRightCircle.changeColor(black)}, 100);
	setTimeout(() => {smallLeftCircle.changeColor(white)}, 100);
}
// @ts-ignore
function init8() {
	gsap.to(rectanglesCont, {duration: 0.15,ease: "power2.out", rotation: 6.2848})
}
// @ts-ignore
function init9 (){
	gsap.to(rectanglesCont, {duration: 0.2,ease: "none",delay: 2000,  rotation:7});
}