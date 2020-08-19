# 💪Vue3 Custom Hooks

Build custom hooks for Vue3 Composition API

## Install

```sh
yarn add @croffasia/vue3-custom-hooks
```

```sh
npm install @croffasia/vue3-custom-hooks --save
```

## Usage

After installing Vue3 Custom Hooks, let's create some hooks.

```js
// @/hooks/login.js
import useHooks from '@croffasia/vue3-custom-hooks';

const LOGIN = 'login';
const LOGOUT = 'logout';

const hooks = useHooks(LOGIN, LOGOUT);

export const onLogin = hooks.makeHook(LOGIN);
export const onLogout = hooks.makeHook(LOGOUT);

export default hooks;
```

Now, you can use your hooks

```js
// use hooks

import {onLogin, onLogout} from '@/hooks/login';

export default {
	setup() {
		const logout = onLogout(() => {
			console.log('Login hook');

			// Remove listener
			logout.reject();
		});

		onLogin(() => {
			console.log('Login hook');

			// Dispatch logout
			logout.dispatch();
		});
	},
};
```

```js
// Example of auth logic component
// composables/useAuth.js

import { onLogin, onLogout } from '@/hooks/login'

export default () => {

    const Login () => {
        // Dispatch login hook
        onLogin();
    }

    const Logout () => {
        // Dispatch logout hook
        onLogout();
    }

    return {
        Login,
        Logout,
    }
}
```
