import engine from '../engine/index.js';
const { Sprite, Text } = engine;

import globals from './globals.js';

import textures from './textures.js';

const waveCounter = new Text('Wave: 1', {
  fill: '#eee',
  font: 'bold 24pt sans-serif',
  align: 'right'
});
waveCounter.pos.x = globals.w - 40;
waveCounter.pos.y = 40;
waveCounter.update = () => {
  waveCounter.text = `Wave: ${globals.enemies.wave}`;
};

const hpText = new Text('HP: 5', {
  fill: '#eee',
  font: 'bold 24pt sans-serif',
  align: 'left'
});
hpText.pos.x = 40;
hpText.pos.y = 40;
hpText.update = () => {
  hpText.text = `HP: ${globals.ship.hp}`;
};

const gameoverText = new Text('GAMEOVER', {
  font: 'bold 60pt sans-serif',
  fill: '#eee',
  align: 'center'
});
gameoverText.pos.x = globals.w / 2;
gameoverText.pos.y = (globals.h / 2) - 30;
gameoverText.visible = false;
gameoverText.update = () => {
  gameoverText.visible = globals.gameover;
};

const restartText = new Text('Play Again', {
  font: 'bold 40pt sans-serif',
  fill: 'yellow',
  align: 'center'
});
restartText.pos.x = globals.w / 2;
restartText.pos.y = (globals.h / 2) + 80;
restartText.visible = false;
restartText.hitRegion = true;
const restartEvent = new CustomEvent('restart-game');
restartText.update = () => {
  restartText.visible = globals.gameover;

  if (restartText.visible) {
    const restartLeft = restartText.pos.x - (restartText.width / 2);
    const restartRight = restartText.pos.x + (restartText.width / 2);
    const withinRestartX = globals.mouse.pos.x > restartLeft && globals.mouse.pos.x < restartRight;
    const withinRestartY = globals.mouse.pos.y > restartText.pos.y && globals.mouse.pos.y < restartText.pos.y + restartText.height;
    
    if (globals.mouse.pressed && withinRestartX && withinRestartY) {
      window.dispatchEvent(restartEvent);
    }
  }
};

const pointer = new Sprite(textures.pointer, 60, 58);
pointer.update = () => {
  pointer.pos.x = globals.mouse.pos.x - 30;
  pointer.pos.y = globals.mouse.pos.y - 29;
};

export {
  waveCounter,
  hpText,
  gameoverText,
  restartText,
  pointer
};