const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 800;
canvas.height = 400;

// Map definition (1 = wall, 0 = empty space)
const map = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

// Tile size
const TILE_SIZE = 64;

raycast.camera = {
    x: TILE_SIZE + TILE_SIZE / 2,
    y: TILE_SIZE + TILE_SIZE / 2,
    dx: 1,  // Initial direction vector X
    dy: 0,  // Initial direction vector Y
    speed: 0.5, // Movement speed
    rotationSpeed: 0.018, // Turning speed
    angle: 0, // Facing right
    fov: Math.PI / 3, // Field Of View (60 degrees)
};

let lastTime = performance.now();
let fps = 0;

// Draw the walls
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rayCount = canvas.width; // One ray per horizontal pixel
    const rayAngleStep = raycast.camera.fov / rayCount;

    for (let ray = 0; ray < rayCount; ray++) {
        // Calculate the angle of the current ray
        const rayAngle = raycast.camera.angle - raycast.camera.fov / 2 + ray * rayAngleStep;

        // Cast the ray and find intersection with a wall
        const { distance, hitX, hitY } = castRay(rayAngle);

        // Calculate the projected wall height
        const wallHeight = (TILE_SIZE / distance) * canvas.height;

        // Calculate shade based on distance
        const shade = Math.max(0, 255 - distance * 10);
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;

        // Draw a vertical line for the wall slice
        const x = ray;
        const y = canvas.height / 2 - wallHeight / 2;
        ctx.fillRect(x, y, 1, wallHeight);
    }

    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    fps = 1 / delta;
    lastTime = now;
    // console.log(`FPS: ${fps}`);

    requestAnimationFrame(render);
}

// Cast a single ray
function castRay(angle) {
    let rayX = raycast.camera.x;
    let rayY = raycast.camera.y;

    const rayStepX = Math.cos(angle);
    const rayStepY = Math.sin(angle);

    while (true) {
        // Move the ray forward
        rayX += rayStepX;
        rayY += rayStepY;

        // Check if the ray hit a wall
        const mapX = Math.floor(rayX / TILE_SIZE);
        const mapY = Math.floor(rayY / TILE_SIZE);

        if (map[mapY] && map[mapY][mapX] === 1) {
            // Wall hit
            const distance = Math.sqrt((rayX - raycast.camera.x) ** 2 + (rayY - raycast.camera.y) ** 2);
            return { distance, hitX: rayX, hitY: rayY };
        }
    }
}

// Start rendering
render();