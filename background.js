const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  const dpr = Math.max(window.devicePixelRatio, 1);

  canvas.width = w * dpr;
  canvas.height = h * dpr;

  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before rescaling
  ctx.scale(dpr, dpr);

  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function getScaledInt(rand, max) {
  return Math.floor(rand * max);
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getColor(relSize) {
  // relSize - [0,1]
  if (relSize <= 0.13) {
    return "#FFB971";
  } else if (relSize <= 0.17) {
    return "#FFDDBA";
  } else if (relSize <= 0.2) {
    return "#FFEFE4";
  } else if (relSize <= 0.24) {
    return "#FAF6FF";
  } else if (relSize <= 0.33) {
    return "#D9E1FF";
  } else if (relSize < 1) {
    return "#ABC1FF";
  } else {
    return "#9CB6FF";
  }
}

let timestamp = 0;
function Star(x, y, size, relSize, speed, phase) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.relSize = relSize;
  this.speed = speed;
  this.phase = phase;
}

function drawParticle(star) {
  let color = getColor(star.relSize);
  let alpha = Math.floor(
    (Math.sin(timestamp * star.speed + star.phase) + 1) * star.relSize * 255 * 0.5,
  );
  color += alpha.toString(16).padStart(2, "0");

  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

let stars = [];

function generateStars() {
  const coverageFactor = 0.003;
  const minSize = 0.5;
  const maxSize = 1.5;
  const p = -1.35; //Salpeter IMF

  let x;
  let y;
  let size;
  let relSize;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let area = width * height;
  let coveredArea = 0;
  let speed;
  let phase;

  stars = [];

  while (coveredArea < area * coverageFactor) {
    x = Math.random() * width;
    y = Math.random() * height;
    size = Math.pow(
      (Math.pow(maxSize, p) - Math.pow(minSize, p)) * Math.random() + Math.pow(minSize, p),
      1 / p,
    );
    relSize = (size - minSize) / (maxSize - minSize);
    speed = Math.random() * 0.001;
    phase = Math.random() * 2 * Math.PI;

    stars.push(new Star(x, y, size, relSize, speed, phase));
    coveredArea += size ** 2 * Math.PI;
  }
}

function drawParticles() {
  stars.forEach(drawParticle);
}

generateStars();

function render(tmstamp) {
  timestamp = tmstamp;
  ctx.fillStyle = "rgba(30, 30, 46, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawParticles();
  window.requestAnimationFrame(render);
}

window.addEventListener("resize", render);
render(0);
