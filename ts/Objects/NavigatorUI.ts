import CommonButton from '../Objects/CommonButton';
import IReturnPosition from '../Interfaces/IReturnPosition';
import Navigator from './Navigator';

export default class NavigatorUI extends Phaser.Group {
    private backBtn: CommonButton;
    private nextBtn: CommonButton;
    private pos_next: number;
    private pos_prev: number;
    private pos_cur: number;

    constructor(game: Phaser.Game, screenName: string) {
        super(game);
        let postions: IReturnPosition = Navigator.getInstance(this.game).getScreenPosition(screenName);
        this.pos_cur = postions.cur;
        this.pos_next = postions.next;
        this.pos_prev = postions.prev;
        // hide next back
        this.pos_next = -1;
        this.pos_prev = -1;
        if (this.pos_prev > -1) {
            this.backBtn = new CommonButton(game, 0, 0, 'Prev', this.backAction, this);
        }
        if (this.pos_next > -1) {
            this.nextBtn = new CommonButton(game, 0, 0, 'Next', this.nextAction, this);
        }
    }

    public resize(bg: Phaser.Image): void {
        if (this.pos_prev > -1) {
            this.backBtn.width = this.backBtn.width * Math.max(bg.scale.x, bg.scale.y);
            this.backBtn.height = this.backBtn.height * Math.max(bg.scale.x, bg.scale.y);
            this.backBtn.x = 20;
            this.backBtn.y = bg.height - 100;
        }
        if (this.pos_next > -1) {
            this.nextBtn.width = this.nextBtn.width * Math.max(bg.scale.x, bg.scale.y);
            this.nextBtn.height = this.nextBtn.height * Math.max(bg.scale.x, bg.scale.y);
            this.nextBtn.x = bg.width - this.nextBtn.width - 20;
            this.nextBtn.y = bg.height - 100;
        }
    }

    public nextAction(): void {
        Navigator.getInstance(this.game).navigateTo(this.pos_next, this.game);
    }

    public backAction(): void {
        Navigator.getInstance(this.game).navigateTo(this.pos_prev, this.game);
    }
}
