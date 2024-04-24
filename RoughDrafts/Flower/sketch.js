let height = 400;
let weight = 400;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  colorMode(RGB);
  let lineOffshoot = 50;
  background(247);
  strokeWeight(4);
  stroke(color(250,250,250));
  
  //Rectangles
   let pink = color(242, 80, 234);
  let purple = color(188, 144, 245);
  let darkPurple = color(129, 99, 168);
  let lerpA = lerpColor(pink, purple, .66);
  //Center (Top-Bot)
 
  fill(pink);
  rect(width/3, 0+1.25*lineOffshoot, 
       width/3, 
       height/3);
  fill(lerpA);
  rect(width/3, height/3, width/3, height/3);
  //strokeWeight(3);
  //fill(lerpColor(color(251, 255, 143), pink, 0.3));
  //circle(width/2, height/2, 10);
  strokeWeight(4);
  fill(purple);
  rect(width/3, 2*height/3, 
       width/3,
       height/3-1.25*lineOffshoot);
  
  //Left (Top-Bot)
  fill(lerpColor(pink, purple, 0.31));
  rect(0+1.5*lineOffshoot, 0 + 1.5*lineOffshoot,
       width/3 - 1.5 * lineOffshoot, 
       height/3 - 1.5 * lineOffshoot,
       10);
  fill(lerpColor(pink, purple, 0.33));
  rect(0+1.25*lineOffshoot, height/3, 
       width/3 - 1.25*lineOffshoot, 
       height/3);
  fill(lerpColor(pink, darkPurple, 0.4));
  rect(0+1.5*lineOffshoot, 2*height/3, 
       width/3 - 1.5 * lineOffshoot, 
       height/3 - 1.5 * lineOffshoot,
       10);
  
  //Right (Top-Bot)
  fill(lerpColor(pink, darkPurple, 0.4));
  rect(2*width/3, 0 + 1.5*lineOffshoot,
       width/3 - 1.5 * lineOffshoot, 
       height/3 - 1.5 * lineOffshoot,
       10);
  fill(lerpColor(purple, darkPurple, 0.33));
  rect(2*width/3, height/3, 
       width/3 -1.25*lineOffshoot, 
       height/3);
  fill(lerpColor(pink, darkPurple, 0.76));
  rect(2*width/3, 2*height/3, 
       width/3 - 1.5 * lineOffshoot, 
       height/3 - 1.5 * lineOffshoot,
       10);
}