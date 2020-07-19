export default class MouseControls {
  constructor(containerElement) {
    this.el = containerElement || document.body;

    // State
    this.pos = { x: 0, y: 0 };
    // the mouse button is being held down
    this.isDown = false;
    // the mouse button has been pressed this frame
    this.pressed = false;
    // the mouse button has been released
    this.released = false;

    // Event handlers
    document.addEventListener('mousemove', this.move.bind(this), false);
    document.addEventListener('mousedown', this.down.bind(this), false);
    document.addEventListener('mouseup', this.up.bind(this), false);
  }

  down(event) {
    this.isDown = true;
    this.pressed = true;
    this.mousePosFromEvent(event);
  }

  mousePosFromEvent({ clientX, clientY }) {
    const { el, pos } = this;
    const rect = el.getBoundingClientRect();
    const xr = el.width / el.clientWidth;
    const yr = el.height / el.clientHeight;
    pos.x = (clientX - rect.left) * xr;
    pos.y = (clientY - rect.top) * yr;
  }  

  move(event) {
    this.mousePosFromEvent(event);
  }

  up(event) {
    this.isDown = false;
    this.released = true;
  }

  update() {
    this.released = false;
    this.pressed = false;
  }
}