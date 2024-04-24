// CURRENT GLITCHES:
// Mover glitches past boundaries
class Mover {
  constructor (x,y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;
    
    // Instantiate vectors for early read-access.
    this.vel = createVector();
    this.acc = createVector();
    
    this.colour = color('#a0bff2');
  }
  
  update() {
    // Acc is added here.
    this.keyboardInput();
    this.acc.setMag(1);
    
    this.vel.add(this.acc);
    this.vel.limit(10);
    
    this.pos.add(this.vel);
    
    this.checkEdges();
    this.drag();
  }
  
  applyForce(force) {
    let forceCopy = p5.Vector.div(force, this.mass);
    this.acc.add(forceCopy);
  }
  
  keyboardInput() {
    // Add movement to overall vector
    // L:(-1, 0) R:(1, 0) U:(0, -1) D:(0, 1)
    let movementVector = createVector();
    
    if(keyIsDown(LEFT_ARROW)) {
      movementVector.add(-30, 0);
    } if(keyIsDown(RIGHT_ARROW)) {
      movementVector.add(30, 0);
    } if(keyIsDown(UP_ARROW)) {
      movementVector.add(0, -30);
    } if(keyIsDown(DOWN_ARROW)) {
      movementVector.add(0, 30);
    }
    
    movementVector.mult(2);
    
    this.applyForce(movementVector);
  }
  
  drag() {
    // Calculate direction.
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);
    
    // Calculate magnitude.
    let speed = this.vel.mag();
    let c = 0.1; // Arbitrary.
    drag.mult(c * speed * speed);
    
    this.applyForce(drag);
  }
  
  checkEdges() {
    if(this.pos.x > width) {
      this.pos.x = width
      this.vel.x *= -1;
    } if (this.pos.x <= 0) {
      this.vel.x *= -1;
    } if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    } if (this.pos.y <= 0) {
      this.vel.y *= -1;
    }
  }
  
  show() {
    strokeWeight(1);
    stroke(255);
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.mass);
  }
}