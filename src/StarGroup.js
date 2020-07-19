import engine from '../engine/index.js';
const { Container } = engine;

import globals from './globals.js';

import Star from './Star.js';

export default class StarGroup extends Container {
  constructor(speed, spawnRate, min = 2, max = 5) {
    super();
    this.speed = speed;
    this.spawnRate = spawnRate;
    this.lastSpawn = 0;
  }

  spawnStar(t) {
    const { w } = globals;
    const circle = {
      radius: this.getRandomInt(2, 5),
      fill: '#ccc'
    };
    const x = this.getRandomInt(0, w + 10);
    const star = new Star(this.speed, circle, x, -10);
    this.add(star);
    this.lastSpawn = t;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  update(dt, t) {
    if (t - this.lastSpawn > 0.25) {
      this.spawnStar(t);
    }
    super.update(dt, t);
  }
}