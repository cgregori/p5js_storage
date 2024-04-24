let video;
let x = 0;
let copyAmount = 4;

function setup() {
  createCanvas(700, 600);
  // This code has to do w/ resolution scaling. Maybe important.
  pixelDensity(1);
  video = createCapture(VIDEO);
  // Shrink video down.
  video.size(320, 240);
  // Hide the capture.
  video.hide();
}

function draw() {
  video.loadPixels();
  let w = video.width;
  let h = video.height;
  
  // Draw the video above the slit-scan
  image(video, 0, 0, w, h);
  stroke('green');
  line(w/2, 0, w/2, h);
  
  // Copy column and display on canvas
  copy(video, w/2, 0, copyAmount, h, x, 300, copyAmount, h);
  
  // Moves the place of the copy each frame
  x+=copyAmount;
  
  // Reset scan.
  if (x > width) {
    x = 0;
  }
}