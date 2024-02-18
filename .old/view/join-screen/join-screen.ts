import { ButtonComponent } from "../common/button-component.js";
import { ButtonStyle } from "../common/button-style.js";
import { Component } from "../component.js";
import { DOM } from "../dom.js";

export class JoinScreen extends Component<HTMLDivElement> {
    _singleplayerListeners: (() => unknown)[] = [];

    render() {
        const joinScreen = DOM.element('div', 'cubecraft-join-screen', 'cubecraft-screen');

        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-3'));

        const joinScreenTitle = DOM.element('img', 'cubecraft-join-screen-title') as HTMLImageElement;
        joinScreenTitle.src = '../assets/textures/joinscreen/title.png';

        joinScreen.appendChild(joinScreenTitle);

        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-1'));

        const optionsWrapper = DOM.element('div', 'cubecraft-join-options-wrapper');

        const joinOptions = DOM.element('div', 'cubecraft-join-options');

        const singleplayerButton = new ButtonComponent('Singleplayer', ButtonStyle.Thick);
        singleplayerButton.bind(this);
        joinOptions.appendChild(singleplayerButton.element);

        optionsWrapper.appendChild(joinOptions);
        joinScreen.appendChild(optionsWrapper);

        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-3'));

        singleplayerButton.onClick(() => {
            for (const listener of this._singleplayerListeners) {
                listener();
            }
        });

        return joinScreen as HTMLDivElement;
    }

    on(event: 'singleplayer', listener: () => void) {
        if (event === 'singleplayer') {
            this._singleplayerListeners.push(listener);
        }
    }
}