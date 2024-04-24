class Mover {
  constructor (x,y) {
    this.pos = createVector(x, y);
    
    // Instantiate vectors for early read-access.
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.colour = color('#a0bff2');
  }
  
  update() {    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    // Wipe accel so it's not summation of all accels.
    this.acc.mult(0);
    
    this.checkEdges();
  }
  
  applyForce(force) {
    this.acc.add(force);
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
    ellipse(this.pos.x, this.pos.y, 25);
  }
}