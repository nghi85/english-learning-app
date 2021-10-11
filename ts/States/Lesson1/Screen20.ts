import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import CommonButton from '../../Objects/CommonButton';
import SoundManager from '../../Managers/SoundManager';
import TapCharacter from '../../Objects/TapCharacter';

export default class Lesson1Screen20 extends Phaser.State {
    public static Name: string = 'lesson1_screen20';

    public name: string = Lesson1Screen20.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;
    private playBtn: CommonButton;

    private guitar: TapCharacter;
    private canvas: TapCharacter;
    private clock: TapCharacter;
    private map: TapCharacter;
    private note1: TapCharacter;
    private note2: TapCharacter;
    private picture1: TapCharacter;
    private picture2: TapCharacter;
    private toy: TapCharacter;

    private bag: TapCharacter;
    private ball: TapCharacter;
    private book: TapCharacter;
    private bus: TapCharacter;
    private glue: TapCharacter;
    private glueBig: TapCharacter;
    private paint: TapCharacter;
    private paintBig: TapCharacter;
    private paper: TapCharacter;
    private paperBig: TapCharacter;
    private scissors: TapCharacter;
    private scissorsBig: TapCharacter;

    private isPlayingSript: boolean;
    private navigator_ui: NavigatorUI;
    private timeout: any;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_20);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_20);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.bag = new TapCharacter(this.game, Images.L1_20_Bag, 118 * scale_size, 754 * scale_size, 'Bag', 167 * scale_size, 830 * scale_size);
        this.ball = new TapCharacter(this.game, Images.L1_20_Ball, 1330 * scale_size, 705 * scale_size, 'Ball', 1340 * scale_size, 718 * scale_size);
        this.book = new TapCharacter(this.game, Images.L1_20_Book, 876 * scale_size, 575 * scale_size, 'Book', 948 * scale_size, 610 * scale_size);
        this.bus = new TapCharacter(this.game, Images.L1_20_Bus, 336 * scale_size, 643 * scale_size, 'Bus', 403 * scale_size, 683 * scale_size);

        this.guitar = new TapCharacter(this.game, Images.L1_20_Guitar, 32 * scale_size, 388 * scale_size, 'Guitar', 53 * scale_size, 536 * scale_size);
        this.canvas = new TapCharacter(this.game, Images.L1_20_Canvas, 490 * scale_size, 165 * scale_size, 'Canvas', 620 * scale_size, 275 * scale_size);
        this.clock = new TapCharacter(this.game, Images.L1_20_Clock, 1175 * scale_size, 113 * scale_size, 'Clock', 1203 * scale_size, 140 * scale_size);
        this.map = new TapCharacter(this.game, Images.L1_20_Map, 1190 * scale_size, 380 * scale_size, 'Map', 1237 * scale_size, 458 * scale_size);
        this.note1 = new TapCharacter(this.game, Images.L1_20_Note_1, 134 * scale_size, 202 * scale_size, 'Note', 134 * scale_size, 208 * scale_size);
        this.note2 = new TapCharacter(this.game, Images.L1_20_Note_2, 134 * scale_size, 333 * scale_size, 'Note', 134 * scale_size, 345 * scale_size);
        this.picture1 = new TapCharacter(this.game, Images.L1_20_Picture_1, 248 * scale_size, 160 * scale_size, 'Picture', 290 * scale_size, 230 * scale_size);
        this.picture2 = new TapCharacter(this.game, Images.L1_20_Picture_2, 1740 * scale_size, 224 * scale_size, 'Picture', 1778 * scale_size, 294 * scale_size);
        this.toy = new TapCharacter(this.game, Images.L1_20_Toy, 1730 * scale_size, 668 * scale_size, 'Toy', 1765 * scale_size, 695 * scale_size);

        this.glue = new TapCharacter(this.game, Images.L1_20_Glue, 676 * scale_size, 805 * scale_size, 'Glue', 686 * scale_size, 896 * scale_size);
        this.glueBig = new TapCharacter(this.game, Images.L1_20_Glue_Big, 1490 * scale_size, 800 * scale_size, 'Glue', 1503 * scale_size, 891 * scale_size);
        this.paint = new TapCharacter(this.game, Images.L1_20_Paint, 412 * scale_size, 843 * scale_size, 'Paint', 454 * scale_size, 870 * scale_size);
        this.paintBig = new TapCharacter(this.game, Images.L1_20_Paint_Big, 1050 * scale_size, 720 * scale_size, 'Paint', 1092 * scale_size, 769 * scale_size);
        this.paper = new TapCharacter(this.game, Images.L1_20_Paper, 900 * scale_size, 870 * scale_size, 'Paper', 942 * scale_size, 907 * scale_size);
        this.paperBig = new TapCharacter(this.game, Images.L1_20_Paper_Big, 1490 * scale_size, 594 * scale_size, 'Paper', 1550 * scale_size, 652 * scale_size);
        this.scissors = new TapCharacter(this.game, Images.L1_20_Scissors, 690 * scale_size, 614 * scale_size, 'Scissors', 725 * scale_size, 654 * scale_size);
        this.scissorsBig = new TapCharacter(this.game, Images.L1_20_Scissors_Big, 1210 * scale_size, 860 * scale_size, 'Scissors', 1274 * scale_size, 900 * scale_size);

        this.playBtn = new CommonButton(this.game, 0, 0, 'Play', this.playAction, this);
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

        this.guitar.setScale(this.background.scale.x, this.background.scale.y);
        this.guitar.setPosition(this.background.scale.x, this.background.scale.y);

        this.canvas.setScale(this.background.scale.x, this.background.scale.y);
        this.canvas.setPosition(this.background.scale.x, this.background.scale.y);

        this.clock.setScale(this.background.scale.x, this.background.scale.y);
        this.clock.setPosition(this.background.scale.x, this.background.scale.y);

        this.map.setScale(this.background.scale.x, this.background.scale.y);
        this.map.setPosition(this.background.scale.x, this.background.scale.y);

        this.note1.setScale(this.background.scale.x, this.background.scale.y);
        this.note1.setPosition(this.background.scale.x, this.background.scale.y);

        this.note2.setScale(this.background.scale.x, this.background.scale.y);
        this.note2.setPosition(this.background.scale.x, this.background.scale.y);

        this.picture1.setScale(this.background.scale.x, this.background.scale.y);
        this.picture1.setPosition(this.background.scale.x, this.background.scale.y);

        this.picture2.setScale(this.background.scale.x, this.background.scale.y);
        this.picture2.setPosition(this.background.scale.x, this.background.scale.y);

        this.toy.setScale(this.background.scale.x, this.background.scale.y);
        this.toy.setPosition(this.background.scale.x, this.background.scale.y);

        this.bag.setScale(this.background.scale.x, this.background.scale.y);
        this.bag.setPosition(this.background.scale.x, this.background.scale.y);

        this.ball.setScale(this.background.scale.x, this.background.scale.y);
        this.ball.setPosition(this.background.scale.x, this.background.scale.y);

        this.book.setScale(this.background.scale.x, this.background.scale.y);
        this.book.setPosition(this.background.scale.x, this.background.scale.y);

        this.bus.setScale(this.background.scale.x, this.background.scale.y);
        this.bus.setPosition(this.background.scale.x, this.background.scale.y);

        this.glue.setScale(this.background.scale.x, this.background.scale.y);
        this.glue.setPosition(this.background.scale.x, this.background.scale.y);

        this.glueBig.setScale(this.background.scale.x, this.background.scale.y);
        this.glueBig.setPosition(this.background.scale.x, this.background.scale.y);

        this.paint.setScale(this.background.scale.x, this.background.scale.y);
        this.paint.setPosition(this.background.scale.x, this.background.scale.y);

        this.paintBig.setScale(this.background.scale.x, this.background.scale.y);
        this.paintBig.setPosition(this.background.scale.x, this.background.scale.y);

        this.paper.setScale(this.background.scale.x, this.background.scale.y);
        this.paper.setPosition(this.background.scale.x, this.background.scale.y);

        this.paperBig.setScale(this.background.scale.x, this.background.scale.y);
        this.paperBig.setPosition(this.background.scale.x, this.background.scale.y);

        this.scissors.setScale(this.background.scale.x, this.background.scale.y);
        this.scissors.setPosition(this.background.scale.x, this.background.scale.y);

        this.scissorsBig.setScale(this.background.scale.x, this.background.scale.y);
        this.scissorsBig.setPosition(this.background.scale.x, this.background.scale.y);

        this.playBtn.width = this.playBtn.width * Math.max(this.background.scale.x, this.background.scale.y);
        this.playBtn.height = this.playBtn.height * Math.max(this.background.scale.x, this.background.scale.y);
        this.playBtn.x = 20;
        this.playBtn.y = 20;
    }

    private playScript(): void {
        SoundManager.getInstance(this.game).play(Sounds.Sound_W4B3);
        this.updateCorrectName('Paper');
        this.timeout = setTimeout(() => {
            SoundManager.getInstance(this.game).play(Sounds.Sound_W4B4);
            this.updateCorrectName('Paint');
            setTimeout(() => {
                SoundManager.getInstance(this.game).play(Sounds.Sound_W4B2);
                this.updateCorrectName('Glue');
                setTimeout(() => {
                    SoundManager.getInstance(this.game).play(Sounds.Sound_W4B1);
                    this.updateCorrectName('Scissors');
                    // temporarilly
                    setTimeout(() => {
                        this.isPlayingSript = false;
                        this.updateCorrectName('');
                        this.resetAll();
                    }, 15000);
                }, 15000);
            }, 15000);
        }, 15000);
    }

    public updateCorrectName(name: string): void {
        this.guitar.correctName = name;
        this.canvas.correctName = name;
        this.clock.correctName = name;
        this.map.correctName = name;
        this.note1.correctName = name;
        this.note2.correctName = name;
        this.picture1.correctName = name;
        this.picture2.correctName = name;
        this.toy.correctName = name;
        this.bag.correctName = name;
        this.ball.correctName = name;
        this.book.correctName = name;
        this.bus.correctName = name;
        this.glue.correctName = name;
        this.glueBig.correctName = name;
        this.paint.correctName = name;
        this.paintBig.correctName = name;
        this.paper.correctName = name;
        this.paperBig.correctName = name;
        this.scissors.correctName = name;
        this.scissorsBig.correctName = name;
        this.resetAll();
    }

    public shutdown(): void {
        super.shutdown();
        SoundManager.getInstance(this.game).stop(Sounds.Sound_W4B3);
        SoundManager.getInstance(this.game).stop(Sounds.Sound_W4B4);
        SoundManager.getInstance(this.game).stop(Sounds.Sound_W4B2);
        SoundManager.getInstance(this.game).stop(Sounds.Sound_W4B1);
        clearTimeout(this.timeout);
        this.background = null;
    }

    public playAction(): void {
        if (!this.isPlayingSript) {
            this.isPlayingSript = true;
            this.playScript();
        }
    }

    public resetAll(): void {
        this.guitar.reset();
        this.canvas.reset();
        this.clock.reset();
        this.map.reset();
        this.note1.reset();
        this.note2.reset();
        this.picture1.reset();
        this.picture2.reset();
        this.toy.reset();
        this.bag.reset();
        this.ball.reset();
        this.book.reset();
        this.bus.reset();
        this.glue.reset();
        this.glueBig.reset();
        this.paint.reset();
        this.paintBig.reset();
        this.paper.reset();
        this.paperBig.reset();
        this.scissors.reset();
        this.scissorsBig.reset();
    }
}
