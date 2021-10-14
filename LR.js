img=""
status=""
height=0;
width=0;
x=0;
y=0;
label="";
confidence=0;
function preload(){
    img=loadImage("LR.jpg")
}

function setup(){
    canvas=createCanvas(500,450)
    canvas.position(520,220)
    object_detector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}

function draw(){
    image(img,0,0,500,450)
    fill("red")
    textSize(20)
    text(label,x,y-5)
    noFill()
    stroke("red")
    rect(x,y,width,height)
}

function modelLoaded(){
    console.log("model Loaded")
    status=true;
    object_detector.detect(img,gotResults)
}

function gotResults(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        height=results[0].height
        width=results[0].width
        x=results[0].x
        y=results[0].y
        label=results[0].label
        confidence=(results[0].confidence*100).toFixed(1)
        document.getElementById("status").innerHTML="Status: Object Detected"
    }
}

function back(){
    window.location="index.html";
}