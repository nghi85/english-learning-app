/**
 * All the global variables which will be used throughout the game.
 */
export default class Constants {
    //Size and scale
    public static GAME_SCALE: number = 1;
    public static CALCULATED_WIDTH: number = 0;
    public static CALCULATED_HEIGHT: number = 0;
    public static LANDSCAPE_LOCKED: boolean = false;
    public static PORTRAIT_LOCKED: boolean = false;

    //Game name
    public static GAME_NAME: string             = 'og-fabrique-boilerplate';

    //Storage key
    public static STORAGE_KEY: string          = 'bp_sg';

    public static AVAILABLE_LANGUAGES: string[] = ['en', 'nl', 'es', 'fr', 'it'];

    public static CURRENT_LESSON: string = 'lesson1';

    public static SCREENS_DATA: any = {
        lesson1: [
            'lesson1_screen1',
            'lesson1_screen2',
            'lesson1_screen3',
            'lesson1_screen4',
            'lesson1_screen5',
            'lesson1_screen6',
            'lesson1_screen7',
            'lesson1_screen8',
            'lesson1_screen9',
            'lesson1_screen10',
            'lesson1_screen11',
            'lesson1_screen12',
            'lesson1_screen13',
            'lesson1_screen14',
            'lesson1_screen15',
            'lesson1_screen16',
            'lesson1_screen17',
            'lesson1_screen18',
            'lesson1_screen19',
            'lesson1_screen20',
            'lesson1_screen21',
            'lesson1_screen22',
            'lesson1_screen23',
            'lesson1_screen24',
            'lesson1_screen25',
            'lesson1_screen26',
            'lesson1_screen27',
            'lesson1_screen29',
            'lesson1_screen30',
            'lesson1_screen31'
        ]
    };
}
