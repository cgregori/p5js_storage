//NOTE: Figure out rotation and lines connecting the edges of the amplitude

const AMPNUM = 100;

function preload(){
  sound = loadSound('music.mp3');
}
function setup() {
  let cnv = createCanvas(400,400);
  
  sound.play();
  
  ampLog = new Array(AMPNUM);
  
  amplitude = new p5.Amplitude();
}

function draw() {
  background(220);

  //playbackBar();
  
  amplitudeHandler();
}

function playbackBar() {
  //grab the current seconds and total seconds
  //from the sound object created in setup()
  var currentSeconds = sound.currentTime();
  var totalSeconds = sound.duration();
  
  //display the variables
  textSize(25);
  text(currentSeconds,40,40);
  text(totalSeconds,40,60);
  
  //map seconds to pixels
  progressBarWidth = map(currentSeconds, 0, totalSeconds, 0, 400)
  
  //container for progress bar
  rect(0, 390, 400, 10);
  
  //progress bar
  rect(0, 390, progressBarWidth, 10);
}

function amplitudeHandler() {
  
  let level = amplitude.getLevel();
  addAmplitude(level);
  
  for(i = 0; i < ampLog.length; i++) {
    let barHeight = map(ampLog[i], 0, 1, 10, 400);
    let xStart = map(i, 0, AMPNUM, 0, 400);
    let colorChannel = map(ampLog[i], 0, 1, 0, 255);
    rotate(160);
    fill(0, 0, colorChannel);
    rect(xStart, 200, 400/AMPNUM, barHeight);
  }
}

function addAmplitude(level) {
  if(ampLog.length == AMPNUM) {
    ampLog.shift()
  }
  ampLog.push(level);
}





