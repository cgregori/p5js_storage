class Enemy {
  constructor(x, y, vel) {
    this.pos = createVector(x, y);
    this.vel = vel;
  }
  
  update(mover) {
    this.pos.add(this.vel);
    
    if(this.checkCollisions(mover)) {
      mover.health--;
      mover.frameHit = frameCount; // For hurt animation.
    }
  }
  
    // From https://www.jeffreythompson.org/collision-detection/line-circle.php
  checkCollisions(mover) {
    // LINE-CIRCLE collision detection
    let x1 = this.pos.x;
    let y1 = this.pos.y;
    let x2 = this.pos.x - 3*this.vel.x;
    let y2 = this.pos.y - 3*this.vel.y;
    let cx = mover.pos.x;
    let cy = mover.pos.y;
    let r = 16;
    
    // is either end INSIDE the circle?
    // if so, return true immediately
    let inside1 = this.pointCircle(x1,y1, cx,cy,r);
    let inside2 = this.pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;

    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
    let dot = (((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1))) / pow(len,2);

    // find the closest point on the line
    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    let distance = sqrt( (distX*distX) + (distY*distY) );

    // Did they collide ?
    if (distance <= r) {
      return true;
    }
    return false;
  }
  
  // From https://www.jeffreythompson.org/collision-detection/line-circle.php
  // POINT/CIRCLE
  pointCircle(px, py, cx, cy, r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    let distX = px - cx;
    let distY = py - cy;
    let distance = sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
      return true;
    }
    return false;
  }
  
  // From https://www.jeffreythompson.org/collision-detection/line-circle.php
  // LINE/POINT
  linePoint(x1, y1, x2, y2, px, py) {

    // get distance from the point to the two ends of the line
    let d1 = dist(px,py, x1,y1);
    let d2 = dist(px,py, x2,y2);

    // get the length of the line
    let lineLen = dist(x1,y1, x2,y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
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
         this.pos.x - 3*this.vel.x, this.pos.y - 3*this.vel.y);
  }
  
  static spawnEnemy(pos) {
    let velMax = 15;
    // Enemies come from opposite diagonal of player towards center.
    let posMirror = createVector(width - pos.x, height - pos.y);
    
    // NW
    if(posMirror.x < width/2 && posMirror.y < height/2) {
      let northWest = createVector(random(velMax), random(velMax));
      // Each quadrant has a 50% chance of spawning from either side
      // Top
      if(random() < 0.5) {
        return new Enemy(random(0, width/2), 0, northWest);
      }
      // Left
      else {
        return new Enemy(0, random(0, height/2), northWest);
      }
    }
    
    // NE
    if(posMirror.x > width/2 && posMirror.y < height/2) {
      let northEast = createVector(random(-velMax), random(velMax));
       // Top
      if(random() < 0.5) {
        return new Enemy(random(width/2, width), 0, northEast);
      }
      // Right
      else {
        return new Enemy(width, random(0, height/2), northEast);
      }
    }
    
    // SW
    if(posMirror.x < width/2 && posMirror.y > height/2) {
      let southWest = createVector(random(velMax), random(-velMax));
      // Bottom
      if(random() < 0.5) {
        return new Enemy(random(0, width/2), height, southWest);
      }
      // Left
      else {
        return new Enemy(0, random(height/2, height), southWest);
      }
    }
    
    // SE
    if(posMirror.x > width/2 && posMirror.y > height/2) {
      let southEast =createVector(random(-velMax), random(-velMax));
      // Bottom
      if(random() < 0.5) {
        return new Enemy(random(width/2, width), height, southEast);
      }
      // Right
      else {
        return new Enemy(width, random(height/2, height),southEast);
      }
    }
  }
}