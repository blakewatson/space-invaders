import engine from '../engine/index.js';
const { Container } = engine;

import globals from './globals.js';

export default class Star extends Container {
  constructor(speed, circle, x, y) {
    super();
    this.speed = speed;
    this.pos.x = x;
    this.pos.y = y;
    this.circle = circle;
  }

  update(dt, t) {
    const { h } = globals;
    this.pos.y += this.speed * dt;

    if (this.pos.y > h + 10) {
      this.dead = true;
    }
  }
}
