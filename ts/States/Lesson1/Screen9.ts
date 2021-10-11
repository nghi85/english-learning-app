import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';

export default class Lesson1Screen9 extends Phaser.State {
    public static Name: string = 'lesson1_screen9';
    public static pause: boolean = false;

    public name: string = Lesson1Screen9.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;
    private tree: Phaser.Image;

    private julie: Character;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_7);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_7);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.julie = new Character(
            this.game, Images.L1_4_Julie, 385 * scale_size, 490 * scale_size, 800 * scale_size,
            Images.L1_4_Juliebox, 1008 * scale_size, 210 * scale_size, Sounds.Sound_2B, 18, 3, "Hi, I'm Julie", true, false, false, true
        );

        this.tree = this.game.add.image(230 * scale_size, 72 * scale_size, Images.Tree_L1_7);

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

        this.navigator_ui.resize(this.background);

        this.presentation.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.presentation.x = this.game.width - this.presentation.width - 20;

        this.tree.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.tree.x = this.tree.x * this.background.scale.x;

        this.julie.setScale(this.background.scale.x, this.background.scale.y);
        this.julie.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
