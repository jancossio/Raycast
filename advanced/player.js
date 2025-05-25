var raycast = raycast || {};

const keys = raycast.keyhandler;
const camera = raycast.camera;
const movestep = camera.speed;

raycast.player = {

    input: function() {

        if(keys.isKeyDown("up")){
            const newX = camera.x + (camera.dx * camera.speed);
            const newY = camera.y + (camera.dy * camera.speed);
            if(!wallCollision(newX, camera.y)) camera.x = newX;
            if(!wallCollision(camera.x, newY)) camera.y = newY;
            // if(map[(camera.x + camera.dx * movestep) | 0][camera.y | 0] == 0) camera.x += camera.dx * movestep;
            // if(map[camera.x | 0][(camera.y + camera.dy * movestep) | 0] == 0) camera.y += camera.dy * movestep;
        }
    
        if(keys.isKeyDown("down")){
            const newX  = camera.x - (camera.dx * camera.speed);
            const newY= camera.y - (camera.dy * camera.speed);
            if(!wallCollision(newX, camera.y)) camera.x = newX;
            if(!wallCollision(camera.x, newY)) camera.y = newY;
            // if(map[(camera.x - camera.dx * movestep) | 0][camera.y | 0] == 0) camera.x += camera.dx * movestep;
            // if(map[camera.x | 0][(camera.y - camera.dy * movestep) | 0] == 0) camera.y += camera.dy * movestep;
        }
    
        if(keys.isKeyDown("left")){
            camera.angle -= camera.rotationSpeed;
            const oldDx = camera.dx;
            camera.dx = camera.dx * Math.cos(-camera.rotationSpeed) - camera.dy * Math.sin(-camera.rotationSpeed);
            camera.dy = oldDx * Math.sin(-camera.rotationSpeed) + camera.dy * Math.cos(-camera.rotationSpeed);
        }
    
        if(keys.isKeyDown("right")){
            camera.angle += camera.rotationSpeed;
            const oldDx = camera.dx;
            camera.dx = camera.dx * Math.cos(camera.rotationSpeed) - camera.dy * Math.sin(camera.rotationSpeed);
            camera.dy = oldDx * Math.sin(camera.rotationSpeed) + camera.dy * Math.cos(camera.rotationSpeed);
        }
    }
};

function wallCollision(x, y) {
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);

    return (map[tileY][tileX] === 1);
}