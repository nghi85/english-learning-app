import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Images, Sounds } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import Character from '../../Objects/Character';
import SoundManager from '../../Managers/SoundManager';
import CommonButton from '../../Objects/CommonButton';

export default class Lesson1Screen27 extends Phaser.State {
    public static Name: string = 'lesson1_screen27';
    public static pause: boolean = false;

    public name: string = Lesson1Screen27.Name;
    public game: IGame;

    private background: Phaser.Image;
    private presentation: Phaser.Image;
    private playBtn: CommonButton;

    private julie: Character;
    private danny: Character;
    private emma: Character;
    private mike: Character;

    private isPlayingSript: boolean;
    private navigator_ui: NavigatorUI;

    private emitter: Phaser.Particles.Arcade.Emitter;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_22);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_5);

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
            Images.L1_22_Scissorspop, 430 * scale_size, 125 * scale_size, null, null, null, 'I have scissors', false, false, false, false
        );
        this.danny = new Character(
            this.game, Images.L1_22_Danny, 664 * scale_size, 400 * scale_size, 664 * scale_size,
            Images.L1_22_Gluepop, 770 * scale_size, 125 * scale_size, null, null, null, 'I have glue', false, false, false, false
        );
        this.emma = new Character(
            this.game, Images.L1_22_Emma, 1000 * scale_size, 420 * scale_size, 1000 * scale_size,
            Images.L1_22_Paperpop, 1100 * scale_size, 125 * scale_size, null, null, null, 'I have paper', false, false, false, false
        );
        this.mike = new Character(
            this.game, Images.L1_22_Mike, 1375 * scale_size, 400 * scale_size, 1375 * scale_size,
            Images.L1_22_Paintpop, 1090 * scale_size, 125 * scale_size, null, null, null, 'I have paint', false, false, false, false
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

        this.emitter = this.game.add.emitter(this.game.world.centerX, 50, 300);
        this.playBtn = new CommonButton(this.game, 0, 0, 'Play', this.playAction, this);
        this.navigator_ui = new NavigatorUI(this.game, this.name);
        this.resize();
    }

    private playScript(): void {
        SoundManager.getInstance(this.game).play(Sounds.Sound_5D);
        this.playNoteParticles(9, 83);
        this.danny.playByPlan('[{"start": 18, "stop": 22}, {"start": 54, "stop": 58}]', true);
        this.mike.playByPlan('[{"start": 27, "stop": 30}, {"start": 63, "stop": 66}]', true);
        this.emma.playByPlan('[{"start": 12, "stop": 17}, {"start": 48, "stop": 53}]', true);
        this.julie.playByPlan('[{"start": 22, "stop": 26}, {"start": 58, "stop": 62}]', true);
        setTimeout(() => {
            this.isPlayingSript = false;
        }, 26000);
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

        this.playBtn.width = this.playBtn.width * Math.max(this.background.scale.x, this.background.scale.y);
        this.playBtn.height = this.playBtn.height * Math.max(this.background.scale.x, this.background.scale.y);
        this.playBtn.x = 20;
        this.playBtn.y = 20;
    }

    public shutdown(): void {
        super.shutdown();
        SoundManager.getInstance(this.game).stop(Sounds.Sound_5D);
        this.background = null;
    }

    public playAction(): void {
        if (!this.isPlayingSript) {
            this.isPlayingSript = true;
            this.playScript();
        }
    }

    public stopAllAnimation(): void {
        this.danny.stopAnimate();
        this.mike.stopAnimate();
        this.julie.stopAnimate();
        this.danny.stopAnimate();
    }

    public playNoteParticles(start: number, end: number): void {
        setTimeout(() => {
            this.emitter.makeParticles(Images.Music_Note);
            this.emitter.minParticleSpeed.setTo(-300, 30);
            this.emitter.maxParticleSpeed.setTo(300, 100);
            this.emitter.minParticleScale = 0.4;
            this.emitter.maxParticleScale = 0.7;
            this.emitter.gravity = 200;
            this.emitter.flow(3000, 500, 5, -1);
        }, start * 1000);
        setTimeout(() => {
            this.emitter.destroy();
        }, end * 1000);
    }
}
