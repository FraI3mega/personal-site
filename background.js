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
window.addEventListener('resize', resizeCanvas);


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
	} else if (relSize <= 0.20) {
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

function Star(x, y, size, relSize, angle) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.relSize = relSize;
	this.angle = angle;
}

async function drawParticle(star) {

	let color = getColor(star.relSize);
	let alpha = Math.floor(star.relSize * 255 * 0.5);

	color += alpha.toString(16).padStart(2, '0');

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
	let angle;
	let width = canvas.width;
	let height = canvas.height;
	let area = width * height;
	let coveredArea = 0;
	const originX = width / 2
	const originY = height / 2

	stars = [];

	while (coveredArea < area * coverageFactor) {
		size = Math.pow((Math.pow(maxSize, p) - Math.pow(minSize, p)) * Math.random() + Math.pow(minSize, p), 1 / p);
		relSize = (size - minSize) / (maxSize - minSize);
		angle = 2 * Math.PI * Math.random()

		stars.push(new Star(originX, originY, size, relSize, angle));
		coveredArea += (size ** 2) * Math.PI;
	}
}


async function drawParticles() {
	let width = canvas.width;
	let height = canvas.height;

	ctx.clearRect(0, 0, width, height);
	stars.forEach(drawParticle);
}

generateStars()

async function resize() {
	generateStars()
	// for (let i = 0; i < 5; i++) {
	// 	stars.map(moveStar)
	// }
	drawParticles()
}

window.addEventListener('resize', resize);
resize()

function moveStar(star) {
	const displacement = Math.random() * 1; // px
	let width = canvas.width;
	let height = canvas.height;
	let originX = width / 2
	let originY = height / 2

	let x = (Math.cos(star.angle) * displacement);
	let y = (Math.sin(star.angle) * displacement);
	star.x += x;
	star.y += y;
	if (star.x > width || star.x < 0 || star.y > height || star.y < 0) {
		star.x = originX
		star.y = originY;
		star.angle = 2 * Math.PI * Math.random()
	}
	return star
}

function animate() {
	stars.map(moveStar);
	drawParticles();
	requestAnimationFrame(animate)
}

animate()
