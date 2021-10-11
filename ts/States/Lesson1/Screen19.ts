import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';
import RectanglePicture from '../../Objects/RectanglePicture';

export default class Lesson1Screen19 extends Phaser.State {
    public static Name: string = 'lesson1_screen19';
    public static pause: boolean = false;

    public name: string = Lesson1Screen19.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;

    private danny: Character;

    private paint: RectanglePicture;
    private scissors: RectanglePicture;
    private paper: RectanglePicture;

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

        this.danny = new Character(
            this.game, Images.L1_19_Danny, 217 * scale_size, 525 * scale_size, 217 * scale_size,
            Images.L1_19_Paperbox, 355 * scale_size, 316 * scale_size, Sounds.Sound_4B, 9, 1.5, 'Paper', true, false, false, false
        );

        this.paint = new RectanglePicture(this.game, Images.L1_16_Paint, 720 * scale_size, 384 * scale_size, 0, 'Paint', 'Paper', 0);
        this.paper = new RectanglePicture(this.game, Images.L1_16_Paper, 720 * scale_size, 384 * scale_size, 56 * scale_size, 'Paper', 'Paper', 1);
        this.scissors = new RectanglePicture(this.game, Images.L1_16_Scissors, 720 * scale_size, 384 * scale_size, 56 * scale_size, 'Scissors', 'Paper', 2);

        this.paint.callbackHandleClick.add(() => {
            this.scissors.reset();
            this.paper.reset();
        });
        this.scissors.callbackHandleClick.add(() => {
            this.paint.reset();
            this.paper.reset();
        });
        this.paper.callbackHandleClick.add(() => {
            this.paint.reset();
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

        this.danny.setScale(this.background.scale.x, this.background.scale.y);
        this.danny.setPosition(this.background.scale.x, this.background.scale.y);

        this.paint.setScale(this.background.scale.x, this.background.scale.y);
        this.paint.setPosition(this.background.scale.x, this.background.scale.y);

        this.paper.setScale(this.background.scale.x, this.background.scale.y);
        this.paper.setPosition(this.background.scale.x, this.background.scale.y);

        this.scissors.setScale(this.background.scale.x, this.background.scale.y);
        this.scissors.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
