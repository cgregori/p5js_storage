class Mover {
  constructor (x,y) {
    this.pos = createVector(x, y);
    
    // Instantiate vectors for early read-access.
    this.vel = createVector();
    this.acc = createVector();
    this.colour = color('#a0bff2');
  }
  
  update() {
    let movementVector = this.keyboardInput();
    this.acc.add(movementVector);
    this.acc.setMag(1);
    
    this.vel.add(this.acc);
    this.vel.limit(7);
    
    this.pos.add(this.vel);
  }
  
  keyboardInput() {
    // Add movement to overall vector
    // L:(-1, 0) R:(1, 0) U:(0, -1) D:(0, 1)
    let movementVector = createVector(0, 0);
    
    if(keyIsDown(LEFT_ARROW)) {
      movementVector.add(-1, 0);
    } if(keyIsDown(RIGHT_ARROW)) {
      movementVector.add(1, 0);
    } if(keyIsDown(UP_ARROW)) {
      movementVector.add(0, -1);
    } if(keyIsDown(DOWN_ARROW)) {
      movementVector.add(0, 1);
    }
    
    return movementVector;
  }
  
  show() {
    strokeWeight(1);
    stroke(255);
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, 25);
  }
}