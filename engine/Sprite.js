export default class Sprite {
  constructor(texture, w, h) {
    this.texture = texture;
    this.pos = { x: 0, y: 0 };
    this.width = w;
    this.height = h;
  }
}