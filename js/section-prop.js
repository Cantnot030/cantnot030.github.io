
function changeShape(){

let shape = document.getElementById("shape").value;

document.getElementById("rectInputs").style.display = "none";
document.getElementById("circleInputs").style.display = "none";
document.getElementById("pipeInputs").style.display = "none";
document.getElementById("hbeamInputs").style.display = "none";

if(shape==="rect"){
document.getElementById("rectInputs").style.display = "block";
drawRect()
}

if(shape==="circle"){
document.getElementById("circleInputs").style.display = "block";
drawCircle()
}

if(shape==="pipe"){
document.getElementById("pipeInputs").style.display = "block";
}

if(shape==="hbeam"){
document.getElementById("hbeamInputs").style.display = "block";
}

}

function clearSVG(){
document.getElementById("sectionSVG").innerHTML = "";
}

function drawRect(){
clearSVG()
let svg = document.getElementById("sectionSVG")
svg.innerHTML = `
<rect x="80" y="60" width="140" height="180"
fill="lightblue" stroke="black"/>
`
}

function drawCircle(){

    fetch("../svg/circle.svg")
    .then(response => response.text())
    .then(svg => {

        let container = document.getElementById("sectionSVG");
        container.innerHTML = svg;

    });

}

function drawCircleNG(){
    
clearSVG()

document.getElementById("sectionSVG").innerHTML =
`<img src="../svg/circle.svg">`

}

function calculate(){

let shape = document.getElementById("shape").value;

if(shape==="rect"){
rectCalc();
}

if(shape==="circle"){
circleCalc();
}

if(shape==="pipe"){
pipeCalc();
}

if(shape==="hbeam"){
hbeamCalc();
}

function rectCalc(){

let b = parseFloat(document.getElementById("b").value);
let h = parseFloat(document.getElementById("h").value);

let A = b*h;
let I = b*Math.pow(h,3)/12;
let Z = b*Math.pow(h,2)/6;

document.getElementById("result").innerHTML =
"A="+A+"<br>I="+I+"<br>Z="+Z;

}

function circleCalc(){

let d = parseFloat(document.getElementById("d").value);

let A = Math.PI*d*d/4;
let I = Math.PI*Math.pow(d,4)/64;
let Z = Math.PI*Math.pow(d,3)/32;

document.getElementById("result").innerHTML =
"A="+A+"<br>I="+I+"<br>Z="+Z;

}

function pipeCalc(){

let D = parseFloat(document.getElementById("D").value);
let d = parseFloat(document.getElementById("d").value);

let A = Math.PI*(D*D-d*d)/4;
let I = Math.PI*(Math.pow(D,4)-Math.pow(d,4))/64;
let Z = I/(D/2);

document.getElementById("result").innerHTML =
"A="+A+"<br>I="+I+"<br>Z="+Z;

}

function hbeamCalc(){

let B = parseFloat(document.getElementById("B").value);
let H = parseFloat(document.getElementById("H").value);
let tf = parseFloat(document.getElementById("tf").value);
let tw = parseFloat(document.getElementById("tw").value);

let A = 2*(B*tf) + (H-2*tf)*tw;

let Ix = (2*tf*Math.pow(H,3) + Math.pow(tw,3)*(B - 2*tf))/12;

let Zx = Ix/(H/2);

document.getElementById("result").innerHTML =
"A = "+A+"<br>"+"Ix = "+Ix+"<br>"+"Zx = "+Zx;

}

function ibeamCalc(){

let B1 = parseFloat(document.getElementById("B1").value);
let B2 = parseFloat(document.getElementById("B2").value);
let H = parseFloat(document.getElementById("H").value);
let tf = parseFloat(document.getElementById("tf").value);
let tw = parseFloat(document.getElementById("tw").value);

let A = B1*tf + B2*tf + (H-2*tf)*tw;

let Ix =
(B1*Math.pow(tf,3))/12 +
(B1*tf)*Math.pow((H/2 - tf/2),2) +

(B2*Math.pow(tf,3))/12 +
(B2*tf)*Math.pow((H/2 - tf/2),2) +

(tw*Math.pow((H-2*tf),3))/12;

let Zx = Ix/(H/2);

document.getElementById("result").innerHTML =
"A = "+A+"<br>"+
"Ix = "+Ix+"<br>"+
"Zx = "+Zx;

}

function tbeamCalc(){

let B = parseFloat(document.getElementById("B").value);
let H = parseFloat(document.getElementById("H").value);
let tf = parseFloat(document.getElementById("tf").value);
let tw = parseFloat(document.getElementById("tw").value);

let A1 = B*tf;
let A2 = tw*(H-tf);

let y1 = H - tf/2;
let y2 = (H-tf)/2;

let A = A1 + A2;

let ybar = (A1*y1 + A2*y2)/A;

let Ix1 = (B*Math.pow(tf,3))/12 + A1*Math.pow(y1-ybar,2);
let Ix2 = (tw*Math.pow((H-tf),3))/12 + A2*Math.pow(y2-ybar,2);

let Ix = Ix1 + Ix2;

let Zx = Ix/(H-ybar);

document.getElementById("result").innerHTML =
"A = "+A+"<br>"+
"Ix = "+Ix+"<br>"+
"Zx = "+Zx;

}

function angleCalc(){

let B = parseFloat(document.getElementById("B").value);
let H = parseFloat(document.getElementById("H").value);
let t = parseFloat(document.getElementById("t").value);

let A1 = B*t;
let A2 = H*t;
let A3 = t*t;

let A = A1 + A2 - A3;

let y1 = t/2;
let y2 = H/2;
let y3 = t/2;

let ybar = (A1*y1 + A2*y2 - A3*y3)/A;

let Ix1 = (B*Math.pow(t,3))/12 + A1*Math.pow(y1-ybar,2);
let Ix2 = (t*Math.pow(H,3))/12 + A2*Math.pow(y2-ybar,2);
let Ix3 = (t*Math.pow(t,3))/12 + A3*Math.pow(y3-ybar,2);

let Ix = Ix1 + Ix2 - Ix3;

let Zx = Ix/(H-ybar);

document.getElementById("result").innerHTML =
"A = "+A+"<br>"+
"Ix = "+Ix+"<br>"+
"Zx = "+Zx;

}

}