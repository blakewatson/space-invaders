import Sprite from '../engine/Sprite.js';

import globals from './globals.js';

export default class Enemy extends Sprite {
  constructor(texture, x, y) {
    super(texture, 86, 56);
    this.pos.x = x;
    this.pos.y = y;
    this.speed = this.getRandomInt(30, 100);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  update(dt, t) {
    if (globals.gameover) {
      return;
    }
    this.pos.y += this.speed * dt;
  }
}