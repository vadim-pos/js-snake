export class Stats {
    constructor(options) {
        this.canvasEl = options.canvasEl;
        this.ctx      = this.canvasEl.getContext('2d');
        this.w = this.canvasEl.width;
        this.h = this.canvasEl.height;
    }

    printScore(score) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.w, this.h); // !!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        // draw text
        const text = `Score: ${score}`;
        this.ctx.font = '44px munro';
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(text, this.w/2, 50);
    }
}