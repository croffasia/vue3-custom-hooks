module.exports = (...hooks) => {

    let registeredHooks = new Map();

    for (let i = 0; i < hooks.length; i++) {
        registeredHooks.set(hooks[i], new Set());
    }

    const dispatch = (name, payload) => {
        if (!registeredHooks.has(name)) throw new Error(`Hook ${name} not found`);
        registeredHooks.get(name).forEach(item => item(payload));
    };

    const clear = (name) => {

        if (name === undefined) {
            registeredHooks.forEach((item) => item.clear());
        } else {

            if (!registeredHooks.has(name)) throw new Error(`Hook ${name} not found`);
            registeredHooks.get(name).clear();
        }
    }

    const available = (name) => {
        if (name === undefined) {
            return Array.from(registeredHooks.keys()).map((item) => ({ hook: item, used: registeredHooks.get(item).size }));
        } else {

            if (!registeredHooks.has(name)) throw new Error(`Hook ${name} not found`);

            return { hook: name, used: registeredHooks.get(name).size };
        }
    }

    const makeHook = (name) => {

        if (!registeredHooks.has(name)) throw new Error(`Hook ${name} not found`);

        return (next) => {

            if (!registeredHooks.has(name)) throw new Error(`Hook ${name} not found`);

            if (next !== undefined && typeof next === "function") {

                registeredHooks.get(name).add(next);

                return {

                    destroy: () => {
                        if (!registeredHooks.has(name)) throw new Error(`Hook ${name} not found`);
                        registeredHooks.get(name).delete(next);
                    },

                    dispatch: (payload) => {
                        dispatch(name, payload);
                    },
                };
            } else {
                dispatch(name, next);
            }
        };
    }

    return {
        makeHook,
        dispatch,
        available,
        clear
    };
}