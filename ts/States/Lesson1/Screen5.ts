import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';
import Character from '../../Objects/Character';

import {Sounds, Constants, Images} from '../../Data';
import SoundManager from '../../Managers/SoundManager';
import CommonButton from '../../Objects/CommonButton';
import NavigatorUI from '../../Objects/NavigatorUI';

export default class Lesson1Screen5 extends Phaser.State {
    public static Name: string = 'lesson1_screen5';
    public static pause: boolean = false;

    public name: string = Lesson1Screen5.Name;
    public game: IGame;

    private danny: Character;
    private emma: Character;
    private julie: Character;
    private mike: Character;

    private background: Phaser.Image;
    private presentation: Phaser.Image;
    private playBtn: CommonButton;

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

        this.background = this.game.add.image(0, 0, Images.Background_L1_4);
        this.presentation = this.game.add.image(0, 20, Images.Presentation_L1_5);

        let scale_size: number = 1;
        if (!this.game.device.desktop) {
            if (window.innerWidth >= 1024) {
                scale_size = 1;
            } else {
                scale_size = 0.5;
            }
        }

        this.danny = new Character(
            this.game, Images.L1_4_Danny, 928 * scale_size, 422 * scale_size, null,
            Images.L1_4_Dannybox, 1110 * scale_size, 150 * scale_size, null, null, null, "Hello, I'm Danny", false, false, false, false
        );
        this.emma = new Character(
            this.game, Images.L1_4_Emma, 543 * scale_size, 477 * scale_size, null,
            Images.L1_4_Emmabox, 700 * scale_size, 185 * scale_size, null, null, null, "Hello, I'm Emma", false, false, false, false
        );
        this.julie = new Character(
            this.game, Images.L1_4_Julie, 102 * scale_size, 412 * scale_size, null,
            Images.L1_4_Juliebox, 250 * scale_size, 150 * scale_size, null, null, null, "Hello, I'm Julie", false, false, false, false
        );
        this.mike = new Character(
            this.game, Images.L1_4_Mike, 1480 * scale_size, 430 * scale_size, null,
            Images.L1_4_Mikebox, 1144 * scale_size, 150 * scale_size, null, null, null, "Hello, I'm Mike", false, false, false, false
        );

        this.emitter = this.game.add.emitter(this.game.world.centerX, 50, 300);
        this.playBtn = new CommonButton(this.game, 0, 0, 'Play', this.playAction, this);
        this.navigator_ui = new NavigatorUI(this.game, this.name);
        this.resize();
    }

    private playScript(): void {
        SoundManager.getInstance(this.game).play(Sounds.Sound_3C);
        this.playNoteParticles(9, 58);
        this.julie.playByPlan('[{"start": 13, "stop": 17}, {"start": 28, "stop": 30}, {"start": 43, "stop": 47}]', true);
        this.danny.playByPlan('[{"start": 17, "stop": 21}, {"start": 30, "stop": 32}, {"start": 47, "stop": 51}]', true);
        this.emma.playByPlan('[{"start": 21, "stop": 25}, {"start": 32, "stop": 34}, {"start": 51, "stop": 54}]', true);
        this.mike.playByPlan('[{"start": 25, "stop": 28}, {"start": 34, "stop": 38}, {"start": 55, "stop": 57}]', true);
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

        this.navigator_ui.resize(this.background);

        this.presentation.scale.setTo(this.background.scale.x, this.background.scale.y);
        this.presentation.x = this.game.width - this.presentation.width - 20;

        this.danny.setScale(this.background.scale.x, this.background.scale.y);
        this.danny.setPosition(this.background.scale.x, this.background.scale.y);

        this.mike.setScale(this.background.scale.x, this.background.scale.y);
        this.mike.setPosition(this.background.scale.x, this.background.scale.y);

        this.julie.setScale(this.background.scale.x, this.background.scale.y);
        this.julie.setPosition(this.background.scale.x, this.background.scale.y);

        this.emma.setScale(this.background.scale.x, this.background.scale.y);
        this.emma.setPosition(this.background.scale.x, this.background.scale.y);

        this.playBtn.width = this.playBtn.width * Math.max(this.background.scale.x, this.background.scale.y);
        this.playBtn.height = this.playBtn.height * Math.max(this.background.scale.x, this.background.scale.y);
        this.playBtn.x = 20;
        this.playBtn.y = 20;
    }

    public shutdown(): void {
        super.shutdown();
        SoundManager.getInstance(this.game).stop(Sounds.Sound_3C);
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
