let walls = [];
let particles = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Four boundaries of window
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(0, height, width, height));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, 0, width, 0));

}

function draw() {
  background(0);
  
  walls.forEach(wall => {
    wall.show();
  });
  
  if(particles) {
    particles.forEach(particle => {
      particle.show();
      particle.lookAt(walls);
    });
  }
  
  push();
  noFill();
  strokeWeight(5);
  rect(mouseX, mouseY, 500, 400);
  pop();
}

function mouseClicked() {
  particles.push(new Particle(mouseX, mouseY));
}