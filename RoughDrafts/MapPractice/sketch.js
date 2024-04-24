function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let col = map(mouseX, 0, width, 0, 255);
  let bottomCol = map(mouseX, 0, width, 255, 0);
  
  noStroke();
  fill(col);
  // Bigger rect.
  rect(0, 0, width, height/2);
    push()
      fill(bottomCol);
      // Beeg rect.
      rect(0, height/2, width, height/2);
      // Smol rect.
      rect(width/5, height/5, width/4, height/4);
    pop();
  // Smol rect. (w/ fill(col))
  rect(3*width/5, 3*height/5, width/4, height/4);
}