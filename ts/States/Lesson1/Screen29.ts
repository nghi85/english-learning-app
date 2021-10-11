import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';

export default class Lesson1Screen29 extends Phaser.State {
    public static Name: string = 'lesson1_screen29';
    public static pause: boolean = false;

    public name: string = Lesson1Screen29.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private danny: Character;
    private emma: Character;
    private julie: Character;
    private mike: Character;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_29);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_29);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.danny = new Character(
            this.game, Images.L1_29_Danny, 1190 * scale_size, 480 * scale_size, null,
            Images.L1_29_Dannypop, 1055 * scale_size, 345 * scale_size, Sounds.Sound_5C, 13.5, 2, 'I have glue', true, false, false, false
        );
        this.emma = new Character(
            this.game, Images.L1_29_Emma, 1485 * scale_size, 210 * scale_size, null,
            Images.L1_29_Emmapop, 1260 * scale_size, 215 * scale_size, Sounds.Sound_5C, 7.5, 2, 'I have paper', true, false, false, false
        );
        this.julie = new Character(
            this.game, Images.L1_29_Julie, 415 * scale_size, 440 * scale_size, null,
            Images.L1_29_Juliepop, 615 * scale_size, 315 * scale_size, Sounds.Sound_5C, 19.5, 3, 'I have scissors', true, false, false, false
        );
        this.mike = new Character(
            this.game, Images.L1_29_Mike, 150 * scale_size, 220 * scale_size, null,
            Images.L1_29_Mikepop, 355 * scale_size, 150 * scale_size, Sounds.Sound_5C, 25.5, 2, 'I have paint', true, false, false, false
        );

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

        this.navigator_ui = new NavigatorUI(this.game, this.name);
        this.resize();
    }

    /**
     * Called every time the rotation or game size has changed.
     * Rescales and repositions the objects.
     */
    public resize(): void {
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.presentation.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.presentation.x = this.game.width - this.presentation.width - 20;

        this.navigator_ui.resize(this.background);

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
