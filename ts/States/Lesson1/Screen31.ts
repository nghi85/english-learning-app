import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';

export default class Lesson1Screen31 extends Phaser.State {
    public static Name: string = 'lesson1_screen31';
    public static pause: boolean = false;

    public name: string = Lesson1Screen31.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_31);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_31);

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
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
