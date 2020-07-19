import Sprite from '../engine/Sprite.js';
import textures from './textures.js';

export default class Laser extends Sprite {
  constructor(texture, x, y) {
    super(texture, 4, 52);
    this.pos.x = x;
    this.pos.y = y;
  }

  update(dt, t, self) {
    this.pos.y -= 400 * dt;
  }
}