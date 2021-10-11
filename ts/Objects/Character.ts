import 'p2';
import 'pixi';
import 'phaser';
import { Sound } from 'phaser';
import SpeechBubble from './SpeechBubble';
import CaptionManager from './CaptionManager';

export default class Character extends Phaser.Group {
    protected image: Phaser.Image;
    private speechB: SpeechBubble;
    private caption: CaptionManager;
    private musicNotes: Phaser.Sprite;
    private clickWithBubble: boolean;
    private clickWithNotes: boolean;
    private clickWithCaption: boolean;
    private clickMoveWithAnimate: boolean;
    private device_pos_x: number;
    private device_pos_y: number;
    private device_pos_x_end: number;
    private quote: string;
    private sound: Sound;
    public callbackHandleClick: Phaser.Signal;

    constructor(game: Phaser.Game, image: string, device_pos_x: number, device_pos_y: number, device_pos_x_end: number,
                imageBubble: string, device_bubble_pos_x: number, device_bubble_pos_y: number, soundName: string, s_start: number,
                s_end: number, quote: string, clickWithBubble: boolean, clickWithNotes: boolean, clickWithCaption: boolean, clickMoveWithAnimate: boolean) {
        super(game);

        this.clickWithBubble = clickWithBubble;
        this.clickWithNotes = clickWithNotes;
        this.clickWithCaption =  clickWithCaption;
        this.clickMoveWithAnimate =  clickMoveWithAnimate;
        this.device_pos_x = device_pos_x;
        this.device_pos_y =  device_pos_y;
        this.device_pos_x_end = device_pos_x_end;
        this.image = this.game.add.image(device_pos_x, device_pos_y, image, 0);
        this.image.inputEnabled = true;
        this.image.hitArea = new Phaser.Rectangle(this.image.width / 4, 0, this.image.width / 2, this.image.height);
        // music notes
        this.musicNotes = this.game.add.sprite(device_pos_x + this.image.width * 2 / 3, device_pos_y, 'music', 0);
        this.musicNotes.y = this.musicNotes.y - this.musicNotes.height / 2 + this.image.height / 3;
        this.musicNotes.animations.add('playing', Phaser.Animation.generateFrameNames('3C-Music-', 0, 53, '.png', 5), 10, true);

        if (soundName) {
            this.sound = this.game.add.audio(soundName);
            this.sound.addMarker(image, s_start, s_end, 4);
        }
        this.image.events.onInputDown.add(listener, this);
        this.speechB = new SpeechBubble(this.game, device_bubble_pos_x, device_bubble_pos_y, 418, 278, imageBubble);
        this.caption = CaptionManager.getInstance(this.game, this.game.width / 2, this.game.height - 150);
        this.quote = quote;

        this.callbackHandleClick = new Phaser.Signal();

        function listener(): void {
            this.image.play('moving');
            if (this.clickWithCaption) {
                this.caption.drawText(quote, this);
            }
            if (clickWithBubble && !clickMoveWithAnimate) {
                this.speechB.showSpeechBubble();
                setTimeout(() => {
                    this.speechB.hideSpeechBubble();
                }, 2000);
            } else if (clickWithBubble && clickMoveWithAnimate) {
                this.moveWithAnimate();
            } else if (clickWithNotes) {
                this.musicNotes.play('playing');
            }
            if (this.sound) {
                this.sound.play(image);
                this.sound.onStop.addOnce(() => {
                    this.stopAnimate();
                });
            }
            this.callbackHandleClick.dispatch();
        }
        this.game.add.existing(this);
    }

    public setSize(width: number, height: number): void {
        this.image.width = width;
        this.image.height = height;
    }

    public setScale(scale_x: number, scale_y: number): void {
        this.image.scale.setTo(scale_x, scale_y);
        this.musicNotes.scale.setTo(scale_x, scale_y);
        this.speechB.setScale(scale_x, scale_y);
    }

    public setPosition(x: number, y: number): void {
        this.image.x = this.image.x * x;
        this.image.y = this.image.y * y;
        this.musicNotes.x = this.musicNotes.x * x;
        this.musicNotes.y = this.musicNotes.y * y;
        this.speechB.setPosition(x, y);
        this.caption.setPosition(this.game.width / 2, this.game.height - 100);
    }

    public moveWithAnimate(): void {
        const tween: Phaser.Tween = this.game.add.tween(this.image);
        tween.to({ x: this.device_pos_x_end - (this.device_pos_x / 1.5) }, 700, Phaser.Easing.Linear.None, true).onComplete.add(() => {
            this.animateWithBubble();
        });
    }

    // animate without sound and loop
    public animateWithBubble(): void {
        this.image.play('moving', null, true);
        this.speechB.showSpeechBubble();
    }

    // animate without sound and loop
    public animateWithMusicNotes(): void {
        this.image.play('moving', null, true);
        this.musicNotes.play('playing');
    }

    // animate the character to center
    public animateWithCaptionCenter(): void {
        this.device_pos_x = this.image.x;
        this.device_pos_y = this.image.y;
        this.caption.drawText(this.quote, this);
        this.image.play('moving', null, true);
        this.image.x = this.game.width / 2 - this.image.width / 2;
        this.fadeIn();
    }

    // animate without sound
     public stopAnimate(): void {
        this.image.animations.stop(null, true);
        if (this.clickWithBubble) {
            this.speechB.hideSpeechBubble();
        } else if (this.clickWithNotes) {
            this.musicNotes.animations.stop(null, true);
        }
    }

    public fadeIn(): void {
        this.image.alpha = 0;
        this.game.add.tween(this.image).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    public fadeOut(): void {
        this.image.alpha = 1;
        this.game.add.tween(this.image).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    public hide(): void {
        this.image.alpha = 0;
    }

    public playByPlan(json: string, playSingleAnimation: boolean): void {
        const script: IScriptItem[] = JSON.parse(json) as IScriptItem[];
        script.forEach((item: IScriptItem) => {
            setTimeout(() => {
                if (playSingleAnimation) {
                    this.image.play('moving', null, true);
                    this.caption.drawText(this.quote, this);
                } else {
                    if (this.clickWithBubble && !this.clickMoveWithAnimate) {
                        this.animateWithBubble();
                    } else if (this.clickWithBubble && this.clickMoveWithAnimate) {
                        this.moveWithAnimate();
                    } else if (this.clickWithNotes) {
                        this.animateWithMusicNotes();
                    }
                    if (this.clickWithCaption) {
                        this.animateWithCaptionCenter();
                    }
                }
            }, item.start * 1000);
            setTimeout(() => {
                this.stopAnimate();
                this.caption.drawText('', this);
                if (!playSingleAnimation) {
                    if (this.clickWithCaption) {
                        this.fadeOut();
                    }
                }
            }, item.stop * 1000);
        });
    }

    public resetPosition(): void {
        this.image.x = this.device_pos_x;
        this.image.y = this.device_pos_y;
    }

    public reset(): void {
        if (this.sound) {
            this.sound.stop();
        }
        this.stopAnimate();
    }
}

interface IScriptItem {
    start: number;
    stop: number;
}
