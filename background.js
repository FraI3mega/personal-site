const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before rescaling
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const { width, height } = canvas.getBoundingClientRect();

function getScaledInt(rand, max) {
	return Math.floor(rand * max);
}


console.log("%o %o", width, height)


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function drawParticles() {
	const minSize = 0.5;
	const maxSize = 2;
	const p = -1.35; //Salpeter IMF
	let x;
	let y;
	let size;

	for (let step = 0; step < 1000; step++) {
		x = Math.random() * width;
		y = Math.random() * height;
		size = Math.pow((Math.pow(maxSize, p) - Math.pow(minSize, p)) * Math.random() + Math.pow(minSize, p), 1 / p);
		console.log("step:%o W:%o H:%o size:%o", step, x, y, size);

		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI);
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.stroke();

		// await sleep(5);
	}
}

window.addEventListener('resize', drawParticles);
drawParticles()
