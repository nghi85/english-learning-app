import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';

export default class Lesson1Screen22 extends Phaser.State {
    public static Name: string = 'lesson1_screen22';
    public static pause: boolean = false;

    public name: string = Lesson1Screen22.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private julie: Character;
    private danny: Character;
    private emma: Character;
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

        this.background = this.game.add.image(0, 0, Images.Background_L1_22);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_22);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.julie = new Character(
            this.game, Images.L1_22_Julie, 280 * scale_size, 400 * scale_size, 280 * scale_size,
            Images.L1_22_Scissorspop, 430 * scale_size, 125 * scale_size, Sounds.Sound_5C, 20, 3, 'I have scissors', true, false, false, false
        );
        this.danny = new Character(
            this.game, Images.L1_22_Danny, 664 * scale_size, 400 * scale_size, 664 * scale_size,
            Images.L1_22_Gluepop, 770 * scale_size, 125 * scale_size, Sounds.Sound_5C, 13.5, 2, 'I have glue', true, false, false, false
        );
        this.emma = new Character(
            this.game, Images.L1_22_Emma, 1000 * scale_size, 420 * scale_size, 1000 * scale_size,
            Images.L1_22_Paperpop, 1100 * scale_size, 125 * scale_size, Sounds.Sound_5C, 7.5, 2, 'I have paper', true, false, false, false
        );
        this.mike = new Character(
            this.game, Images.L1_22_Mike, 1375 * scale_size, 400 * scale_size, 1375 * scale_size,
            Images.L1_22_Paintpop, 1090 * scale_size, 125 * scale_size, Sounds.Sound_5C, 25.5, 2, 'I have paint', true, false, false, false
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

        this.julie.setScale(this.background.scale.x, this.background.scale.y);
        this.julie.setPosition(this.background.scale.x, this.background.scale.y);

        this.danny.setScale(this.background.scale.x, this.background.scale.y);
        this.danny.setPosition(this.background.scale.x, this.background.scale.y);

        this.emma.setScale(this.background.scale.x, this.background.scale.y);
        this.emma.setPosition(this.background.scale.x, this.background.scale.y);

        this.mike.setScale(this.background.scale.x, this.background.scale.y);
        this.mike.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
