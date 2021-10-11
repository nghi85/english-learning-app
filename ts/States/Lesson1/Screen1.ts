import 'p2';
import 'pixi';
import 'phaser';

import IGame from '../../Fabrique/IGame';

import { Constants, Images } from '../../Data';
import NavigatorUI from '../../Objects/NavigatorUI';
import SwitchScreen from '../../Data/SwitchScreen';

export default class Lesson1Screen1 extends Phaser.State {
    public static Name: string = 'lesson1_screen1';
    public static pause: boolean = false;

    public name: string = Lesson1Screen1.Name;
    public game: IGame;

    private background: Phaser.Image;

    private navigator_ui: NavigatorUI;

    constructor() {
        super();
    }

    public init(): void {
        this.game.world.removeAll();
    }

    public create(): void {
        super.create();

        this.background = this.game.add.image(0, 0, Images.Background_L1_1);

        this.navigator_ui = new NavigatorUI(this.game, this.name);

        let script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
            // @ts-ignore: Unreachable code error
            let bridge: any = BJYBridge.getInstance({
                // 响应由bridge通知而来的翻页指令
                onPageChange: (page: number, step: number) => {
                    return new Promise(
                        (resolve: any) => {
                            let sc_name: string = Constants.SCREENS_DATA[Constants.CURRENT_LESSON][page];
                            SwitchScreen(this.game, sc_name);
                            resolve(0);
                        }
                    );
                },
                // 响应由bridge通知而来的本页操作记录变化
                onRecordChange: (record: number, prevRecord: number) => {
                    // 根据具体业务响应操作变化
                    // recordElement.innerHTML = record.reverse().join('<br>');
                }
            });
            bridge.getReady({
                page: 0,
                step: 0,
                pageCount: Constants.SCREENS_DATA[Constants.CURRENT_LESSON].length,
                stepCount: 0
            });
        };
        script.src = '//live-cdn.baijiayun.com/js-sdk/tool/BJYBridge.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        this.resize();
    }

    /**
     * Called every time the rotation or game size has changed.
     * Rescales and repositions the objects.
     */
    public resize(): void {
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.navigator_ui.resize(this.background);
    }

    public shutdown(): void {
        super.shutdown();
        this.background = null;
    }
}
