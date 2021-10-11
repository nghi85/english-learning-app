import IReturnPosition from '../Interfaces/IReturnPosition';
import Constants from '../Data/Constants';
import SwitchScreen from '../Data/SwitchScreen';

export default class Navigator extends Phaser.Group {
    private static _instance: Navigator;
    private FIRST_PAGE_INDEX: number = 0;

    constructor(game: Phaser.Game) {
        super(game);

        this.game.add.existing(this);
        this.navigateTo(this.FIRST_PAGE_INDEX, this.game);
    }

    public static getInstance(game: Phaser.Game): Navigator {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Navigator(game);
        return this._instance;
    }

    public getScreenPosition(sc_name: string): IReturnPosition {
        let index: number = -1;
        let next_pos: number =  -1;
        let prev_pos: number = -1;

        Constants.SCREENS_DATA[Constants.CURRENT_LESSON].forEach((sc_n: string, i: number) => {
            if (sc_n === sc_name) {
                index = i;
            }
        });
        if (index > -1) {
            if (index + 1 < Constants.SCREENS_DATA[Constants.CURRENT_LESSON].length) {
                next_pos = index + 1;
            }
            if (index - 1 >= 0) {
                prev_pos = index - 1;
            }
        }
        return {
            cur: index,
            next: next_pos,
            prev: prev_pos
        };
    }

    public navigateTo(pos: number, game: Phaser.Game): void {
        let sc_name: string = Constants.SCREENS_DATA[Constants.CURRENT_LESSON][pos];
        SwitchScreen(game, sc_name);
    }

    public getTotalScreensNumber(): number {
        return Constants.SCREENS_DATA[Constants.CURRENT_LESSON].length;
    }
}
