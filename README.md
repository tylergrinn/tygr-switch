# Tygr Tabs

[Demo](https://tygr.info/@tygr/tabs)

[Forking Guide](https://github.com/tylergrinn/tygr-logo/blob/main/docs/forking.md)

This a simple react hook and sass mixin designed to create tabbed components.

The tabbed component will share as much html as it can between the different tabs, allowing for smooth transitions.

## Requirements:

- A react application built with node (webpack, rollup, babel)
- Sass compiler

See the `demo/webpack.config.js` file for an example of using react and sass with webpack. The `package.json` has the babel config.

## Installation:

```cmd
npm i --save @tygr/tabs
```

## Step 1: use the tabs hook in your component

```jsx
import React from 'react';
import useTabs from '@tygr/tabs';

export default function Auth() {
  const [attributes, setTab, LOGIN, REGISTER, RESET_PASSWORD] = useTabs(
    'login',
    'register',
    'reset-password'
  );

  return (
    <div {...attributes} className="tygr-auth">
      <div>...etc</div>
    </div>
  );
}
```

The `useTabs` hook takes an unspecified number of tab names as parameters. It returns an attributes object to be used for the tab container, a function to set the current tab, and boolean flags for each tab name you passed in. Each flag tells you whether that tab is currently active.

Spread the `attributes` object returned from the `useTabs` hook over the root element of the tabs container as shown above.

## Step 2: use the tabs sass mixin

```scss
@use '@tygr/tabs';

.tygr-auth {
  @include tabs(login, register, reset-password);
}
```

The tab names passed in to the `tabs` mixin must match the ones passed in to the `useTabs` react hook. You should always enclose this mixin within a selector, just like above, because it makes use of the sass parent selector: `&`.

## Step 3: hide and show elements conditionally using `data-tab`

```jsx
<input data-tab="login register" name="password" />

<input data-tab="register" name="confirm-password" />
```

For elements you want to conditionally show or hide, add the `data-tab` attribute with a list of the tab names you would like it to show up under. In this example, the `password` input will be shown if the tab is either `login` or `register`. Likewise, the `confirm-password` input will only be shown when the `register` tab is active.

## Step 4: Use the setTab function to change tabs

```jsx
<button onClick={setTab('reset-password')}>Reset Password</button>
```

Use the `setTab` higher order function returned from the `useTabs` hook in order to change tabs on button clicks. The method is type-safe if using typescript, so you don't have to memorize which name you gave each tab.

## Optional: Use the tab status flags

Ex 1: Add selected class to current tab button:

```jsx
<button onClick={setTab('register')} className={REGISTER && 'selected'}>
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

By default, an element with the `data-tab=tab-name` attribute for conditional rendering is given the `display: none` css property when the tab is not active.

You may replace that logic with your own by passing content to the `tabs` mixin:

Ex 1: Using transitions

```scss
@import '@tygr/tabs';

.tygr-auth {
  [data-tab] {
    transition: opacity 1s;
  }

  @include tabs(login, register, reset-password) {
    /**
    * These styles are applied when the data-tab
    * attribute *DOES NOT* match the current tab
    */
    opacity: 0;
  }
}
```

Ex 2: Using animations

```scss
@import '@tygr/tabs';

.tygr-auth {
  [data-tab] {
    animation: _fade-in 1s;
  }

  @include tabs(login, register, reset-password) {
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

You can split the sass mixin into multiple calls to apply different transitions for different tabs becoming active:

```scss
@import '@tygr/tabs';

.tygr-login {
  // Fade in and out when switching to and from the login and register tabs
  @include tabs(login, register) {
    opacity: 0;
  }

  // Shrink and expand when switching to and from the reset-password tab
  @include tabs(reset-password) {
    transform: scaleY(0);
  }

  [data-tab] {
    /*
     * When switching between types of transition effects, both sets of rules will
     * apply. In a way, it will blend both effects.
     */
    transition: opacity 1s, transform 1s;
  }
}
```

## Optional: set an initial tab programmatically

By default, the tab shown is the first one in the list. You can override that by calling the `setTab` function within a react effect that runs only once when the component is created:

```jsx
import React, { useEffect } from 'react';

...

useEffect(setTab('register'), []);
```

By passing in an empty list to the `dependencies` parameter of `useEffect`, the effect will not be run for any prop or state updates.

This is useful if you are allowing the consumer of the component to pass in an initial tab via a prop.
