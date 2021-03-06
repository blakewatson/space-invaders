export default class CanvasRenderer {
  constructor(w, h) {
    const canvas = document.createElement('canvas');
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.textBaseline = 'top';
  }

  render(container, clear = true) {
    const { ctx } = this;

    function renderRec(container) {
      container.children.forEach(child => {
        if (child.visible === false) {
          return;
        }

        ctx.save();

        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }

        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);

          if (child.hitRegion) {
            child.width = ctx.measureText(child.text).width;
            child.height = ctx.measureText('M').width;
          }
        } else if (child.texture) {
          ctx.drawImage(child.texture.img, 0, 0, child.texture.img.width, child.texture.img.height);
        } else if (child.circle) {
          const { circle } = child;
          ctx.beginPath();
          ctx.arc(0, 0, circle.radius, 0, 2 * Math.PI, false);

          if (circle.fill) {
            ctx.fillStyle = circle.fill;
            ctx.fill();
          }

          if (circle.stroke) {
            ctx.stroke();
          }

          ctx.closePath();
        }

        if (child.children) {
          renderRec(child);
        }

        ctx.restore();
      });
    }

    if (clear) {
      ctx.clearRect(0, 0, this.w, this.h);
    }
    
    renderRec(container);
  }
}