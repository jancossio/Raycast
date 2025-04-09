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

function start() {
    // Add event listeners for key press detection
    document.addEventListener('keydown', raycast.keyhandler.onKeyDown);
    document.addEventListener('keyup', raycast.keyhandler.onKeyUp);

    var textureFiles = ["img/brick.png", "img/ground.png", "img/sky.png"];
    // If textures are still required, you can add them here later or manage this separately

    // Start the game loop
    requestAnimFrame(tick);
}

function tick() {
    raycast.keyhandler.tick(); // Update the key state
    raycast.player.input();    // Handle player input

    // Request the next animation frame
    requestAnimFrame(tick);
}


window.onload = start;