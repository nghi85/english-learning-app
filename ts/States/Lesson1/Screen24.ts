import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import ChooseAnswers from '../../Objects/ChooseAnswers';
import Character from '../../Objects/Character';

export default class Lesson1Screen24 extends Phaser.State {
    public static Name: string = 'lesson1_screen24';
    public static pause: boolean = false;

    public name: string = Lesson1Screen24.Name;
    public game: IGame;

    public mike: Character;
    public glue: ChooseAnswers;
    public paper: ChooseAnswers;
    public paint: ChooseAnswers;

    private background: Phaser.Image;
    private presentation: Phaser.Image;
    private question: Phaser.Image;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_23);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_23);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.mike = new Character(
            this.game, Images.L1_24_Mike, 260 * scale_size, 390 * scale_size, 260 * scale_size,
            Images.L1_22_Paintpop, 360 * scale_size, 100 * scale_size, Sounds.Sound_5C, 25.5, 2, 'I have paint', false, false, false, false
        );

        this.question = this.game.add.image(760 * scale_size, 500 * scale_size, Images.L1_23_Question);

        this.glue = new ChooseAnswers(
            this.game, Images.L1_23_Glue, Images.L1_23_Glue_True, Images.L1_23_Glue_False, 760 * scale_size, 720 * scale_size,
            680 * scale_size, 345 * scale_size, 15 * scale_size, 'Glue', 'Paint', 0
        );
        this.paper = new ChooseAnswers(
            this.game, Images.L1_23_Paper, Images.L1_23_Paper_True, Images.L1_23_Paper_False, 760 * scale_size, 720 * scale_size,
            680 * scale_size, 345 * scale_size, 15 * scale_size, 'Paper', 'Paint', 1
        );
        this.paint = new ChooseAnswers(
            this.game, Images.L1_23_Paint, Images.L1_23_Paint_True, Images.L1_23_Paint_False, 760 * scale_size, 720 * scale_size,
            680 * scale_size, 345 * scale_size, 15 * scale_size, 'Paint', 'Paint', 2
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

        this.mike.setScale(this.background.scale.x, this.background.scale.y);
        this.mike.setPosition(this.background.scale.x, this.background.scale.y);

        this.question.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.question.x = this.question.x * this.background.scale.x;
        this.question.y = this.question.y * this.background.scale.y;

        this.glue.setScale(this.background.scale.x, this.background.scale.y);
        this.glue.setPosition(this.background.scale.x, this.background.scale.y);

        this.paper.setScale(this.background.scale.x, this.background.scale.y);
        this.paper.setPosition(this.background.scale.x, this.background.scale.y);

        this.paint.setScale(this.background.scale.x, this.background.scale.y);
        this.paint.setPosition(this.background.scale.x, this.background.scale.y);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
