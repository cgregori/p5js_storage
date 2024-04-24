function setup() {
  createCanvas(400, 400);
  
  // High dpi monitors mean more than one pixel per pixel.
  // This scales the pixels down back to 1:1
  pixelDensity(1);
}

function draw() {
  // Let's us manip. pixels and gives access to pixels[]
  loadPixels();
  
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      // Multiply by 4 because pixels are stored [RGBA, RGBA, ...]
      let index = (x + y * width) * 4
      pixels[index+0] = 0;
      pixels[index+1] = x;
      pixels[index+2] = y;
      pixels[index+3] = 255;
    }
  }
  
  updatePixels();
}