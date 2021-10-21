img = ""
status = ""
objects = []
function preload() {
    img = loadImage("LR.jpg")
}

function setup() {
    canvas = createCanvas(500, 450)
    canvas.position(520, 220)
    object_detector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function draw() {
    image(img, 0, 0, 500, 450)
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            textSize(20);
            text(objects[i].label + " " + percent + "%", objects[i].x-330, objects[i].y - 300)
            noFill()
            stroke("red")
            rect(objects[i].x-400, objects[i].y-300, objects[i].width-50, objects[i].height)
        }
    }
}

function modelLoaded() {
    console.log("model Loaded")
    status = true;
    object_detector.detect(img, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}

function back() {
    window.location = "index.html";
}