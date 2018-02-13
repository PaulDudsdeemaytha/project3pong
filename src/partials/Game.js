import {SVG_NS, KEYS} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		//changing ball size
		this.ball = new Ball(15, this.width, this.height);

		this.paddleWidth = 8;
		this.paddleHeight = 80;
		this.boardGap = 10;
		//Instantiate Player 1 
		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z,
			'player1'
		);
		//Instantiate Player 2
		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			'player2'
		);

		this.player1win = new Score(75, 50, 30, 'red');
		this.player2win = new Score(525, 50, 30, 'blue');

		document.addEventListener('keydown', event => {
			switch(event.key){
			case KEYS.spaceBar:
			this.pause = !this.pause;
			break;
		}
		});
		//Score keeping
		this.score1 = new Score(this.width/2 -200, 130, 60)
		this.score2 = new Score(this.width/2 +200, 130, 60)
	} // Constructor ends

	render() {

        if(this.pause){
            return;
        }
		this.gameElement.innerHTML = '';
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

		this.board.render(svg);
		this.ball.render(svg, this.player1, this.player2);

		this.player1.render(svg);
		this.player2.render(svg);
		this.gameElement.appendChild(svg);
		//score board
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		//Shorten paddle as score gets higher for each player
		if(this.player1.score > 1){
			this.player1.height = this.paddleHeight - 10;
		}  
		if (this.player1.score > 2){
			this.player1.height = this.paddleHeight - 15;
		}  
		if (this.player1.score > 3){
			this.player1.height = this.paddleHeight - 20;
		}
		
		if(this.player2.score > 1){
			this.player2.height = this.paddleHeight - 10;
		}  
		if (this.player2.score > 2){
			this.player2.height = this.paddleHeight - 15;
		} 
		if (this.player2.score > 3){
			this.player2.height = this.paddleHeight - 20;
		}
		
		//declares winner once score reaches to 5
		if (this.player1.score === 5){
			this.player1.score = 0;
			this.player2.score = 0;
			this.player1win.render(svg, 'Man you good!');
			this.pause = true;
			//creating new game
			this.player1 = new Paddle(
				this.height,
				this.paddleWidth,
				this.paddleHeight,
				this.boardGap,
				((this.height - this.paddleHeight) / 2),
				KEYS.a,
				KEYS.z,
				'player1'
			)
			this.player2 = new Paddle(
				this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			'player2'
			)
		} else if (this.player2.score === 5){
			this.player1.score = 0;
			this.player2.score = 0;
			this.player2win.render(svg, 'My dude!');
			this.pause = true;
			//creating a new game
			this.player1 = new Paddle(
				this.height,
				this.paddleWidth,
				this.paddleHeight,
				this.boardGap,
				((this.height - this.paddleHeight) / 2),
				KEYS.a,
				KEYS.z,
				'player1'
			)
			this.player2 = new Paddle(
				this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			'player2'
			)
			
		}
	}

}