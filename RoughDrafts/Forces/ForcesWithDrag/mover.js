class Mover {
  constructor (x,y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;
    
    this.gravity = createVector(0, 0.2);
    
    // Instantiate vectors for early read-access.
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.colour = color('#a0bff2');
  }
  
  update() {
    
    this.doGravity();
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    // Wipe accel so it's not summation of all accels.
    this.acc.mult(0);
    
    this.checkEdges();
  }
  
  applyForce(force) {
    let forceCopy = p5.Vector.div(force, this.mass);
    this.acc.add(forceCopy);
  }
  
  // In the real world, gravity is constant between objects.
  doGravity() {
    // Ag = Fg / m => Ag = C*m/m = C
    let grav = p5.Vector.mult(this.gravity, this.mass);
    this.applyForce(grav);
  }
  
  // Ff = -1 * mu * ||N|| * v(unit)
  /*friction() {
    // Direction.
    let friction = this.vel.copy();
    friction.normalize();
    friction.mult(-1);
    
    // Magnitude.
    let mu = 0.05; // Arbitrary.
    friction.mult(mu);
    // F[normal] = mass*gravity
    friction.mult(this.mass*this.gravity.mag());
    
    this.applyForce(friction);
  }*/
  
  // Fd = -C * ||v||^2 * v(unit)
  // i.e. coefficient * vel^2 * direction
  drag() {
    // Calculate direction.
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);
    
    // Calculate magnitude.
    let speed = this.vel.mag();
    let c = 0.01; // Arbitrary.
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
    ellipse(this.pos.x, this.pos.y, 15*this.mass);
  }
}