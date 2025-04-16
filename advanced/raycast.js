const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 800;
canvas.height = 400;

// Disable smoothing once globally
ctx.imageSmoothingEnabled = false;

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
    dx: 1,
    dy: 0,
    speed: 0.5,
    rotationSpeed: 0.025,
    angle: 0,
    fov: Math.PI / 3,
};

const rayCastAngles = [];
const cosineRayCastAngles = [];

function calculateRayAngles() {
    const viewingAngle = 100 * Math.PI / 180;
    const halfScreenWidth = canvas.width / 2;

    let delta = Math.tan(viewingAngle / 2) / halfScreenWidth;
    let d = 0;

    for (let ray = 0; ray < halfScreenWidth; ray++, d += delta) {
        let angle = Math.atan(d);
        rayCastAngles[halfScreenWidth - ray - 1] = angle;
        rayCastAngles[halfScreenWidth + ray] = -angle;
    }

    for (let ray = 0; ray < rayCastAngles.length; ray++) {
        cosineRayCastAngles[ray] = Math.cos(rayCastAngles[ray]);
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const texture = raycast.textures.wall;
    const halfScreenWidth = canvas.width / 2;

    for (let ray = 0; ray < canvas.width; ray++) {
        const rayAngle = rayCastAngles[ray] + raycast.camera.angle;
        const { distance, textureX, isHorizontal } = castRay(raycast.camera.x, raycast.camera.y, rayAngle);

        const correctedDistance = distance * cosineRayCastAngles[ray];
        const wallHeight = (TILE_SIZE / correctedDistance) * canvas.height;

        const dstX = ray;
        const dstY = (canvas.height / 2) - (wallHeight / 2);
        const dstWidth = 1;
        const dstHeight = wallHeight;

        // Darker shading for vertical walls
        ctx.globalAlpha = isHorizontal === false ? 0.9 : 1.0;

        ctx.drawImage(
            texture,
            parseInt(textureX), 0, 1, texture.height,
            dstX, dstY, dstWidth, dstHeight
        );
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(render);
}

function castRay(startX, startY, angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    // Vertical Ray intersections
    let vertX = Math.floor(startX / TILE_SIZE) * TILE_SIZE;
    vertX += cos > 0 ? TILE_SIZE : 0;
    let vertY = startY + (vertX - startX) * (sin / cos);
    const stepXv = cos > 0 ? TILE_SIZE : -TILE_SIZE;
    const stepYv = stepXv * (sin/cos);

    // Horizontal Ray intersections
    let horY = Math.floor(startY / TILE_SIZE) * TILE_SIZE;
    horY += sin > 0 ? TILE_SIZE : 0;
    let horX = startX + (horY - startY) * (cos / sin);
    const stepYh = sin > 0 ? TILE_SIZE : -TILE_SIZE;
    const stepXh = stepYh * (cos/sin);

    let hitVert = false;
    let hitHorz = false;
    let distV = Infinity, distH = Infinity;

    for (let i = 0; i < 100; i++) {
        if(!hitVert){
            const tileX = Math.floor(vertX / TILE_SIZE) + (cos < 0 ? -1 : 0);
            const tileY = Math.floor(vertY / TILE_SIZE);

            if (map[tileY] && map[tileY][tileX] >= 1){
                hitVert = true;
                distV = Math.hypot(vertX - startX, vertY - startY);
            }else{
                vertX += stepXv;
                vertY += stepYv;
            }
        }

        if(!hitHorz){
            const tileX = Math.floor(horX / TILE_SIZE);
            const tileY = Math.floor(horY / TILE_SIZE) + (sin < 0 ? -1 : 0);
            if (map[tileY] && map[tileY][tileX] >= 1){
                hitHorz = true;
                distH = Math.hypot(horX - startX, horY - startY);
            }else{
                horX += stepXh;
                horY += stepYh;
            }
        }

        if (hitVert && hitHorz) break;
    }

    if (distV < distH) {
        const textureX = vertY % TILE_SIZE;
        return { distance: distV, textureX, isHorizontal: false };
    } else {
        const textureX = horX % TILE_SIZE;
        return { distance: distH, textureX, isHorizontal: true };
    }
}

raycast.render = render;