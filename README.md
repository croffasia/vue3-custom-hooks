# 💪 Vue3 Custom Hooks [![npm](https://img.shields.io/npm/v/@croffasia/vue3-custom-hooks)](https://www.npmjs.com/package/@croffasia/vue3-custom-hooks) [![npm](https://img.shields.io/npm/l/@croffasia/vue3-custom-hooks)](https://www.npmjs.com/package/@croffasia/vue3-custom-hooks) [![npm](https://img.shields.io/npm/dt/@croffasia/vue3-custom-hooks)](https://www.npmjs.com/package/@croffasia/vue3-custom-hooks)

Build custom hooks for Vue3 Composition API

## Buy me a burger 🍔

```
BTC: 3QRaAVBCmySMSRDRnbH86sFVLNDWtiCHFf
```

```
ETH, TUSD, USDC: 0xA0b1ceCB9e785d920D7B0d4847F34551Ab38496B
```

```
Binance Coin BNB: bnb1lrst8vak0vtj3synzn9dkuphund8mt0es5xyxc
```

**_Apple Pay or Google Pay - Scan to pay_**

![alt text](https://wayforpay.com/qr/img?token=qe178b52fd447&size=100 'QR')

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

// hooks.available() - returned all about available hooks.
// hooks.available("login") - returned info about hook test
// hooks.clear() - clear all callbacks
// hooks.clear("login") - clear all callbacks from hook login

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
