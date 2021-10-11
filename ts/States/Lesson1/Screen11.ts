import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';

export default class Lesson1Screen11 extends Phaser.State {
    public static Name: string = 'lesson1_screen11';
    public static pause: boolean = false;

    public name: string = Lesson1Screen11.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;
    private box: Phaser.Image;
    private items: Phaser.Image;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_11);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_11);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.box = this.game.add.image(810 * scale_size, 670 * scale_size, Images.L1_11_Box);
        this.box.inputEnabled = true;

        this.items = this.game.add.image(630 * scale_size, 650 * scale_size, Images.L1_11_Items);
        this.items.visible = false;

        this.box.events.onInputDown.add(() => {
          this.box.visible = false;
          this.items.visible = true;
        }, this);

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

        this.box.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.box.x = this.box.x * this.background.scale.x;
        this.box.y = this.box.y * this.background.scale.y;

        this.items.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.items.x = this.items.x * this.background.scale.x;
        this.items.y = this.items.y * this.background.scale.y;

        this.navigator_ui.resize(this.background);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
