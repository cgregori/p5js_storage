class Wall {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.radius = radius;
  }
  
  show() {
    fill("#ff003b");
    ellipse(this.pos.x, this.pos.y, this.radius);
  }
  
  collisionDetection(mover) {
    
    let dx = mover.pos.x - this.pos.x;
    let dy = mover.pos.y - this.pos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
     if (distance < 10 + this.radius) {
       background(color(0, 255, 0));
      // Reverse velocity
      mover.vel.rotate(180);
    }
  }
}