let mover;
let leaves = [];

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200);
}

function draw() {
  background(55);
  
  let gravity = createVector(0, 0.2);
  mover.applyForce(gravity);
  
  if(mouseIsPressed) {
    windy();
  }
  
  
  mover.update();
  mover.show();
  
  leaves.forEach(leaf => {
    leaf.update();
    leaf.applyForce(gravity);
    leaf.show();
  });
}

function windy() {
  let wind = createVector(0.5, 0);
  mover.applyForce(wind);
  
  // Create Leaves if none exist
  if(!leaves.length) {
    for(let i = 0; i < 40; i++) {
      leaves.push(new Leaf(40-2*i + random(20), -100+20*i +random(20)));
    }
  }
  
  // Loop from reverse for easy deletion.
  for(let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].applyForce(wind);
    if(leaves[i].pastEdges()) {
      leaves.splice(i, 1);
    }
  }
}