import "./sand.scss";
let canvas = {
  width: 400,
  height: 600,
};

/**
 * Create sand animation
 * @param {*} options
 * @returns {Object} - the sand controller
 */
export const createSand = (options = {}) => {
  const sandCanvas = document.createElement("canvas");
  sandCanvas.className = "sand-element";
  sandCanvas.width = canvas.width;
  sandCanvas.height = canvas.height;
  const controller = beginAnimation(sandCanvas, options);
  return controller;
};

const sandController = {
  paused: true,
  ticker: null,
  time: 0,
  delay: 0,
  duration: 0.1,
  canvas: null,
  particleCount: 100,
  particles: [],
  startTicker() {
    this.time = 0;
    this.ticker = setInterval(() => {
      this.time += 0.08;
    }, 100);
  },

  createParticles() {
    this.particles = Array.from({ length: this.particleCount }).map((_, i) => {
      return { ...sand.create() };
    });
  },
  reset() {
    clearInterval(this.ticker);
    this.ticker = null;
    this.paused = true;
    this.particles.forEach((p) => p.reset());
  },
  play() {
    this.paused = false;
    this.startTicker();
  },
  remove() {
    this.canvas.remove();
    this.reset();
  },
  draw(ctx) {
    if (this.paused) return;
    // if (this.time < this.delay) return;
    this.particles.forEach((p) => {
      p.move();
      p.draw(ctx);
    });
    if (this.time > this.duration + this.delay) {
      this.reset();
    }
  },
};

const sand = {
  time: 1,
  initialPos: { x: 50, y: 50 },
  x: 50,
  y: 50,
  minRadius: 0.5,
  maxRadius: 2,
  color: "#957d45df",
  speed: 7,
  setMinRadius(value) {
    if (isNaN(value)) return;
    this.minRadius = value;
  },
  setMaxRadius(value) {
    if (isNaN(value)) return;
    this.maxRadius = value;
  },
  create() {
    const x = 40 + Math.random() * 50;
    const y = 20 + Math.random() * 50;
    this.x = x;
    this.y = y;
    this.radius = Math.floor(
      Math.random() * (this.maxRadius - this.minRadius + 1) + this.minRadius,
    );
    this.initialPos = { x, y };
    return this;
  },
  draw(ctx) {
    this.time++;
    this.move();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  move() {
    if (this.outsideBounds()) return;
    this.x += (1 * this.speed * this.time) / 20;
    this.y += (1 * this.speed * this.time) / 20;
  },
  reset() {
    this.time = 0;
    this.x = this.initialPos.x * Math.random(10);
    this.y = this.initialPos.y * Math.random(10);
  },
  outsideBounds() {
    if (this.x > canvas.width && this.y > canvas.height) {
      return true;
    }
    return false;
  },
};
export const beginAnimation = (canvas, { minRadius, maxRadius }) => {
  let frames = 0;
  sand.setMinRadius(minRadius);
  sand.setMaxRadius(maxRadius);
  sandController.createParticles();

  sandController.canvas = canvas;
  const draw = () => {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sandController.draw(ctx);
    window.requestAnimationFrame(draw);
    frames++;
  };

  window.requestAnimationFrame(draw);
  return sandController;
};
