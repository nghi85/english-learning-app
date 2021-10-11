import 'p2';
import 'pixi';
import 'phaser';

import {Sounds, Atlases} from '../Data';
import SoundManager from '../Managers/SoundManager';

export default class CommonButton extends Phaser.Button {
    protected id: string;

    private currentSpr: string;

    constructor(game: Phaser.Game, x: number, y: number, sprite: string, callback: Function, callbackContext: any) {
        super(game, x, y, sprite, callback, callbackContext);

        this.currentSpr = sprite;

        // this.setFrames(this.currentSpr);

        this.anchor.set(0, 0);

        this.onInputUp.add(this.playSound, this);

        this.game.add.existing(this);
    }

    /**
     * Override destroy function so it also destroys the label attached to the button.
     * @param destroyChildren
     */
    public destroy(destroyChildren?: boolean): void {
        this.id = null;

        super.destroy(destroyChildren);
    }

    /**
     * Play click sound every time the button is released.
     * @param destroyChildren
     */
    private playSound(): void {
        SoundManager.getInstance(this.game).play(Sounds.Click);
    }
}
