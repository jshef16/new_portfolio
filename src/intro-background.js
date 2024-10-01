var canvas;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    
    lines = [];
    numRows = 25;
    numCols = 25;
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        l = new Lines(j * width/numCols, i * height/numRows, random(['#A38357', '#C98356']));
        append(lines, l);
      }
    }
}

function draw() {
    background('#273043')
    for (let i = 0; i < lines.length; i++) {
      lines[i].show();
    }
  }

class Lines {
    constructor(startx, starty, color) {
      this.startx = startx;
      this.starty = starty;
      
      this.targetx = width/2;
      this.targety = height/2;
      
      this.length = 20;
      
      this.color = color
    }
    
    show() {
      this.targetx = lerp(this.targetx, mouseX, 0.1); 
      this.targety = lerp(this.targety, mouseY, 0.1);
      let dx = this.targetx - this.startx;
      let dy = this.targety - this.starty;
      
      let d = sqrt(pow(dx,2) + pow(dy,2));
      let vx = dx/d;
      let vy = dy/d;
      
      let endx = this.startx + vx * this.length;
      let endy = this.starty + vy * this.length;
      
      stroke(this.color)
      strokeWeight(5)
      line(this.startx, this.starty, endx, endy);
    }
    
    
  }