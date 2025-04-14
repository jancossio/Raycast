var raycast = raycast || {};

raycast.textures = (function () {

    function loadTextures(callback, textureSources) {
        let loaded = 0;
        const total = Object.keys(textureSources).length;


        for (let key in textureSources) {
            const img = new Image();
            img.src = textureSources[key];
            img.onload = () => {
                raycast.textures[key] = img;
                loaded++;
                if (loaded === total) callback(); // All textures loaded
            };

        }
    }

    return {
        loadTextures
    };

}());