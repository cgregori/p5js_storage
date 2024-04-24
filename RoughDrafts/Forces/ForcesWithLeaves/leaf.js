class Leaf {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.colour = color('#d1a171');
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    // Wipe accel so it's not summation of all accels.
    this.acc.mult(0);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  pastEdges() {
    if((this.pos.x > width) || (this.pos.x < 0) || 
       (this.pos.y > height)) {
      return true;
    }
  }
  
  show() {
    stroke(0);
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, 10, 5);
  }
}