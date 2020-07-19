import Container from '../engine/Container.js';
import Sprite from '../engine/Sprite.js';

import globals from './globals.js';
import textures from './textures.js';

import Enemy from './Enemy.js';

export default class EnemyGroup extends Container {
  constructor() {
    super();
    this.enemyWidth = 86;
    this.wave = 1;
    this.lastMove = 0;
    this.addEnemies();
  }

  addEnemies() {
    for (let i = 0; i < 8; i++) {
      const x = ((this.enemyWidth + 30) * i) + 30;
      const enemy = new Enemy(textures.enemy, x, 10);
      enemy.speed *= (this.wave * 0.33);
      this.add(enemy);
    }
  }

  update(dt, t) {
    if (this.children.length === 0) {
      this.wave++;
      this.addEnemies();
    }

    super.update(dt, t);
  }
}