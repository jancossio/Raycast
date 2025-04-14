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
    
        if (keys.isKeyDown("left")) {
            camera.angle += camera.rotationSpeed;
            camera.angle = (camera.angle + Math.PI * 2) % (Math.PI * 2);
            camera.dx = Math.cos(camera.angle);
            camera.dy = Math.sin(camera.angle);
        }
        
        if (keys.isKeyDown("right")) {
            camera.angle -= camera.rotationSpeed;
            camera.angle = (camera.angle + Math.PI * 2) % (Math.PI * 2);
            camera.dx = Math.cos(camera.angle);
            camera.dy = Math.sin(camera.angle);
        }        
    }
};