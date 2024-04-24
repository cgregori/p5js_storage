// CURRENT GLITCHES:
// Mover glitches past boundaries
class Mover {
  constructor (x,y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;
    
    // Instantiate vectors for early read-access.
    this.vel = createVector();
    this.acc = createVector();
    
    this.colour = color('#ffdb9c');
    this.captainColour = color('#c696ff');
    
    this.health = 50;
    this.score = 0;
    this.frameHit = 0;
  }
  
  update() {
    // Acc is added here.
    this.acc.set(0,0); // Otherwise acceleration never ends.
    this.acc.setMag(1);
    this.keyboardInput();
    
    this.vel.add(this.acc);
    this.vel.limit(2*this.mass);
    
    this.pos.add(this.vel);
    
    this.checkEdges();
    this.drag(0.05);
    
    if(this.health > 0)
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
    } if (keyIsDown(CONTROL)) {
      frameRate(15);
    } else {
      frameRate(60);
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
    // Set default stroke
    strokeWeight(1);
    stroke(255);
    
    // Points in direction of velocity
    this.displayBoat();
    
    // Hurt Animation
    this.hurtAnimation();
    
    // Score Display.
    this.displayScore();
    
    // Health Display
    this.displayHealth();
    
    // Death Screen
    this.deathScreen();
  }
  
  displayBoat() {
    push();
    translate(this.pos.x, this.pos.y); // Change origin.
    rotate(this.vel.heading() + PI/2);
    fill(this.colour);
    triangle(0, -this.mass,
             -this.mass/2, this.mass,
             this.mass/2, this.mass);
    fill(this.captainColour);
    ellipse(0, 0 , 16)
    pop();
  }
  
  hurtAnimation() {
    if(frameCount > 15 && frameCount <= this.frameHit + 15) {
      this.captainColour = color('#f54538');
    } else {
      this.captainColour = color('#c696ff');
    }
  }
  
  displayScore() {
    textSize(15);
    fill('#f0eca5');
    text("Score: " + Math.round(this.score), 20, 40);
  }
  
  displayHealth() {
    textSize(20);
    if(this.health <= 10)
      this.colour = color('#f54538')
    text('Health: ' + this.health, 20, 20);
  }
  
  deathScreen() {
    if(this.health <= 0) {
      background('#f54538');
      textAlign(CENTER);
      fill('#edffd4');
      text("F", width/2 - 10, height/2);
      text('Refresh to restart', width/2 - 10, height/2 + 30);
      text('Score: ' + Math.round(this.score),
           width/2 - 10, height/2 + 60);
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