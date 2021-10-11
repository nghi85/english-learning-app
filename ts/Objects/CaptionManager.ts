export default class CaptionManager extends Phaser.Group {
    private static _instance: CaptionManager;
    private textGraphics: Phaser.Graphics;
    private _x: number;
    private _y: number;
    private content: Phaser.Text;
    private isTimoutSet: boolean;

    private constructor(game: Phaser.Game, x: number, y: number) {
        super(game);
        this._x = x;
        this._y = y;
    }
    public static getInstance(game: Phaser.Game, x: number, y: number): CaptionManager {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new CaptionManager(game, x, y);
        return this._instance;
    }

    public drawText(text: string, that: any): void {
        if (this.content !== undefined && this.content.text) {
            this.content.setText('');
            if (this.content.text !== text) {
                this.isTimoutSet = false;
            }
        }
        setTimeout(() => {
            if (this.isTimoutSet) {
                this.fadeOut(that);
            }
        }, 3000);
        if (that.game) {
            let fontStyle: string = '700 70px Merienda';
            let posison_y: number = this._y;
            if (window.innerWidth < 1024) {
                fontStyle = '700 23px Merienda';
                posison_y = posison_y + 10;
            }
            this.content = that.game.add.text(0, 0, text, {
                font: fontStyle,
                fill: '#ffffff',
                align: 'left'
            });
            this.content.alpha = 0;
            this.fadeIn(that);
            this.content.x = this._x - this.content.getBounds().width / 2;
            this.content.y = posison_y;
            this.isTimoutSet = true;
        }
    }

    public fadeIn(that: any): void {
        that.game.add.tween(this.content).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    public fadeOut(that: any): void {
        that.game.add.tween(this.content).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    }

    public setPosition(x: number, y: number): void {
        this._x = x;
        this._y = y;
    }
}
