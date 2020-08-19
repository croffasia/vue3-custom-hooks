# 💪Vue3 Custom Hooks

Build custom hooks for Vue3 Composition API

## Buy me a burger 🍔
```
BTC: 3FXjMVgNQUDQ6dLpgTGKKhfRPb4ysEtJeD
```
```
ETH: 0xc819FD26DA87a0C53150B00EFf148092E1a923aD
```
```
Tether USDT: 0x32Ae378B7b77146aB7A4edEe9d9d592799b3C675
```
***Apple Pay or Google Pay - Scan to pay***


![alt text](https://wayforpay.com/qr/img?token=qe178b52fd447&size=100 "QR")


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
			logout.destroy();
		});

		onLogin(({user}) => {
			console.log(`Hello ${user}`);

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
        // Dispatch login hook with payload
        onLogin({ user: "UserName" });
    }

    const Logout () => {
        // Dispatch logout hook without payload
        onLogout();
    }

    return {
        Login,
        Logout,
    }
}
```
