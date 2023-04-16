img = "";
status = "";
alarm = "";
babyfound = "";
objects = [];
function preload() {
    alarm = loadSound("alarm.mp3");
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function modelLoaded() {
    console.log("Model loaded");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);

        babyfound = false;

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object detected";
            fill("#00ff00");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#00ff00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label = "person") {
                babyfound = true;
            }
        }


        if (objects.length = 0) {
            babyfound = false;
        }

        if (babyfound = true) {
            document.getElementById("status").innerHTML = "Status: A baby is or babies are found";
            if (alarm.isPlaying = true) {
                alarm.stop();
                document.getElementById("number-of-objects").innerHTML = "Baby found";
            }
        } else {
            document.getElementById("status").innerHTML = "Baby not found";
            if (alarm.isPlaying = false) {
                alarm.play();
            }
        }


    }
}