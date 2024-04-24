// 3D Camera already exists in p5
class FlatCamera {
  constructor(x, y) {
    this.cameraX = x;
    this.cameraY = y;
    // Instantiate grid line shits.
    this.gridX = width;
    this.gridY = height;
  }

  update() {
    translate(-this.cameraX, -this.cameraY);

    // Horizontal Movement.
    this.cameraX++;

    // Vertical Movement.
    //this.cameraY++;
  }

  show() {
    //this.showGridLines();
    //this.whyNot();
  }

  showGridLines() {
    // Horizontal Lines /**
    stroke("black");
    line(this.gridX + this.cameraX, 
         this.cameraY,
         this.gridX + this.cameraX, 
         height + this.cameraY);  
    this.gridX --;
    // Reset.
    if(this.gridX <= 0)
      this.gridX = width;
  // **/
    
    // Vertical Lines. /**
    stroke("black");
    line(this.cameraX, 
         this.gridY + this.cameraY,
         width + this.cameraX, 
         this.gridY + this.cameraY);  
    this.gridY --;
    // Reset.
    if(this.gridY <= 0)
      this.gridY = height;
    
    
  // **/
  }
  
  whyNot() {
    fill(color(Math.random()*255, 
                   Math.random()*255, 
                   Math.random()*255));
      rect(this.cameraX + width/5 + this.gridX, 
           this.cameraY + height/5 + this.gridY, 
           50, 50);
  }
}