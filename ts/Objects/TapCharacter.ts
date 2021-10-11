import 'p2';
import 'pixi';
import 'phaser';
import { Images, Sounds } from '../Data';
import SoundManager from '../Managers/SoundManager';

export default class TapCharacter extends Phaser.Group {
  protected image: Phaser.Image;
  protected circle: Phaser.Graphics;
  protected imageTrueFalse: Phaser.Image;
  private device_pos_x: number;
  private device_pos_y: number;
  private device_pos_x_correct: number;
  private device_pos_y_correct: number;
  private maxRatio: number;
  public correctName: string;

  constructor(game: Phaser.Game, image: string, device_pos_x: number, device_pos_y: number, imageName: string, device_pos_x_correct: number, device_pos_y_correct: number) {
    super(game);

    this.device_pos_x = device_pos_x;
    this.device_pos_y =  device_pos_y;
    this.device_pos_x_correct = device_pos_x_correct;
    this.device_pos_y_correct = device_pos_y_correct;
    this.image = this.game.add.image(device_pos_x, device_pos_y, image, 0);
    this.image.inputEnabled = true;
    this.image.hitArea = new Phaser.Rectangle(this.image.width / 4, 0, this.image.width / 2, this.image.height);
    // this.drawCircle(device_pos_x, device_pos_y);

    this.image.events.onInputDown.add(listener, this);

    function listener(): void {
      this.image.play('moving');
      if (this.correctName) {
        if (imageName === this.correctName) {
          this.makeImage(Images.L1_16_True);
          SoundManager.getInstance(this.game).play(Sounds.Sound_Yeah);
        } else {
          this.makeImage(Images.L1_16_False);
          SoundManager.getInstance(this.game).play(Sounds.Sound_Fail);
        }
      }
    }
    this.game.add.existing(this);
  }

  public drawCircle(x: number, y: number): void {
    let scale_size: number = 1;
    if (!this.game.device.desktop) {
        if (window.innerWidth >= 1024) {
            scale_size = 1;
        } else {
            scale_size = 0.5;
        }
    }
    let radius: number = 0;
    if (this.image.width > this.image.height) {
      radius = this.image.width;
    } else {
      radius = this.image.height;
    }
    this.circle = this.game.add.graphics(0, 0);
    this.circle.lineStyle(4, 0xffd900);
    this.circle.drawEllipse(x * scale_size + radius / 6, y * scale_size - this.image.height + radius / 4, radius / 2, radius / 2);
    this.circle.endFill();
  }

  public makeImage(image: string): void {
    this.imageTrueFalse = this.game.add.image(this.device_pos_x_correct, this.device_pos_y_correct, image, 0);
    this.imageTrueFalse.width = this.imageTrueFalse.width * this.maxRatio;
    this.imageTrueFalse.height = this.imageTrueFalse.height * this.maxRatio;
    this.imageTrueFalse.x = this.device_pos_x_correct;
    this.imageTrueFalse.y = this.device_pos_y_correct;
  }

  public setSize(width: number, height: number): void {
    this.image.width = width;
    this.image.height = height;
  }

  public setScale(scale_x: number, scale_y: number): void {
    this.image.scale.setTo(scale_x, scale_y);
    this.maxRatio = Math.max(scale_x, scale_y);
    this.device_pos_x_correct = this.device_pos_x_correct * scale_x;
    this.device_pos_y_correct = this.device_pos_y_correct * scale_y;
  }

  public setPosition(x: number, y: number): void {
    this.image.x = this.image.x * x;
    this.image.y = this.image.y * y;
  }

  public resetPosition(): void {
    this.image.x = this.device_pos_x;
    this.image.y = this.device_pos_y;
  }

  public reset(): void {
    if (this.imageTrueFalse) {
      this.imageTrueFalse.visible = false;
    }
  }
}
