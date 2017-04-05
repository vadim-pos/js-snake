import { getRandomInt } from './shared/helpers';

export class Food {
    constructor(size) {
        this.coords = {};
        this.size = size;
    }

    get x() { return this.coords.x; }
    get y() { return this.coords.y; }

    draw(context) {
        context.fillStyle = '#4caf50';
        context.fillRect(this.x, this.y, this.size, this.size);

        context.strokeStyle = 'green'
        context.strokeRect(this.x, this.y, this.size, this.size);
    }

    setNewCoords(boardWidth, boardHeight, exceptions) {
        let x = getRandomInt(0, boardWidth / this.size) * this.size;
        let y = getRandomInt(0, boardHeight / this.size) * this.size;
        
        for (var i = 0; i < exceptions.length; i++) {
            if (exceptions[i].x === x && exceptions[i].y === y) {
                return this.setNewCoords(boardWidth, boardHeight, exceptions);
            }
        }

        this.coords.x = x;
        this.coords.y = y;
    }
}