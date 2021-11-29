var core = new Framework7.Events();

let registered = [];

const fire = (name, data) => {
    core.emit(name, data);
}

const on = (name, fn) => {
    core.on(name, fn);
}

// Not sure if this is a good idea.
// Idea is to only register event once, rather than on page show,
// But F7 doesn't have this concept. 
const one = (name, fn) => {
    if (registered.indexOf(name) === -1) {
        core.on(name, fn);
        // Push the name to prevent duplicates of event handler
        registered.push(name)
    }
}

const once = (name, fn) => {
    if (registered.indexOf(name) === -1) {
        core.on(name, fn);
        // Push the name to prevent duplicates of event handler
        registered.push(name)
    }
    core.once(name, fn);
}

export default {
    fire,
    on,
    one,
    once
}