import { Game } from './game';
import { Stats } from './stats';
import { UI } from './ui';

export const Mediator = {
    game: null,
    interface: null,

    setup() {
        this.game = new Game({
            canvasEl: document.querySelector('.game-canvas'),
            blockSize: 20,
        });
        this.stats = new Stats({
            canvasEl: document.querySelector('.stats-canvas')
        });
        this.ui = new UI({
            el: document.querySelector('.interface')
        });

        this.ui.activate('menu');
    },

    handle(action) {
        switch(action) {
            case 'start':
                this.game.init();
                this.stats.printScore(this.game.score);
                this.ui.hide();
                break;
            case 'gameover':
                this.ui.setMessage('Game Over', `Your score is: ${this.game.score}`);
                this.ui.activate('message');
                this.saveScore(this.game.score);
                break;
            case 'restart':
                this.ui.activate('menu');
                break;
            case 'update-stats':
                this.stats.printScore(this.game.score);
                break;
            case 'show-scores':
                this.ui.setScores(this.getScores());
                this.ui.activate('scores');
        }
    },

    getScores() {
        let scores = JSON.parse(localStorage.getItem('snake-game-scores'));
        
        if (scores) {
            // first 5 items sorted by value
            return scores.sort((a, b) => b - a).splice(0, 5);
        } else {
            return [];
        }
    },

    saveScore(score) {
        let scores = this.getScores();

        scores.push(score);
        localStorage.setItem('snake-game-scores', JSON.stringify(scores));
    }
};

Mediator.getScores();