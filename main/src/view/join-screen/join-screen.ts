import { Component } from "../component.js";
import { DOM } from "../dom.js";

export class JoinScreen extends Component {
    _element: HTMLDivElement;
    _nickname: string = null;
    _listeners: (() => void)[] = [];

    render() {
        const joinScreen = DOM.element('div', 'cubecraft-join-screen', 'cubecraft-screen');

        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-3'));

        const joinScreenTitle = DOM.element('img', 'cubecraft-join-screen-title') as HTMLImageElement;
        joinScreenTitle.src = '../assets/textures/joinscreen/title.png';

        joinScreen.appendChild(joinScreenTitle);

        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-1'));

        const optionsWrapper = DOM.element('div', 'cubecraft-join-options-wrapper');

        const joinOptions = DOM.element('div', 'cubecraft-join-options');

        const nameInput = DOM.element('input', 'cubecraft-textbox-thick', 'cubecraft-join-options-textbox') as HTMLInputElement;
        nameInput.placeholder = `Enter a nickname`;

        joinOptions.appendChild(nameInput);

        const joinScreenButton = DOM.element('div', 'cubecraft-button-thick', 'cubecraft-join-options-button');
        joinScreenButton.textContent = 'Join';

        joinOptions.appendChild(joinScreenButton);
        optionsWrapper.appendChild(joinOptions);
        joinScreen.appendChild(optionsWrapper);

        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-3'));

        const resolve = () => {
            this._nickname = nameInput.value;

            for (const listener of this._listeners) {
                listener();
            }
        };

        joinScreenButton.addEventListener('click', () => {
            resolve();
        });

        nameInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                resolve();
            }
        });

        return joinScreen;
    }

    whenJoined() {
        return new Promise((resolve, reject) => {
            if (this._nickname) {
                resolve(this._nickname);
            } else {
                this._listeners.push(() => {
                    resolve(this._nickname);
                });
            }
        });
    }
}