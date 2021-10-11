import 'p2';
import 'pixi';
import 'phaser';
import { Images } from '../Data';

export default class ChooseAnswer extends Phaser.Group {
  protected box: Phaser.Graphics;
  protected boxName: Phaser.Text;
  private device_pos_x: number;
  private device_pos_y: number;
  private device_space_x: number;
  public callbackHandleClick: Phaser.Signal;

  constructor(game: Phaser.Game, device_pos_x: number, device_pos_y: number, space_x: number, imageName: string, correctName: string, indexImage: number) {
    super(game);

    this.device_pos_x = device_pos_x;
    this.device_pos_y =  device_pos_y;
    this.box = this.game.add.graphics(0, 0);

    this.box.beginFill(0xFFBF00);
    this.box.inputEnabled = true;

    this.box.drawRoundedRect(device_pos_x, device_pos_y, 135, 65, 10);
    this.box.endFill();

    const styles: any = { font: '500 30px Merienda', fill: '#ffffff', align: 'left' };
    this.boxName = this.game.add.text(device_pos_x, device_pos_y, imageName, styles);
    this.boxName.x = this.device_pos_x + this.boxName.getBounds().width / 2;
    this.boxName.y = this.device_pos_y + this.boxName.getBounds().height / 6;
    console.log(this.box);
  }
}
