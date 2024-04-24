class Enemy {
  constructor(x, y, vel) {
    this.pos = createVector(x, y);
    this.vel = vel;
  }
  
  update() {
    this.pos.add(this.vel);
  }
  
  // Check out of bounds with 10 tolerance.
  checkSelfDestruct() {
    let tolerance = 10;
    
    return((this.pos.x > width + tolerance) || 
           (this.pos.x <= 0 - tolerance) ||
           (this.pos.y > height + tolerance) ||
           (this.pos.y <= 0 - tolerance));
  }
  
  show() {
    // Line from pos to prev. pos
    line(this.pos.x, this.pos.y, 
         this.pos.x - this.vel.x, this.pos.y - this.vel.y);
  }
  
  static spawnEnemy(pos) {
    let velMax = 15;
    // Enemies come from opposite diagonal of player.
    let posMirror = createVector(width - pos.x, height - pos.y);
    
    // NW
    if(posMirror.x < width/2 && posMirror.y < height/2) {
      // Top
      if(random() < 0.5) {
        return new Enemy(random(0, width/2), 0,
            createVector(random(-velMax, velMax), random(velMax)));
      }
      // Left
      else {
        return new Enemy(0, random(height/2, height),
            createVector(random(velMax), random(-velMax, velMax)));
      }
    }
    
    // NE
    if(posMirror.x > width/2 && posMirror.y < height/2) {
       // Top
      if(random() < 0.5) {
        return new Enemy(random(0, width/2), 0,
            createVector(random(-velMax, velMax), random(velMax)));
      }
      // Right
      else {
        return new Enemy(width, random(height/2, height),
            createVector(random(-velMax), random(-velMax, velMax)));
      }
    }
    
    // SW
    if(posMirror.x < width/2 && posMirror.y > height/2) {
      // Bottom
      if(random() < 0.5) {
        return new Enemy(random(0, width/2), height,
            createVector(random(-velMax, velMax), random(-velMax)));
      }
      // Left
      else {
        return new Enemy(0, random(height/2, height),
            createVector(random(velMax), random(-velMax, velMax)));
      }
    }
    
    // SE
    if(posMirror.x > width/2 && posMirror.y > height/2) {
      // Bottom
      if(random() < 0.5) {
        return new Enemy(random(width/2, width), height,
            createVector(random(-velMax, velMax), random(-velMax)));
      }
      // Right
      else {
        return new Enemy(width, random(height/2, height),
            createVector(random(-velMax), random(-velMax, velMax)));
      }
    }
  }
}