import engine from '../engine/index.js';
const { CanvasRenderer } = engine;

const w = 480 * 2;
const h = 640 * 2;
const renderer = new CanvasRenderer(w, h);
let scene, mouse, dt, last, gameover, ship, lasers, enemies, stars1, stars2;

export default {
  w,
  h,
  renderer,
  scene,
  mouse,
  dt,
  last,
  gameover,
  ship,
  lasers,
  enemies,
  stars1,
  stars2
};