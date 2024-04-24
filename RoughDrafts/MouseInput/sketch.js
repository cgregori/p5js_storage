let circles = [];
let maxCircles = 15;
let stampCircles = [];

function setup() {
  createCanvas(400, 400);
  frameRate(30);
}

function draw() {
  
  noCursor();
  
  let colorXMap = map(mouseX, 0, 400, 0, 255);
  let colorYMap = map(mouseY, 0, 400, 0, 255);
  let colorXYMap = map(mouseX-mouseY, -400, 400, 0, 255);
  background(color(colorXMap, colorYMap, colorXYMap));
  
  fill(colorYMap, colorXYMap, colorYMap);
  circle(mouseX, mouseY, 32);
  
  // Player Trail.
  circles.push({x: mouseX, y: mouseY});
  for(let i = 0; i < circles.length; i ++) {
    arc(circles[i].x, circles[i].y, 20, 20, circles[i].x, circles[i].y);
    // ellipse(circles[i].x, circles[i].y, 32);
  }
  if(circles.length > maxCircles) {
    // Pop from the front of the array.
    circles.shift();
  }
  
  // Frozen in Time.
  stampCircles.forEach(stamp => {
    arc(stamp.x, stamp.y, 20, 20, stamp.x, stamp.y);
  });
  
}

function mouseClicked() {
  stampCircles.push.apply(stampCircles, circles);
  console.log(stampCircles)
}