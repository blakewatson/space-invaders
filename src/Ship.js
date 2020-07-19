import Sprite from '../engine/Sprite.js';
import globals from './globals.js';

export default class Ship extends Sprite {
  constructor(texture, x, y) {
    super(texture, 76, 70);
    this.pos.x = x;
    this.pos.y = y;
    this.hp = 5;
  }

  update(dt, t) {
    const { mouse, w } = globals;

    this.pos.x = mouse.pos.x - (this.width / 2);
  
    if (this.pos.x + this.width > w) {
      this.pos.x = w - this.width;
    }
  
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }
  }
}