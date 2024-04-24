let mover;
let flatCam;
let walls = [];

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200);
  flatCam = new FlatCamera(0, 0);
  
  // Set up asteroids.
  for(let i = 0; i < 50*50; i+=50) {
    walls.push(new Wall(400 + 1.5*i, random(0 + 50, height - 50), 10));
    walls.push(new Wall(400 + 1.5*i, random(0 + 50, height - 50), 10));
    walls.push(new Wall(400 + 1.5*i, random(0 + 50, height - 50), 10));
  }  
  walls.push(new Wall(400 + 3750 + 100, 200, 100));
}

function draw() {
  background(0);
  
  flatCam.update();
  flatCam.show();
  mover.update(flatCam.cameraX, flatCam.cameraY);
  mover.show();
  walls.forEach(wall => {
    wall.show();
    wall.collisionDetection(mover);
  });
  
  // Speed-up;
  if(mouseIsPressed) {
    flatCam.cameraX += 3;
  }
}