import engine from '../engine/index.js';
const { Container, MouseControls } = engine;

import globals from './globals.js';
import textures from './textures.js';
import Ship from './Ship.js';
import LaserGroup from './LaserGroup.js';
import EnemyGroup from './EnemyGroup.js';
import StarGroup from './StarGroup.js';

// import ui elements
import { waveCounter, hpText, gameoverText, restartText, pointer } from './ui.js';


// init game state
init();

// add canvas to page
document.querySelector('#board').appendChild(globals.renderer.view);

// init game state on restart
window.addEventListener('restart-game', init);
  
// kickoff game loop
requestAnimationFrame(loop);

function loop(ms) {
  requestAnimationFrame(loop);

  const t = ms / 1000;
  globals.dt = t - globals.last;
  globals.last = t;

  globals.scene.update(globals.dt, t);
  globals.mouse.update();
  checkForCollisions();
  globals.renderer.render(globals.scene);
}

function checkForCollisions() {
  const { w, h } = globals;

  // laser / enemy colisions
  globals.enemies.children.forEach(enemy => {
    globals.lasers.children.forEach(laser => {
      const dx = (enemy.pos.x + enemy.width / 2) - (laser.pos.x + laser.width / 2);
      const dy = (enemy.pos.y + enemy.height / 2) - (laser.pos.y);
      if (Math.sqrt(dx * dx + dy * dy) < 30) {
        enemy.dead = true;
        laser.dead = true;
      }
    });
  });

  globals.enemies.children.forEach(enemy => {
    // enemy reaches base
    if (enemy.pos.y > h) {
      enemy.dead = true;
      globals.ship.hp--;
    }

    // enemy hits player
    const dx = (enemy.pos.x + enemy.width / 2) - (globals.ship.pos.x + globals.ship.width / 2);
    const dy = (enemy.pos.y + enemy.height / 2) - (globals.ship.pos.y);
    if (Math.sqrt(dx * dx + dy * dy) < 30) {
      globals.ship.dead = true;
      globals.ship.hp = 0;
    }

    // check for gameover
    if (globals.ship.hp < 1) {
      globals.gameover = true;
    }
  });
}

function init() {
  globals.scene = new Container();
  globals.mouse = new MouseControls(globals.renderer.view);

  if (!globals.dt) {
    globals.dt = 0;
  }

  if (!globals.last) {
    globals.last = 0;
  }

  globals.gameover = false;
  
  // console.log(globals.ship.hp);
  globals.ship = new Ship(textures.ship, 0, globals.h - 100);
  globals.lasers = new LaserGroup();
  globals.enemies = new EnemyGroup();
  globals.stars1 = new StarGroup(600, 0.25, 2, 5);
  globals.stars2 = new StarGroup(400, 0.15, 1, 2);

  // set up background
  globals.scene.add(globals.stars1);
  globals.scene.add(globals.stars2);
  
  // set up ship
  globals.scene.add(globals.ship);
  
  // set up lasers
  globals.scene.add(globals.lasers);
  
  // set up enemy wave
  globals.scene.add(globals.enemies);
  
  // wave counter
  globals.scene.add(waveCounter);
  
  // hp text
  globals.scene.add(hpText);
  
  // gameover text
  globals.scene.add(gameoverText);
  globals.scene.add(restartText);
  
  // mouse pointer
  globals.scene.add(pointer);
}