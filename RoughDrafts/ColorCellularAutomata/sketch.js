// Wolfram Elementary CA - Color Variation!
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/179-wolfram-ca
// https://youtu.be/Ggxt06qSAe4

let cells = [];
let ruleSet;
let w = 4;
let startRule = 90;
let palette = [];
let y = 0;

function setRules(ruleValue) {
  ruleSet = ruleValue.toString(2);
  while (ruleSet.length < 8) {
    ruleSet = "0" + ruleSet;
  }
}

function setup() {
  createCanvas(500, 500);
  setRules(startRule);
  palette = [
    color(11, 106, 136),
    color(25, 297, 244),
    color(112, 50, 126),
    color(146, 83, 161),
    color(164, 41, 99),
    color(236, 1, 90),
    color(240, 99, 164),
    color(241, 97, 100),
    color(248, 158, 79),
  ];

  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = random(palette);
  }
  background(255);
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    noStroke();
    fill(cells[i]);
    square(x, y, w);
  }

  y += w;
  
  if (y > height) {
    background(255);
    y = 0;
    setRules(floor(random(256)));
  }

  let nextCells = [];
  let len = cells.length;
  for (let i = 0; i < cells.length; i++) {
    let leftColor = cells[(i - 1 + len) % len];
    let rightColor = cells[(i + 1 + len) % len];
    let stateColor = cells[i];
    let left = brightness(leftColor) < 100 ? 1 : 0;
    let right = brightness(rightColor) < 100 ? 1 : 0;
    let state = brightness(stateColor) < 100 ? 1 : 0;
    let newState = calculateState(left, state, right);
    if (newState == 0) {
      nextCells[i] = color(255);
    } else {
      let options = [];
      if (left == 1) options.push(leftColor);
      if (right == 1) options.push(rightColor);
      if (state == 1) options.push(stateColor);
      if (options.length < 1) nextCells[i] = random(palette);
      else nextCells[i] = random(options);
    }
  }

  cells = nextCells; 
}

function calculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}
