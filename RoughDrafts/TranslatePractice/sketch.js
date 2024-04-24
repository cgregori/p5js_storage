let angle = 0;
let flag = true;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES); // W/o this it goes quick
}

function draw() {
  
// Color Set 1 {
  let gray = map(angle % 360, 0, 360, 0, 255, true);
  let opposite = map(angle % 360, 0, 360, 255, 0, true);

  if (angle % 360 == 0) {
    flag = !flag;
  }

  if (flag) {
    background(gray);
  } else {
    background(opposite);
  }

// Color Set 1 }

  translate(200, 200);

  rotate(angle);

  // Blue.
  fill("#283ade");
  rect(20, 30, 60, 30);
  line(0, 0, 20, 30); //Point 1
  line(0, 0, 80, 30); // 80 = 20 + 60
  line(0, 0, 20, 60); // 60 = 30 + 30
  // This line is occluded so commented out.
  //line(0, 0, 80, 60); // Point 2 + 3 kinda
  fill("#6775f5");
  triangle(0, 0, 20, 30, 20, 60);
  fill("#0d134a");
  triangle(0, 0, 20, 30, 80, 30);

  fill("pink");
  rect(-100, -100, 50, 60);
  // This line is occluded so commented out.
  //line(0, 0, -100, -100);
  line(0, 0, -50, -100);
  line(0, 0, -100, -40);
  line(0, 0, -50, -40);
  fill("#e295f5");
  triangle(0, 0, -50, -40, -100, -40);
  fill("#9858a8");
  triangle(0, 0, -50, -100, -50, -40);

  // Orange.
  fill("#ff9c19");
  rect(-100, 250, 60, 70);
  fill("#ffbf6b");
  triangle(0, 0, -40, 250, -100, 250);
  fill("#734d1c")
  triangle(0, 0, -40, 320, -40, 250);

  angle += 1;
}