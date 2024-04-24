/***
  Variables: pos, vel, acc, colour
***/
class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3));
   
    // Color in [R, G, B, alpha] format.
    let colour = [Math.floor(Math.random() * 255),
                 Math.floor(Math.random() * 255),
                 Math.floor(Math.random() * 255),
                 Math.floor(Math.random() * 255)];
    this.colour = color(colour);
    
    //Physics modifier for uniqueness.
    this.physMod = Math.floor(Math.random() * 2 + 1);
  }
  
/***
  checkWalls() {
    if (this.pos.x > WIDTH || this.pos.x < 0 ||
        this.pos.y < 0 || this.pos.y > HEIGHT) {
      this.vel.rotate(180);
    }
  }
***/

  // Physics here.
  update(cameraX, cameraY) {  
    let mouse = createVector(
      mouseX + cameraX, mouseY + cameraY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(1);
    
    // v1 = v0 + a0
    this.vel.add(this.acc); 
    this.vel.limit(7 * this.physMod);

    // x1 = x0 + v0
    this.pos.add(this.vel);
    
//    this.checkWalls();
  }

  show() {
    // Mouse Orb.
    stroke(255);
    strokeWeight(2);
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, 32);
  }
}