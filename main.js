function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500, 475);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelActivated);
    poseNet.on("pose", gotPoses)
}

function modelActivated(){
    console.log("PoseNet has been launched");
}

function draw(){
    image(video, 0, 0, 500, 475);

    if(ScoreLeftWrist > 0.2){
        circle(lWrist_x,lWrist_y,20)
        if(lWrist_y > 0 && lWrist_y < 100){
            music.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed = 0.5x"
        }else if(lWrist_y > 100 && lWrist_y < 200){
            music.rate(1);
            document.getElementById("speed").innerHTML = "Speed = 1x"
        }else if(lWrist_y > 200 && lWrist_y < 300){
            music.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
        }
        else if(lWrist_y > 300 && lWrist_y < 400){
            music.rate(2);
            document.getElementById("speed").innerHTML = "Speed = 2x"
        }else if(lWrist_y > 400 && lWrist_y < 500){
            music.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
        }
    }

    if(ScoreRightWrist > 0.2){
        circle(rWrist_x, rWrist_y, 20);
        Volume = Number(lWrist_y);
        Volume_Simple = floor(Volume);
        Volume_Divided = Volume_Simple/500;
        music.setVolume(Volume_Divided);
        document.getElementById("volume").innerHTML = "Volume = "+Volume_Divided;
    }
}

function play(){
    music.play();
}

function pause(){
    music.stop();
}
ScoreLeftWrist = 0
ScoreRightWrist = 0
lWrist_x = 0
rWrist_x = 0
lWrist_y = 0
rWrist_y = 0

function gotPoses(results){
    console.log(results);
    ScoreLeftWrist = results[0].pose.keypoints[9].score;
    ScoreRightWrist = results[0].pose.keypoints[10].score;
    lWrist_x = results[0].pose.leftWrist.x;
    lWrist_y = results[0].pose.leftWrist.y;
    rWrist_x = results[0].pose.rightWrist.x;
    rWrist_y = results[0].pose.rightWrist.y;
    console.log("leftWrist.x = "+lWrist_x+"leftWrist.y = "+lWrist_y+"rightWrist.x = "+ rWrist_x+"rightWrist.y = "+rWrist_y);
}