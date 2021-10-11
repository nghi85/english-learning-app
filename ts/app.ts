import 'p2';
import 'pixi';
import 'phaser';

import * as WebFont from 'webfontloader';

//The states
import {
    Boot,
    Lesson1Screen1,
    Lesson1Screen2,
    Lesson1Screen3,
    Lesson1Screen4,
    Lesson1Screen5,
    Lesson1Screen6,
    Lesson1Screen7,
    Lesson1Screen8,
    Lesson1Screen9,
    Lesson1Screen10,
    Lesson1Screen11,
    Lesson1Screen12,
    Lesson1Screen13,
    Lesson1Screen14,
    Lesson1Screen15,
    Lesson1Screen16,
    Lesson1Screen17,
    Lesson1Screen18,
    Lesson1Screen19,
    Lesson1Screen20,
    Lesson1Screen21,
    Lesson1Screen22,
    Lesson1Screen23,
    Lesson1Screen24,
    Lesson1Screen25,
    Lesson1Screen26,
    Lesson1Screen27,
    Lesson1Screen29,
    Lesson1Screen30,
    Lesson1Screen31
} from './States';

//Module name should equal the game name
namespace BoilerPlate {
    export class Game extends Phaser.Game {

        constructor() {
            //We use Phaser's config object to create the game, since this is the only way to disable debugging
            super(<Phaser.IGameConfig>{
                enableDebug: false,
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                renderer: Phaser.AUTO,
                parent: 'content',
                transparent: true,
                antialias: true,
                preserveDrawingBuffer: false,
                physicsConfig: null,
                seed: '',
                state: null,
                forceSetTimeOut: false
            });
            this.clearBeforeRender = false;

            //Here we adjust some stuff to the game that we need, before any state is being run
            Phaser.Device.whenReady(() => {
                //Fix for mobile portals and IE
                this.stage.disableVisibilityChange = true; //This will make sure the game runs out-of-focus
                let event: string = this.device.desktop ? 'click' : 'touchstart';
                document.getElementById('content').addEventListener(event, (e: Event) => {
                    //This will make sure the game will rerun, when focus was lost
                    this.gameResumed(e);
                });
            });
            this.state.add('game', {create: this.stateCreator.bind(this), preload: this.statePreloader.bind(this)}, true);
        }

        /**
         * Here we load all the Azerion scripts we need
         */
        private statePreloader(): void {
            libs.forEach((library: string) => {
                this.load.script(library, library);
            });
        }

        private stateCreator(): void {
            // //Here we load all the plugins
            this.plugins.add(Fabrique.Plugins.GameEvents);
            // this.plugins.add(Fabrique.Plugins.GoogleAnalytics);
            // this.plugins.add(Fabrique.Plugins.GameAnalytics);
            this.plugins.add(PhaserAds.AdManager);
            this.plugins.add(<any>PhaserSuperStorage.StoragePlugin);
            this.plugins.add(PhaserCachebuster.CacheBuster);
            this.plugins.add(PhaserSpine.SpinePlugin);
            this.plugins.add(PhaserI18n.Plugin, {
                //Configure the language we fall back to (defaults to 'dev')
                fallbackLng: 'en',
                //debug: true,
                load: 'languageOnly',
                backend: {
                    loadPath: 'assets/locales/locale_{{lng}}.json'
                }
            });

            (<any>this).storage.forcePromises = true;

            //Here we load all the states, but they shouldn't start automatically
            this.state.add(Boot.Name, Boot, false);
            this.state.add(Fabrique.SplashScreen.Preloader.Name, Fabrique.SplashScreen.Preloader, false);
            this.state.add(Lesson1Screen1.Name, Lesson1Screen1, false);
            this.state.add(Lesson1Screen2.Name, Lesson1Screen2, false);
            this.state.add(Lesson1Screen3.Name, Lesson1Screen3, false);
            this.state.add(Lesson1Screen4.Name, Lesson1Screen4, false);
            this.state.add(Lesson1Screen5.Name, Lesson1Screen5, false);
            this.state.add(Lesson1Screen6.Name, Lesson1Screen6, false);
            this.state.add(Lesson1Screen7.Name, Lesson1Screen7, false);
            this.state.add(Lesson1Screen8.Name, Lesson1Screen8, false);
            this.state.add(Lesson1Screen9.Name, Lesson1Screen9, false);
            this.state.add(Lesson1Screen10.Name, Lesson1Screen10, false);
            this.state.add(Lesson1Screen11.Name, Lesson1Screen11, false);
            this.state.add(Lesson1Screen12.Name, Lesson1Screen12, false);
            this.state.add(Lesson1Screen13.Name, Lesson1Screen13, false);
            this.state.add(Lesson1Screen14.Name, Lesson1Screen14, false);
            this.state.add(Lesson1Screen15.Name, Lesson1Screen15, false);
            this.state.add(Lesson1Screen16.Name, Lesson1Screen16, false);
            this.state.add(Lesson1Screen17.Name, Lesson1Screen17, false);
            this.state.add(Lesson1Screen18.Name, Lesson1Screen18, false);
            this.state.add(Lesson1Screen19.Name, Lesson1Screen19, false);
            this.state.add(Lesson1Screen20.Name, Lesson1Screen20, false);
            this.state.add(Lesson1Screen21.Name, Lesson1Screen21, false);
            this.state.add(Lesson1Screen22.Name, Lesson1Screen22, false);
            this.state.add(Lesson1Screen23.Name, Lesson1Screen23, false);
            this.state.add(Lesson1Screen24.Name, Lesson1Screen24, false);
            this.state.add(Lesson1Screen25.Name, Lesson1Screen25, false);
            this.state.add(Lesson1Screen26.Name, Lesson1Screen26, false);
            this.state.add(Lesson1Screen27.Name, Lesson1Screen27, false);
            this.state.add(Lesson1Screen29.Name, Lesson1Screen29, false);
            this.state.add(Lesson1Screen30.Name, Lesson1Screen30, false);
            this.state.add(Lesson1Screen31.Name, Lesson1Screen31, false);

            let updateText: () => void = (): void => {
                this.recursiveUpdateText(this.stage);
            };

            //Load the fonts
            WebFont.load(<WebFont.Config>{
                custom: <WebFont.Custom>{
                    families: ['Aller Display'],
                    urls: [
                        'assets/css/AllerDisplay.css'
                    ]
                },
                active: updateText,
                inactive: updateText
            });

            //start the game
            this.state.start(Boot.Name);
            this.state.remove('game');
        }

        /**
         * This function will set the dirty property to true on all text objects in the current active stage
         *
         * @param obj
         */
        public recursiveUpdateText(obj: Phaser.Text | PIXI.DisplayObjectContainer): void {
            if (obj instanceof Phaser.Text) {
                (<any>obj).dirty = true;
            }

            if (obj.children && obj.children.length > 0) {
                obj.children.forEach((child: PIXI.DisplayObjectContainer) => {
                    this.recursiveUpdateText(child);
                });
            }
        }
    }
}

new BoilerPlate.Game();
