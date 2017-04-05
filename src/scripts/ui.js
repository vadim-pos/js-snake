import { Mediator } from './mediator';

export class UI {
    constructor(options) {
        this.el = options.el;
        this.menu = this.el.querySelector('.menu');
        this.message = this.el.querySelector('.message');
        this.scores = this.el.querySelector('.scores');

        this.activeEl = null;
        this.activeControl = null;
        /* add binding to method */
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    setMessage(title, message) {
        const headingEl = this.message.querySelector('.message__heading');
        const contentEl = this.message.querySelector('.message__content');

        headingEl.textContent = title;
        contentEl.textContent = message;
    }

    setScores(scores) {
        if (!scores.length) { return; }
        
        const scoresList = this.scores.querySelector('.scores__list');
        let html = '';

        scores.forEach(score => html += `<li>${score}</li>`);
        scoresList.innerHTML = html;
    }
    
    setupDOMListeners() {
        this.el.addEventListener('click', this.handleClick);
        window.addEventListener('keydown', this.handleKeydown);
    }

    removeDOMListeners() {
        this.el.removeEventListener('click', this.handleClick);
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleClick(e) {
        const action = e.target.getAttribute('data-action');
        if (action) { Mediator.handle(action); }
    }

    handleKeydown(e) {
        let nextItem;

        switch (e.keyCode) {
            case 40: case 83:
                nextItem = this.activeControl.nextElementSibling; break;
            case 38: case 87:
                nextItem = this.activeControl.previousElementSibling; break;
            case 13: 
                let event = document.createEvent('Event');
                event.initEvent('click', true, true);
                this.activeControl.dispatchEvent(event);
        }

        if (!nextItem || !nextItem.classList.contains('control')) { return; }
        
        this.activeControl.classList.remove('active');
        this.activeControl = nextItem;
        this.activeControl.classList.add('active');
    }

    hide() {
        this.removeDOMListeners();
        this.el.style.display = 'none';
    }

    activate(element) {
        this.el.style.display = 'block';

        if (this.activeEl) { this.activeEl.style.display = 'none'; }
        if (this.activeControl) { this.activeControl.classList.remove('active'); }

        this.activeEl = this[element];
        this.activeControl = this.activeEl.querySelector('.control');
        this.activeControl.classList.add('active');
        this.activeEl.style.display = 'block';

        this.setupDOMListeners();
    }
}