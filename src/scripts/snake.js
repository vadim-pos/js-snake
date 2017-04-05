export class Snake {
    constructor(body, size) {
        /* array of objects with x and y coords for each block */
        this.body = body;
        /* size of the snake's square block */
        this.size = size;
    }
    
    /* getters for first block coords */
    get x() { return this.body[0].x; }
    get y() { return this.body[0].y; }

    /* draw snakes body (each block) */
    draw(context) {
        this.body.forEach(block => {
            context.fillStyle = 'yellow';
            context.fillRect(block.x, block.y, this.size, this.size);

            context.strokeStyle = 'black'
            context.strokeRect(block.x, block.y, this.size, this.size);
        });
    }
    
    /* pop out last block and unshift it as first one to move snake forward */
    move(direction) {
        let x = this.x;
        let y = this.y;
        
        switch (direction) {
            case 'right': x += this.size; break;
            case 'left' : x -= this.size; break;
            case 'up'   : y -= this.size; break;
            case 'down' : y += this.size; break;
        }

        let tailBlock = this.body.pop();
        tailBlock.x = x;
        tailBlock.y = y;

        this.body.unshift(tailBlock);
    }
    
    /* add new block to make snake grow */
    grow() {
        this.body.unshift({
            x: this.x, 
            y: this.y
        });
    }
    
    /* check snake's closure on itself. If any block has the same coords as first one - snake is collapsed */
    isCollapsed() {
        for (var i = 1; i < this.body.length; i++) {
            if (this.body[i].x === this.x && this.body[i].y === this.y) {
                return true;
            }
        }
        return false;
    }
}