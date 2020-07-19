import Container from '../engine/Container.js';
import Sprite from '../engine/Sprite.js';

import globals from './globals.js';
import textures from './textures.js';

import Laser from './Laser.js';

export default class LaserGroup extends Container {
  constructor() {
    super();
    this.lastShot = 0;
    this.laserWidth = 4;
    this.laserHeight = 52;
    this.fireRate = 0.25;
  }

  addLaser(x, y) {
    const laser = new Laser(textures.laser, x, y);
    this.add(laser);
  }

  update(dt, t) {
    const { mouse, ship } = globals;
    
    // fire if holding mouse button
    if (mouse.isDown && t - this.lastShot > this.fireRate && !globals.gameover) {
      this.addLaser(ship.pos.x + (ship.width / 2) - (this.laserWidth / 2), ship.pos.y - this.laserHeight - 5);
      this.lastShot = t;
    }

    // filter out lasers once the pass the top of the view
    this.children = this.children.filter(laser => laser.pos.y + laser.height > -20);

    super.update(dt, t);
  }
}