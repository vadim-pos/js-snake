export class Snake {
    constructor(body, size) {
        this.body = body;
        this.size = size;
    }

    get x() { return this.body[0].x; }
    get y() { return this.body[0].y; }

    draw(context) {
        this.body.forEach(block => {
            context.fillStyle = 'yellow';
            context.fillRect(block.x, block.y, this.size, this.size);

            context.strokeStyle = 'black'
            context.strokeRect(block.x, block.y, this.size, this.size);
        });
    }

    move(direction) {
        let x = this.x;
        let y = this.y;
        
        switch (direction) {
            case 'right': x += this.size; break;
            case 'left' : x -= this.size; break;
            case 'up'   : y -= this.size; break;
            case 'down' : y += this.size; break;
        }

        let tail = this.body.pop();
        tail.x = x;
        tail.y = y;

        this.body.unshift(tail);
    }

    grow() {
        this.body.unshift({
            x: this.x, 
            y: this.y
        });
    }

    isCollapsed() {
        for (var i = 1; i < this.body.length; i++) {
            if (this.body[i].x === this.x && this.body[i].y === this.y) {
                return true;
            }
        }
        return false;
    }
}