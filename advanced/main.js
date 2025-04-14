var raycast = raycast || {};

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

const textureSources = {
    wall: '/img/brick.png'
    // Add more textures if needed
};

function start() {
    // Add event listeners for key press detection
    document.addEventListener('keydown', raycast.keyhandler.onKeyDown);
    document.addEventListener('keyup', raycast.keyhandler.onKeyUp);

    // If textures are still required, you can add them here later or manage this separately

    // Start the game loop
    requestAnimFrame(tick);

    raycast.render();
}

function tick() {
    raycast.keyhandler.tick(); // Update the key state
    raycast.player.input();    // Handle player input

    // Request the next animation frame
    requestAnimFrame(tick);
}

window.onload = function(){
    raycast.textures.loadTextures(() => {
        // console.log("All textures loaded!");
        // console.log("raycast.textures.wall:", raycast.textures.wall);
        start();
    }, textureSources);

    calculateRayAngles();
};
