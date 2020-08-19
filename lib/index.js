module.exports = (...hooks) => {

    let registeredHooks = new Map();

    for (let i = 0; i < hooks.length; i++) {
        registeredHooks.set(hooks[i], new Set());
    }

    const dispatch = (name, payload) => {
        if (!registeredHooks.has(name)) throw new Error("Not found hooks", name);
        registeredHooks.get(name).forEach(item => item(payload));
    };

    const clear = (name) => {

        if (name === undefined) {
            registeredHooks.forEach((item) => item.clear());
        } else {
            registeredHooks.get(name).clear();
        }
    }

    const makeHook = (name) => (next) => {

        if (!registeredHooks.has(name)) throw new Error(`Not found hooks ${name}`);

        if (next !== undefined && typeof next === "function") {
            registeredHooks.get(name).add(next);

            return {

                destroy: ((name, next) => () => {
                    registeredHooks.get(name).delete(next);
                })(name, next),

                dispatch: ((name) => () => {
                    dispatch(name);
                })(name),
            };
        } else {
            dispatch(name, next);
        }
    };

    return {
        makeHook,
        dispatch,
        clear
    };
}