import "./sand.scss";
let canvas = {
  width: 400,
  height: 600,
};
export const createSand = () => {
  const sand = document.createElement("canvas");
  sand.className = "sand-element";
  sand.width = canvas.width;
  sand.height = canvas.height;
  beginAnimation(sand);

  return sand;
};

const sandController = {
  time: 1,
  delay: 50,
  end: 10,
  particleCount: 100,
  particles: [],
  createParticles() {
    this.particles = Array.from({ length: this.particleCount }).map((_, i) => {
      return { ...sand.create() };
    });
  },
  reset() {
    this.particles.forEach((p) => p.reset());
    this.time = 1;
  },
  draw(ctx) {
    this.time++;
    if (this.time < this.delay) return;
    this.particles.forEach((p) => {
      p.move();
      p.draw(ctx);
    });
    if (this.time > this.end + this.delay) {
      this.reset();
    }
  },
};
const drawSand = (sand, ctx) => {
  sand.draw(ctx);
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
export const beginAnimation = (canvas) => {
  const generalSpeed = 1;
  let frames = 0;
  const sand = sandController;
  sandController.createParticles();
  const draw = () => {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSand(sand, ctx);
    window.requestAnimationFrame(draw);
    frames++;
  };

  window.requestAnimationFrame(draw);
};
