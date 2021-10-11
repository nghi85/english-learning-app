import 'p2';
import 'pixi';
import 'phaser';
import { Images } from '../Data';

export default class SpeechBubble extends Phaser.Group {
    private bubble: Phaser.Image;
    private bubbleWidth: number;
    private bubbleHeight: number;

    constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, image: string) {
        super(game);
        this.bubbleWidth = width;
        this.bubbleHeight = height;
        this.bubble = this.game.add.image(x, y, image);
        this.bubble.visible = false;
    }

    public getBubble(): Phaser.Image {
        return this.bubble;
    }

    public showSpeechBubble (): void {
        this.bubble.visible = true;
        if (this.game) {
            this.game.world.bringToTop(this.bubble);
        }
    }

    public hideSpeechBubble(): void {
        this.bubble.visible = false;
    }

    public setPosition(x: number, y: number): void {
        this.bubble.x = this.bubble.x * x;
        this.bubble.y = this.bubble.y * y;
    }

    public setScale(scale_x: number, scale_y: number): void {
        this.bubble.scale.setTo(scale_x, scale_y);
    }
}
