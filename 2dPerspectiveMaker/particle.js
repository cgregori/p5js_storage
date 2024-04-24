class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rays = [];
    for (let a = 0; a < 360; a += 6) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  
  update(x, y) {
    this.pos.set(x, y);
  }
  
  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 8);
  }
  
  lookAt(walls) {
    this.rays.forEach(ray => {
      let closestPt = null;
      let min = Infinity;
      for(let wall of walls) {
        let pt = ray.cast(wall);
        if(pt) {
          let distance = p5.Vector.dist(this.pos, pt);
          // Check for closest wall
          if(distance < min) {
            min = distance;
            closestPt = pt;
          }
        } 
      }
      if(closestPt) {
        line(this.pos.x, this.pos.y, closestPt.x, closestPt.y);
      }
    });
  }
}