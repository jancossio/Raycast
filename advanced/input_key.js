var raycast = raycast || {};

raycast.keyhandler = (function () {
    let keyCodes = {
        up: 38,
        w: 87,
        down: 40,
        left: 37,
        a: 65,
        right: 39,
        d: 68,
        space: 32,
        ctrl: 17,
        esc: 27
    };
    
    let state = new Set(); // Tracks currently pressed keys
    let lastState = new Set(); // Tracks the previous frame's pressed keys
    
    let keyCodeSet = new Set(Object.values(keyCodes)); // For quick lookup of tracked keys

    // Remove key from current state
    function onKeyUp(ev) {
        //console.log("Event: "+ev+" | Event witch: "+ev.which);
        state.delete(ev.which);
        // console.log("Key released: ", ev.which);
        // console.log("Current state after release: ", Array.from(state));
        if (isUsedKey(ev.which)) 
            ev.preventDefault();
    }

    // Add key to current state
    function onKeyDown(ev) {
        //console.log("Event: "+ev+" | Event witch: "+ev.which);
        state.add(ev.which);
        // console.log("Key released: ", ev.which);
        // console.log("Current state after press: ", Array.from(state));
        if (isUsedKey(ev.which))
            ev.preventDefault();
    }

    // Check if the keycode is one we care about
    function isUsedKey(keycode) {
        return keyCodeSet.has(keycode);
    }

    // Check if a key is currently pressed
    function isKeyDown(keyname) {
        //console.log("Current state after press: ", state.has(keyCodes[keyname]));
        return state.has(keyCodes[keyname]);
    }

    // Check for single-frame press
    function isKeyPress(keyname) {
        return state.has(keyCodes[keyname]) && !lastState.has(keyCodes[keyname]);
    }

    // Swap lastState with the current state
    function tick() {
        // let temp = lastState;
        // lastState = state;
        // state = temp;
        // state.clear(); // Clear the current state for the next frame
        lastState = new Set(state); // Copy current state to lastState
    }

    return {
        onKeyUp: onKeyUp,
        onKeyDown: onKeyDown,
        isKeyDown: isKeyDown,
        isKeyPress: isKeyPress,
        tick: tick
    };
})();
