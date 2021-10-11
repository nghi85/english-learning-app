import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';

export default class Lesson1Screen2 extends Phaser.State {
    public static Name: string = 'lesson1_screen2';
    public static pause: boolean = false;

    public name: string = Lesson1Screen2.Name;
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

        this.background = this.game.add.image(0, 0, Images.Background_L1_2);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_2);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }
        this.emma = new Character(
            this.game, Images.L1_2_Emma, 297 * scale_size, 277 * scale_size, null,
            Images.L1_2_Emmapop, 334 * scale_size, 108 * scale_size, null, null, null, 'Hi', true, false, false, false
        );
        this.julie = new Character(
            this.game, Images.L1_2_Julie, 529 * scale_size, 239 * scale_size, null,
            Images.L1_2_Juliepop, 634 * scale_size, 80 * scale_size, null, null, null, 'Hello', true, false, false, false
        );
        this.danny = new Character(
            this.game, Images.L1_2_Danny, 814 * scale_size, 234 * scale_size, null,
            Images.L1_2_Dannypop, 907 * scale_size, 60 * scale_size, null, null, null, 'Hi', true, false, false, false
        );
        this.mike = new Character(
            this.game, Images.L1_2_Mike, 1086 * scale_size, 241 * scale_size, null,
            Images.L1_2_Mikepop, 1160 * scale_size, 84 * scale_size, null, null, null, 'How are you?', true, false, false, false
        );

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

        this.danny.callbackHandleClick.add(() => {
            this.emma.reset();
            this.julie.reset();
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

        this.emma.setScale(this.background.scale.x, this.background.scale.y);
        this.emma.setPosition(this.background.scale.x, this.background.scale.y);

        this.julie.setScale(this.background.scale.x, this.background.scale.y);
        this.julie.setPosition(this.background.scale.x, this.background.scale.y);

        this.danny.setScale(this.background.scale.x, this.background.scale.y);
        this.danny.setPosition(this.background.scale.x, this.background.scale.y);

        this.mike.setScale(this.background.scale.x, this.background.scale.y);
        this.mike.setPosition(this.background.scale.x, this.background.scale.y);

    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
