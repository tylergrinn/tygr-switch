# Tygr Switch

[Demo](https://tylergrinn.github.io/tygr-switch)

[Forking Guide](https://github.com/tylergrinn/tygr-logo/blob/main/docs/forking.md)

This a simple react hook and sass mixin designed to create switchable layouts.

The switch layout will share as much html as it can between the different switch, allowing for smooth transitions.

## Requirements:

- A react application built with node (webpack, rollup, babel)
- Sass compiler

See the `demo/webpack.config.js` file for an example of using react and sass with webpack. The `package.json` has the babel config.

## Installation:

```cmd
npm i --save @tygr/switch
```

## Step 1: use the switch hook in your component

```jsx
import React from 'react';
import useSwitch from '@tygr/switch';

export default function Auth() {
  const [
    switchContainer,
    setState,
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
  ] = useSwitch(
    { name: 'auth', initialIndex: 2 },
    'login',
    'register',
    'reset-password'
  );

  return (
    <div {...switchContainer} className="tygr-auth">
      ...
    </div>
  );
}
```

The `useSwitch` hook takes an `options` object and any number of `state` strings. The options object requires at least the `name` option. You may also specify the index of the initial state with `initialIndex`. In the example above, 'reset-password' will be the active state by default.

It returns a switch container object, a function to set the current state, and boolean flags for each state you specify. Each flag tells you whether that state is currently active.

Spread the switch container object returned from the `useSwitch` hook over the parent element of the layout as shown above.

## Step 2: use the switch sass mixin

```scss
@use '@tygr/switch';

.tygr-auth {
  @include switch('auth', login, register, reset-password);
}
```

The `switch` sass mixin takes in a name for the switch and a list of all the states it can be in. Both parameters should match the ones passed in to the `useSwitch` react hook. You should always enclose this mixin within a selector, just like above, because it makes use of the sass parent selector: `&`.

## Step 3: hide and show elements conditionally using `data-[name]`

```jsx
<input data-auth="login register" name="password" />

<input data-auth="register" name="confirm-password" />
```

For elements you want to conditionally show or hide, add the `data-[name]` attribute with a list of the tab names you would like it to show up under. In this example, with the switch being named `'auth'`, the `password` input will be shown if the tab is either `login` or `register`. Likewise, the `confirm-password` input will only be shown when the `register` tab is active.

## Step 4: Use the setState function to change switch states

```jsx
<button onClick={setState('reset-password')}>Reset Password</button>
```

Use the `setState` higher order function returned from the `useSwitch` hook in order to change state on button clicks. The method is type-safe if using typescript, so you don't have to memorize which name you gave each state.

## Optional: Use the exclusion syntax for `data-[name]`

```jsx
<label htmlFor="confirm-password" data-auth="!login !reset-password">
  Confirm Password
</label>
```

By using the `!` operator, you can exclude an element from certain state rather than the default additive behavior.

This operator takes precedence: if a single state is specified with `!`, any additive states that are also specified for that element will be ignored.

## Optional: Use the status flags

Ex 1: Add selected class to a button if the register state is active:

```jsx
<button onClick={setState('register')} className={REGISTER ? 'selected' : ''}>
  Register
</button>
```

Ex 2: Combine flags for easy to read conditionals:

```jsx
<input
  required={LOGIN || REGISTER}
  id="password"
  data-tab="login register"
  type="password"
/>
```

## Optional: use custom css logic for hiding elements

By default, an element with the `data-[name]` attribute for conditional rendering is given the `display: none` and `pointer-events: none` css properties when the tab is not active.

You may replace that logic with your own by passing content to the `switch` mixin:

Ex 1: Using transitions

```scss
@import '@tygr/switch';

.tygr-auth {
  [data-auth] {
    transition: opacity 1s;
  }

  @include switch('auth', login, register, reset-password) {
    /**
    * These styles are applied when the data-auth
    * attribute *DOES NOT* match the current state
    */
    opacity: 0;
  }
}
```

Ex 2: Using animations

```scss
@import '@tygr/switch';

.tygr-auth {
  [data-auth] {
    animation: _fade-in 1s;
  }

  @include switch('auth', login, register, reset-password) {
    animation: _fade-out 1s forwards;
  }
}

@keyframes _fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes _fade-out {
  to {
    opacity: 0;
  }
}
```

You can split the sass mixin into multiple calls to apply different transitions for different states becoming active:

```scss
@import '@tygr/switch';

.tygr-auth {
  // Fade in and out when switching to and from the login and register states
  @include switch('auth', login, register) {
    opacity: 0;
  }

  // Shrink and expand when switching to and from the reset-password state
  @include switch('auth', reset-password) {
    transform: scaleY(0);
  }

  [data-auth] {
    /*
     * When switching between types of transition effects, both sets of rules will
     * apply. In a way, it will blend both effects.
     */
    transition: opacity 1s, transform 1s;
  }
}
```
