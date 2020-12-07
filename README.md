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
  @include switch.switch('auth', login, register, reset-password);
}
```

The `switch` sass mixin takes in a name for the switch and a list of all the states it can be in. Both parameters should match the ones passed in to the `useSwitch` react hook. You should always enclose this mixin within a selector, just like above, because it makes use of the sass parent selector: `&`.

## Step 3: hide and show elements conditionally using `data-[name]`

```jsx
<input name="password" data-auth="login register" />

<input name="confirm-password" data-auth="register" />
```

For elements you want to conditionally show or hide, add the `data-[name]` attribute with a list of the state names you would like it to show up under. In this example, with the switch being named `'auth'`, the `password` input will be shown if the state is either `login` or `register`. Likewise, the `confirm-password` input will only be shown when the `register` state is active.

These attributes can be used on any element that is a child of the switch container, regardless of which react component they are in.

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
  data-auth="login register"
  type="password"
/>
```

## Optional: use custom css logic for hiding elements

By default, an element with the `data-[name]` attribute for conditional rendering is given the `display: none` and `pointer-events: none` css properties when the state is not active.

You may replace that logic with your own by passing content to the `switch` mixin:

Ex 1: Using transitions

```scss
@use '@tygr/switch';

.tygr-auth {
  [data-auth] {
    transition: opacity 1s;
  }

  @include switch.switch('auth', login, register, reset-password) {
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
@use '@tygr/switch';

.tygr-auth {
  [data-auth] {
    animation: _fade-in 1s;
  }

  @include switch.switch('auth', login, register, reset-password) {
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
@use '@tygr/switch';

.tygr-auth {
  // Fade in and out when switching to and from the login and register states
  @include switch.switch('auth', login, register) {
    opacity: 0;
  }

  // Shrink and expand when switching to and from the reset-password state
  @include switch.switch('auth', reset-password) {
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

The `switch` mixin only applies styles when a state is **not active**. In order to apply some styles to any element when specified states are **active**, use the `switchChild` mixin:

```scss
@use '@tygr/switch';

.container {
  @include switch.switch('switch', 'state-1', 'state-2', 'state-3');

  .some-child {
    @include switch.switchChild('switch', 'state-1', 'state-3') {
      // Styles applied to `.some-child` when the `state-1` or `state-3` state is active
      color: green;
    }
  }
}
```

The mixin takes in the name of the parent switch and one or more states. When any of the specified states are active, the styles will be applied to the parent selector.

# Composing multiple switches

## Option 1: use the partial syntax for `data-[name]`

```jsx
[switchContainer, setState] = useSwitch(
  { name: 'auth' },
  'register',
  'login/local',
  'login/provider',
);

...

return (
  <div data-auth="^login">
    <span>This div is shown for all states that begin with 'login/'</span>
    <span data-auth="login/local">Local login</span>
    <span data-auth="login/provider">Use a provider</span>
  </div>
);
```

If you want to have substates for a switch state, you can specify them as '/'-separated paths. No need to include the parent path but you can if you want the parent path to be considered a separate state.

Use the `^` operator in the `data-[name]` attribute to include an element on all child paths, as shown above for the parent div. Other than the partial syntax, '/'-separated paths behave just like any other state.

## Option 2: use a switchChild

```jsx
const [parent] = useSwitch(
  { name: 'parent' },
  'state-with-children',
  'other-states'
);
const [child] = useSwitch({ name: 'child' }, 'child-1', 'child-2');

...

return (
  <div {...parent} className="parent">
    <div {...child} className="child">
      <span data-child="child-1">
        Only displays when the parent state is state-with-children
      </span>
    </div>
  </div>
)
```

```scss
@use '@tygr/switch';

.parent {
  @include switch.switch('parent', state-with-children, other-states);
}

.child {
  /*
   * Wrap the child switch in the `switchChild` mixin.
   * Call this mixin with name of the parent switch and the name of the state with children
   */
  @include switch.switchChild('parent', state-with-children) {
    @include switch.switch('child', child-1, child-2);
  }
}
```

You can use the sass mixin `switchChild` to limit a child switch to only hide elements if the parent switch is in a specified state.

The mixin takes in the name of the parent and any number of states for which you'd like the child to be active for.

Functionally, the `switchChild` mixin applies styles (using the parent selector) only when the specified state is currently active.
