export default class Sounds {
    //Background music
    public static Sound_2B: string = 'B2';
    public static Sound_3C: string = '3C';
    public static Sound_3D: string = '3D';
    public static Sound_5C: string = '5C';
    public static Sound_4B: string = '4B';
    public static Sound_4A: string = '4A';
    public static Sound_6A: string = '6A';
    public static Sound_6B: string = '6B';
    public static Sound_5D: string = '5D';
    public static Sound_6C: string = '6C';
    public static Sound_W2B1: string = 'w2b1';
    public static Sound_W2B2: string = 'w2b2';
    public static Sound_W3D1: string = 'Sing';
    public static Sound_W3D2: string = 'Talk';
    public static Sound_W3D3: string = 'Stand';
    public static Sound_W3D4: string = 'Sit';
    public static Sound_W4A: string = 'w4a';
    public static Sound_W4B1: string = 'Scissors';
    public static Sound_W4B2: string = 'Glue';
    public static Sound_W4B3: string = 'Paper';
    public static Sound_W4B4: string = 'Paint';

    public static Sound_Fail: string = 'failsound';
    public static Sound_Yeah: string = 'yeah';

    //Sound effects
    public static Click: string = 'click';

    /**
     * A list of all audio we need for the preloader.
     */
    public static preloadList: string[] = [
       //Add preloader audio
    ];

    /**
     * A list of all audio we need after the preloader.
     */
    public static list: string[] = [
        Sounds.Click,
        Sounds.Sound_Fail,
        Sounds.Sound_Yeah,
        Sounds.Sound_2B,
        Sounds.Sound_3C,
        Sounds.Sound_3D,
        Sounds.Sound_5C,
        Sounds.Sound_4B,
        Sounds.Sound_4A,
        Sounds.Sound_6A,
        Sounds.Sound_6B,
        Sounds.Sound_5D,
        Sounds.Sound_6C,
        Sounds.Sound_W2B1,
        Sounds.Sound_W2B2,
        Sounds.Sound_W3D1,
        Sounds.Sound_W3D2,
        Sounds.Sound_W3D3,
        Sounds.Sound_W3D4,
        Sounds.Sound_W4A,
        Sounds.Sound_W4B1,
        Sounds.Sound_W4B2,
        Sounds.Sound_W4B3,
        Sounds.Sound_W4B4
    ];
}
