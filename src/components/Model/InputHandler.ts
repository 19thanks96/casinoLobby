import {ReelsManager} from "../Controller/ReelsManager.ts";

export class InputHandler {
    private static instance: InputHandler;
    static getInstance() {
        if (!InputHandler.instance) {
            InputHandler.instance = new InputHandler();
        }
        return InputHandler.instance;
    }

    init() {
        const bar = document.createElement('div');
        bar.id = 'cw-input-bar';
        setTimeout(() => {

            bar.classList.add('cw-active');
        }, 200)

        const spinButton = document.createElement('div');
        spinButton.id = 'cw-spin-button';
        bar.appendChild(spinButton);

        spinButton.addEventListener('click', () => {
            console.log('click');
            ReelsManager.getInstance().spin();
        })
        document.body.appendChild(bar);
    }
}