import 'p2';
import 'pixi';
import 'phaser';
import { Images, Sounds } from '../Data';
import SoundManager from '../Managers/SoundManager';

export default class ChooseAnswers extends Phaser.Group {
  protected image: Phaser.Image;
  protected imageTrueFalse: Phaser.Image;
  protected imageTrue: string;
  protected imageFalse: string;

  protected imageMove: Phaser.Image;

  private device_pos_x: number;
  private device_pos_y: number;
  private device_pos_x_end: number;
  private device_pos_y_end: number;
  private device_space_x: number;
  private indexImage: number;
  private maxRatio: number;
  public callbackHandleClick: Phaser.Signal;

  constructor(
    game: Phaser.Game, image: string, imageTrue: string, imageFalse: string, device_pos_x: number, device_pos_y: number,
    device_pos_x_end: number, device_pos_y_end: number, space_x: number, imageName: string, correctName: string, indexImage: number
  ) {
    super(game);

    this.device_pos_x = device_pos_x;
    this.device_pos_y =  device_pos_y;
    this.device_pos_x_end = device_pos_x_end;
    this.device_pos_y_end =  device_pos_y_end;
    this.device_space_x = space_x;
    this.indexImage = indexImage;
    this.imageTrue = imageTrue;
    this.imageFalse = imageFalse;
    this.image = this.game.add.image(device_pos_x, device_pos_y, image, 0);
    this.imageMove = this.game.add.image(device_pos_x, device_pos_y, image, 0);
    this.image.inputEnabled = true;

    this.image.events.onInputDown.add(listener, this);

    this.callbackHandleClick = new Phaser.Signal();
    function listener(): void {
      this.image.play('moving');
      if (imageName === correctName) {
        this.moveWithAnimate(this.imageTrue, true);
      } else {
        this.moveWithAnimate(this.imageFalse, false);
      }
      this.callbackHandleClick.dispatch();
    }
    this.game.add.existing(this);
  }

  public moveWithAnimate(image: string, isCorrect: boolean): void {
    this.imageMove.visible = true;
    const imageMove: Phaser.Tween = this.game.add.tween(this.imageMove);
    imageMove.to({ x: this.device_pos_x_end, y: this.device_pos_y_end }, 350, Phaser.Easing.Linear.None, true).onComplete.add(() => {
        this.imageMove.visible = false;
        this.imageMove.x = this.image.x;
        this.imageMove.y = this.image.y;
        this.makeImage(image);
        if (isCorrect) {
          SoundManager.getInstance(this.game).play(Sounds.Sound_Yeah);
        } else {
          SoundManager.getInstance(this.game).play(Sounds.Sound_Fail);
        }
    });
}

  public makeImage(image: string): void {
    this.imageTrueFalse = this.game.add.image(this.device_pos_x, this.device_pos_y, image, 0);
    this.imageTrueFalse.width = this.imageTrueFalse.width * this.maxRatio;
    this.imageTrueFalse.height = this.imageTrueFalse.height * this.maxRatio;
    this.imageTrueFalse.x = this.device_pos_x_end;
    this.imageTrueFalse.y = this.device_pos_y_end;
  }

  public setScale(scale_x: number, scale_y: number): void {
    this.image.scale.setTo(scale_x, scale_y);
    this.imageMove.scale.setTo(scale_x, scale_y);
    this.maxRatio = Math.max(scale_x, scale_y);
  }

  public setPosition(x: number, y: number): void {
    let space: number = 0;
    if (this.indexImage > 0) {
      space = (this.image.width + this.device_space_x) * this.indexImage;
    }
    this.image.x = this.image.x * x + space;
    this.image.y = this.image.y * y;
    this.imageMove.x = this.imageMove.x * x + space;
    this.imageMove.y = this.imageMove.y * y;
  }
}
