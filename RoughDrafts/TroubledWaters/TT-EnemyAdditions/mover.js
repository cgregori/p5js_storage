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
    this.acc.set(0,0); // Otherwise acceleration never ends.
    this.keyboardInput();
    this.acc.setMag(1.5);
    
    this.vel.add(this.acc);
    this.vel.limit(2*this.mass);
    
    this.pos.add(this.vel);
    
    this.checkEdges();
    this.drag(0.05);
  }
  
  applyForce(force) {
    let forceCopy = p5.Vector.div(force, this.mass);
    this.acc.add(forceCopy);
  }
  
  keyboardInput() {
    // Add movement to overall vector
    // L:(-1, 0) R:(1, 0) U:(0, -1) D:(0, 1)
    let movementVector = createVector(0, 0);
    
    if(keyIsDown(LEFT_ARROW)) {
      movementVector.add(-this.mass, 0);
    } if(keyIsDown(RIGHT_ARROW)) {
      movementVector.add(this.mass, 0);
    } if(keyIsDown(UP_ARROW)) {
      movementVector.add(0, -this.mass);
    } if(keyIsDown(DOWN_ARROW)) {
      movementVector.add(0, this.mass);
    } if(keyIsDown(SHIFT)) {
      this.drag(1);
    }
    
    this.applyForce(movementVector);
  }
  
  drag(c) {
    // Calculate direction.
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);
    
    // Calculate magnitude.
    let speed = this.vel.mag();
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
  
  debug() {
    stroke('#7de89a');
    line(this.pos.x, this.pos.y, 
         this.pos.x + this.vel.x * 10,
         this.pos.y + this.vel.y * 10);
    stroke('#e4e87d');
    line(this.pos.x, this.pos.y,
        this.pos.x + this.acc.x * 30,
        this.pos.y + this.acc.y * 30);
  }
  
  show() {
    strokeWeight(1);
    stroke(255);
    fill(this.colour);
    // Points in direction of velocity
    push();
    translate(this.pos.x, this.pos.y); // Change origin.
    rotate(this.vel.heading() + PI/2);
    triangle(0, -this.mass,
             -this.mass/2, this.mass,
             this.mass/2, this.mass);
    pop();
    
    //this.debug();
  }
}