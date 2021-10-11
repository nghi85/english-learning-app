import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';
import Character from '../../Objects/Character';

import {Sounds, Images} from '../../Data';
import SoundManager from '../../Managers/SoundManager';
import NavigatorUI from '../../Objects/NavigatorUI';

export default class Lesson1Screen4 extends Phaser.State {
    public static Name: string = 'lesson1_screen4';
    public static pause: boolean = false;

    public name: string = Lesson1Screen4.Name;
    public game: IGame;

    private danny: Character;
    private emma: Character;
    private julie: Character;
    private mike: Character;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private isPlayingSript: boolean;
    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_4);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_4);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.danny = new Character(
            this.game, Images.L1_4_Danny, 928 * scale_size, 422 * scale_size, null,
            Images.L1_4_Dannybox, 1110 * scale_size, 150 * scale_size, Sounds.Sound_2B, 13.5, 2.7, "Hi, I'm Danny", true, false, false, false
        );
        this.emma = new Character(
            this.game, Images.L1_4_Emma, 543 * scale_size, 477 * scale_size, null,
            Images.L1_4_Emmabox, 700 * scale_size, 185 * scale_size, Sounds.Sound_2B, 9, 3, "Hello, I'm Emma", true, false, false, false
        );
        this.julie = new Character(
            this.game, Images.L1_4_Julie, 102 * scale_size, 412 * scale_size, null,
            Images.L1_4_Juliebox, 250 * scale_size, 150 * scale_size, Sounds.Sound_2B, 18.5, 3, "Hi, I'm Julie", true, false, false, false
        );
        this.mike = new Character(
            this.game, Images.L1_4_Mike, 1480 * scale_size, 430 * scale_size, null,
            Images.L1_4_Mikebox, 1144 * scale_size, 150 * scale_size, Sounds.Sound_2B, 23, 3, "Hello, I'm Mike", true, false, false, false
        );

        this.callbackHandleClick();

        this.navigator_ui = new NavigatorUI(this.game, this.name);
        this.resize();
    }

    public callbackHandleClick(): void {
        this.danny.callbackHandleClick.add(() => {
            this.emma.reset();
            this.julie.reset();
            this.mike.reset();
        });

        this.emma.callbackHandleClick.add(() => {
            this.danny.reset();
            this.julie.reset();
            this.mike.reset();
        });

        this.julie.callbackHandleClick.add(() => {
            this.danny.reset();
            this.emma.reset();
            this.mike.reset();
        });

        this.mike.callbackHandleClick.add(() => {
            this.emma.reset();
            this.julie.reset();
            this.danny.reset();
        });
    }

    /**
     * Called every time the rotation or game size has changed.
     * Rescales and repositions the objects.
     */
    public resize(): void {
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.navigator_ui.resize(this.background);

        this.presentation.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.presentation.x = this.game.width - this.presentation.width - 20;

        this.danny.setScale(this.background.scale.x, this.background.scale.y);
        this.danny.setPosition(this.background.scale.x, this.background.scale.y);

        this.mike.setScale(this.background.scale.x, this.background.scale.y);
        this.mike.setPosition(this.background.scale.x, this.background.scale.y);

        this.julie.setScale(this.background.scale.x, this.background.scale.y);
        this.julie.setPosition(this.background.scale.x, this.background.scale.y);

        this.emma.setScale(this.background.scale.x, this.background.scale.y);
        this.emma.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
