const createStars = (n, options = {}) => {
  return Array.from({ length: n }).map(() => {
    return {
      ...star,
      x: Math.random() * 1920,
      y: Math.random() * 1080 * 3,

      ...options,
    };
  });
};

const star = {
  x: 50,
  y: 50,
  radius: 5,
  color: "#f9f9f9df",
  speed: 1,
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
export const beginAnimation = (canvas) => {
  const generalSpeed = 1;
  let frames = 0;
  let stars = [
    // close
    ...createStars(250, {
      color: "#eaeaea",
      radius: 1.2,
      speed: 0.2,
    }),
    //  midground
    ...createStars(750, {
      color: "#bbbbbb",
      radius: 1,
      speed: 0.1,
    }),
    // distant
    ...createStars(2500, {
      color: "#eaeaea",
      radius: 0.5,
      speed: 0.01,
    }),
  ];

  const drawStars = (ctx) => {
    stars.forEach((star) => {
      let originalColor = star.color;
      if (Math.random() >= 0.85) {
        star.color = "#f7ff01b4";
      }
      star.draw(ctx);
      star.color = originalColor;
      star.y += star.speed * generalSpeed;
      // star.radius += 0.01;
      // star.x -= star.speed * generalSpeed;
      if (star.y > 1080) {
        star.y = Math.random() * 1080 * -3;
        star.x = Math.random() * 1920;
      }
    });
  };

  const comet = {
    x: 1920,
    y: 200,
    radius: 4,
    length: 100,
    headColor: "#FFF",
    tailColor: "#55a3e8a4",
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
      // head
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = this.headColor;
      ctx.fill();
      // tail
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.length, this.y - 40);
      ctx.lineWidth = 5;
      ctx.strokeStyle = this.tailColor;
      ctx.stroke();
      ctx.closePath();
      // tail
      // ctx.moveTo(this.x, this.y - 5);
      // ctx.lineTo(this.x + this.length - 10, this.y - 25);
      // ctx.lineWidth = 5 / 2;
      // ctx.strokeStyle = this.color;
      // ctx.stroke();
      ctx.closePath();
    },
  };

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {*} frames
   */
  const drawComet = (ctx, frames, speed = 1.5) => {
    if (frames % 10) {
      comet.x -= 50 * speed;
      comet.y += 20 * speed;
      comet.draw(ctx);
    }
  };

  const draw = () => {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars(ctx);
    drawComet(ctx, frames);

    window.requestAnimationFrame(draw);
    frames++;
  };

  window.requestAnimationFrame(draw);
};
