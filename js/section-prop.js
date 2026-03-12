
function changeShape(){

let shape = document.getElementById("shape").value;

document.getElementById("rectInputs").style.display = "none";
document.getElementById("circleInputs").style.display = "none";
document.getElementById("pipeInputs").style.display = "none";
document.getElementById("hbeamInputs").style.display = "none";

if(shape==="rect"){
document.getElementById("rectInputs").style.display = "block";
}

if(shape==="circle"){
document.getElementById("circleInputs").style.display = "block";
}

if(shape==="pipe"){
document.getElementById("pipeInputs").style.display = "block";
}

if(shape==="hbeam"){
document.getElementById("hbeamInputs").style.display = "block";
}

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

let Ix = 2*((B*Math.pow(tf,3))/12 + (B*tf)*Math.pow((H/2 - tf/2),2)) + (tw*Math.pow((H-2*tf),3))/12;

let Zx = Ix/(H/2);

document.getElementById("result").innerHTML =
"A = "+A+"<br>"+"Ix = "+Ix+"<br>"+"Zx = "+Zx;

}

}