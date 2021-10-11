import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';

export default class Lesson1Screen13 extends Phaser.State {
    public static Name: string = 'lesson1_screen13';
    public static pause: boolean = false;

    public name: string = Lesson1Screen13.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private glue: Character;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_13);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_12);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.glue = new Character(
            this.game, Images.L1_13_Glue, 720 * scale_size, 390 * scale_size, null,
            Images.L1_13_Gluebox, 750 * scale_size, 180 * scale_size, Sounds.Sound_4A, 20, 2, 'Glue', true, false, false, false
        );

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

        this.glue.setScale(this.background.scale.x, this.background.scale.y);
        this.glue.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}