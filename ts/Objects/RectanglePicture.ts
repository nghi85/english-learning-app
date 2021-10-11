import 'p2';
import 'pixi';
import 'phaser';
import { Images, Sounds } from '../Data';
import SoundManager from '../Managers/SoundManager';

export default class RectanglePicture extends Phaser.Group {
  protected image: Phaser.Image;
  protected overlay: Phaser.Image;
  protected imageTrueFalse: Phaser.Image;
  private device_pos_x: number;
  private device_pos_y: number;
  private device_space_x: number;
  private indexImage: number;
  private maxRatio: number;
  private mark_x: number;
  private mark_y: number;
  public callbackHandleClick: Phaser.Signal;

  constructor(game: Phaser.Game, image: string, device_pos_x: number, device_pos_y: number, space_x: number, imageName: string, correctName: string, indexImage: number) {
    super(game);

    this.device_pos_x = device_pos_x;
    this.device_pos_y =  device_pos_y;
    this.mark_x = device_pos_x;
    this.mark_y = device_pos_y;
    this.device_space_x = space_x;
    this.indexImage = indexImage;
    this.image = this.game.add.image(device_pos_x, device_pos_y, image, 0);
    this.image.inputEnabled = true;

    this.overlay = this.game.add.image(device_pos_x, device_pos_y, Images.L1_16_Overlay, 0);
    this.overlay.visible = false;

    this.image.events.onInputDown.add(listener, this);

    this.callbackHandleClick = new Phaser.Signal();

    function listener(): void {
      this.image.play('moving');
      this.reset();
      if (imageName === correctName) {
        this.makeImage(Images.L1_16_True);
        SoundManager.getInstance(this.game).play(Sounds.Sound_Yeah);
      } else {
        this.makeImage(Images.L1_16_False);
        SoundManager.getInstance(this.game).play(Sounds.Sound_Fail);
      }
      this.callbackHandleClick.dispatch();
    }
    this.game.add.existing(this);
  }

  public makeImage(image: string): void {
    this.overlay.visible = true;
    let space: number = 0;
    if (this.indexImage > 0) {
      space = (this.image.width + this.device_space_x) * this.indexImage;
    }
    this.imageTrueFalse = this.game.add.image(this.device_pos_x, this.device_pos_y, image, 0);
    this.imageTrueFalse.width = this.imageTrueFalse.width * this.maxRatio;
    this.imageTrueFalse.height = this.imageTrueFalse.height * this.maxRatio;
    this.imageTrueFalse.x = this.mark_x + this.imageTrueFalse.width + space + 5;
    this.imageTrueFalse.y = this.mark_y + this.imageTrueFalse.height;
  }

  public setScale(scale_x: number, scale_y: number): void {
    this.image.scale.setTo(scale_x, scale_y);
    this.overlay.scale.setTo(scale_x, scale_y);
    this.maxRatio = Math.max(scale_x, scale_y);
    this.mark_x = this.mark_x * scale_x;
    this.mark_y = this.mark_y * scale_y;
  }

  public setPosition(x: number, y: number): void {
    let space: number = 0;
    if (this.indexImage > 0) {
      space = (this.image.width + this.device_space_x) * this.indexImage;
    }
    this.image.x = this.image.x * x + space;
    this.image.y = this.image.y * y;

    this.overlay.x = this.overlay.x * x + space;
    this.overlay.y = this.overlay.y * y;
  }

  public resetPosition(): void {
    this.image.x = this.device_pos_x;
    this.image.y = this.device_pos_y;
  }

  public reset(): void {
    this.overlay.visible = false;
    if (this.imageTrueFalse) {
      this.imageTrueFalse.visible = false;
    }
  }
}
