import {SVG_NS} from '../settings';

export default class Paddle {

    constructor(boardHeight, width, height, x, y, up, down) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.score = 0;
      //KeyListener, ask about why a and z arent part of the switch method
      document.addEventListener('keydown', event => {
        switch (event.key) {
            case up:
              this.up();
              break;
            case down:
              this.down();
              break;
          }
      });
    } //constructor ends

    //Methods on making the paddles move vertically
    up(){
        console.log(this.y);
        this.y = Math.max(this.y - this.speed, 0);
    }
    
    down(){
        console.log(this.y);
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    }

    //Rendering
    render(svg){
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);

        svg.appendChild(rect);
    }
  }