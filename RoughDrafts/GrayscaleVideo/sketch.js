let video;

function setup() {
  createCanvas(320, 240);
  
  // High dpi monitors mean more than one pixel per pixel.
  // This scales the pixels down back to 1:1
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(320, 240);
}

function draw() {
  // Let's us manip. pixels and gives access to pixels[]
  loadPixels();
  video.loadPixels();
  
  for(let x = 0; x < video.width; x++) {
    for(let y = 0; y < video.height; y++) {
      
      // Multiply by 4 because pixels are stored [RGBA, RGBA, ...]
      let index = (x + y * video.width) * 4;
      
      // Find RGB of video
      let r = video.pixels[index+0];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      let a = video.pixels[index+3]; // Unused.
      
      // Find brightness by finding avg of sum.
      let bright = (r+g+b)/3;
      
      pixels[index+0] = bright;
      pixels[index+1] = bright;
      pixels[index+2] = bright;
      pixels[index+3] = a;
      
    }
  }
  
  updatePixels();
}