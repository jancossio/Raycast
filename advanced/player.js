var raycast = raycast || {};

const keys = raycast.keyhandler;
const camera = raycast.camera;

raycast.player = {

    input: function() {
        if(keys.isKeyDown("up")){
            camera.x += camera.dx * camera.speed;
            camera.y += camera.dy * camera.speed; 
        }
    
        if(keys.isKeyDown("down")){
            camera.x -= camera.dx * camera.speed;
            camera.y -= camera.dy * camera.speed;
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