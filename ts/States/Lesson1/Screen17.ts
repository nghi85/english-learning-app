import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';
import RectanglePicture from '../../Objects/RectanglePicture';

export default class Lesson1Screen17 extends Phaser.State {
    public static Name: string = 'lesson1_screen17';
    public static pause: boolean = false;

    public name: string = Lesson1Screen17.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private mike: Character;

    private glue: RectanglePicture;
    private scissors: RectanglePicture;
    private paint: RectanglePicture;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_16);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_16);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.mike = new Character(
            this.game, Images.L1_17_Mike, 200 * scale_size, 525 * scale_size, 235 * scale_size,
            Images.L1_17_Paintbox, 355 * scale_size, 316 * scale_size, Sounds.Sound_4B, 12.5, 1, 'Paint', true, false, false, false
        );

        this.glue = new RectanglePicture(this.game, Images.L1_16_Glue, 720 * scale_size, 384 * scale_size, 0, 'Glue', 'Paint', 0);
        this.scissors = new RectanglePicture(this.game, Images.L1_16_Scissors, 720 * scale_size, 384 * scale_size, 56 * scale_size, 'Scissors', 'Paint', 1);
        this.paint = new RectanglePicture(this.game, Images.L1_16_Paint, 720 * scale_size, 384 * scale_size, 56 * scale_size, 'Paint', 'Paint', 2);

        this.glue.callbackHandleClick.add(() => {
            this.scissors.reset();
            this.paint.reset();
        });
        this.scissors.callbackHandleClick.add(() => {
            this.glue.reset();
            this.paint.reset();
        });
        this.paint.callbackHandleClick.add(() => {
            this.glue.reset();
            this.scissors.reset();
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

        this.mike.setScale(this.background.scale.x, this.background.scale.y);
        this.mike.setPosition(this.background.scale.x, this.background.scale.y);

        this.glue.setScale(this.background.scale.x, this.background.scale.y);
        this.glue.setPosition(this.background.scale.x, this.background.scale.y);

        this.scissors.setScale(this.background.scale.x, this.background.scale.y);
        this.scissors.setPosition(this.background.scale.x, this.background.scale.y);

        this.paint.setScale(this.background.scale.x, this.background.scale.y);
        this.paint.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
