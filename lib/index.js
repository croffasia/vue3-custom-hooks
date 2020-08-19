export default (...hooks) => {

    let registeredHooks = new Map();

    for (let i = 0; i < hooks.length; i++) {
        registeredHooks.set(hooks[i], new Set());
    }

    const dispatch = (name) => {
        if (!registeredHooks.has(name)) throw new Error("Not found hooks", name);
        registeredHooks.get(name).forEach(item => item());
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

        if (next !== undefined) {
            registeredHooks.get(name).add(next);

            return {

                reject: ((name, next) => () => {
                    registeredHooks.get(name).delete(next);
                })(name, next),

                dispatch: ((name) => () => {
                    dispatch(name);
                })(name),
            };
        } else {
            dispatch(name);
        }
    };

    return {
        makeHook,
        dispatch,
        clear
    };
}