// CURRENT GLITCHES:
// Mover glitches past boundaries
class Mover {
  constructor (x,y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;
    
    // Instantiate vectors for early read-access.
    this.vel = createVector();
    this.acc = createVector();
    
    this.colour = color('#e3ac59');
    this.health = 10;
    this.score = 0;
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
    
    this.calcScore();
  }
  
  calcScore() {
    let multiplier = 1000;
    // More points for being closer to the center
    let divisor = p5.Vector.dist(
      this.pos, createVector(width/2, height/2));
    this.score += multiplier/divisor;
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
      this.pos.x = width;
      this.vel.x *= -0.66;
    } if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -0.66;
    } if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -0.66;
    } if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -0.66;
    }
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
    fill('#e2c3f7');
    ellipse(0, 0 , 16)
    pop();
    
    textSize(15);
    fill('#f0eca5');
    text("Score: " + Math.round(this.score), 20, 40);
    
    textSize(20);
    if(this.health <= 5)
      this.colour = color('#f54538')
    text('Health: ' + this.health, 20, 20);
    
    if(this.health <= 0) {
      background('#f54538');
      textAlign(CENTER);
      fill('#edffd4');
      text("F", width/2 - 10, height/2);
      text('Refresh to restart', width/2 - 10, height/2 + 30);
      if(keyIsDown(70)) {
        this.easterEgg();
      }
    }
  }
  
  easterEgg() {
    stroke('white');
    strokeWeight('5');
    arc(width/3, height/4 - 30, 20, -20, PI, 0, OPEN);
    arc(2*width/3, height/4 - 30, 20, -20, PI, 0, OPEN);
    strokeWeight('20');
    line(width/3, height/4, width/3, height/2);
    line(2*width/3, height/4, 2*width/3, height/2)
    fill('white');
    circle(width/2, 2*height/3, 60);
  }
}