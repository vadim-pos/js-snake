import { Mediator } from './mediator';
import { Snake } from './snake';
import { Food } from './food';

export class Game {
    constructor(options) {
        this.canvasEl  = options.canvasEl;
        this.ctx       = this.canvasEl.getContext('2d');
        this.blockSize = options.blockSize;
        this.w         = this.canvasEl.width;
        this.h         = this.canvasEl.height;

        this.snake = null;
        this.food  = null;

        this.score = null;
        
        /* direction of snake's movement */
        this.direction = '';
        /* flag */
        this.directionIsSelected = false;
        /* contain game loop timer */
        this.gameLoop = null;
    }

    init() {
        this.score = 0;
        this.level = 1;
        /* create snake's body with single block and left center position  */
        this.snake = new Snake([{x: 0, y: this.h/2 - this.blockSize/2 }], this.blockSize);
        this.food = new Food(this.blockSize);

        this.setupDOMListeners();
        this.food.setNewCoords(this.w, this.h, this.snake.body);

        this.snake.draw(this.ctx);
        this.direction = 'right';

        this.gameLoop = setTimeout(this.drawGame.bind(this), 100);
    }
    
    /* draw new frame of the game */
    drawGame() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.w, this.h);
        
        this.snake.move(this.direction);
        this.food.draw(this.ctx);
        
        /* check game over status */
        if (this.isBorderTouched() || this.snake.isCollapsed()) {
            return this.gameOver();
        }

        if (this.isFoodEated()) {
            this.score++;
            Mediator.handle('update-stats');
            this.snake.grow();
            this.food.setNewCoords(this.w, this.h, this.snake.body);
        }

        this.snake.draw(this.ctx);
        this.directionIsSelected = false;
        this.gameLoop = setTimeout(this.drawGame.bind(this), 100 - this.score);
    }

    isFoodEated() {
        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
            return true;
        }
    }

    isBorderTouched() {
        return (this.snake.x < 0 || this.snake.y < 0 || this.snake.x >= this.w || this.snake.y >= this.h);
    }

    gameOver() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.gameLoop = clearTimeout(this.gameLoop);
        Mediator.handle('gameover');
    }
    
    setupDOMListeners() {
        window.addEventListener('keydown', e => {
            if (this.directionIsSelected) { return; }

            const key = e.keyCode;

            if ((key === 37 || key === 65) && this.direction !== 'right') {
                this.direction = 'left';
            } else if ((key === 38 || key === 87) && this.direction !== 'down') {
                this.direction = 'up';
            } else if ((key === 39 || key === 68) && this.direction !== 'left') {
                this.direction = 'right';
            } else if ((key === 40 || key === 83) && this.direction !== 'up') {
                this.direction = 'down';
            }

            this.directionIsSelected = true;
        });
    }
}
