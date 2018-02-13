import {SVG_NS} from '../settings';

export default class Paddle {

    constructor(boardHeight, width, height, x, y, up, down, player) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 5;
      this.score = 0;
      //KeyListener, ask about why a and z arent part of the switch method
    
      this.player = player;
      this.keyState = {};
    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);
    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, true);

    } //constructor ends

    //Methods on making the paddles move vertically
    up(){
        this.y = Math.max(this.y - this.speed, 0);
    }
    
    down(){
        this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
    }

    nitro(){
      this.speed = 10;
    }

    slow() {
      this.speed = 3; 
    }

    defaultSpeed(){
      this.speed = 5;
    }

    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }

    //Rendering
    render(svg){
   // Player movement
    if (this.keyState['a'] && this.player === 'player1') {
        this.up();
      }
      if (this.keyState['z'] && this.player === 'player1') {
        this.down();
      }
      if (this.keyState['ArrowUp'] && this.player === 'player2') {
        this.up();
      }
      if (this.keyState['ArrowDown'] && this.player === 'player2') {
        this.down();
      }

      //Speed control for players
      if (this.keyState['q'] && this.player === 'player1') {
        this.slow();
      }
      if (this.keyState['w'] && this.player === 'player1') {
        this.defaultSpeed();
      }
      if (this.keyState['e'] && this.player === 'player1') {
        this.nitro();
      }
      if (this.keyState['ArrowLeft'] && this.player === 'player2') {
        this.slow();
      }
      if (this.keyState['Shift'] && this.player === 'player2') {
        this.defaultSpeed();
      }
      if (this.keyState['ArrowRight'] && this.player === 'player2') {
        this.nitro();
      }
      //speedcontrol ends

        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);

        svg.appendChild(rect);
        
    }
  }