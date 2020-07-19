export default class Texture {
  constructor(url) {
    this.img = new Image();
    this.img.src = url;
  }
}