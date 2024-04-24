class mouseOrb {
  constructor() {
    this.pos = createVector(windowWidth/2 + random(-100,100),
                        windowHeight/2 + random(-100, 100));
    this.vel = createVector(1, 1);
    this.acc = createVector(0, 0);
    this.offset = random(1, 10);
    this.col = color(random(255), random(255), random(255));
  }
  show() {
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, 25);
  }
  
  update(x, y) {
    // Simple Physics
    this.acc = createVector(x, y);
    // To go towards the mouse pointer.
    this.acc.sub(this.pos);
    // So the orb doesn't pause at the cursor.
    this.acc.setMag(0.2*this.offset);
    this.vel.add(this.acc);
    this.vel.limit(this.offset);
    this.pos.add(this.vel);
  }
}

let orbs = [];
let refreshButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate.
  refresh();
  
  // Button stuff.
  refreshButton = createButton('refresh');
  refreshButton.position(19, 19);
  refreshButton.mousePressed(refresh);
}

function draw() {
  background(220);
  orbs.forEach(orb => {
    orb.show();
    orb.update(mouseX, mouseY);
  });
}

function refresh() {
  orbs.length = 0;
  for(let i = 0; i < 3; i++) {
    orbs.push(new mouseOrb(200, 200));
  }
}