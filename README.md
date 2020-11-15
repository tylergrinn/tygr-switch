# Tygr Logo

[Demo](https://tygr.info/download/@tygr/logo/lib/demo)

[Forking Guide](docs/forking.md)

This is a react component packaged for three environments: node, browser, and standalone.

- Node is reccommended. If you are already using react in the project, this library simply exports a react component function you can use directly in jsx.

- Browser is for fast prototyping in the browser. You can add this component via a script tag. The react and react-dom script tags must be placed before the component script.

- Standalone is for projects that do not use react. It exposes the `mount` function, which takes an HTML element.

## Node

Installation:

```cmd
npm i --save @tygr/logo
```

Usage (jsx):

```jsx
import Logo from '@tygr/logo';

// Import styles. Make sure there is a style loader specified in your
// webpack config
import '@tygr/logo/lib/tygr-logo.min.css';

export default function MyComponent() {
  return (
    <div>
      <h1>Logo usage example</h1>
      <Logo />
    </div>
  );
}
```

## Browser

Usage:

When included via script tag, the component is exposed as a window library named 'TygrLogo'

```html
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script src="https://tygr.info/download/@tygr/logo/lib/tygr-logo.min.js"></script>
    <link
      rel="stylesheet"
      href="https://tygr.info/download/@tygr/logo/lib/tygr-logo.min.css"
    />
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">
      ReactDOM.render(<TygrLogo />, document.getElementById('app'));
    </script>
  </body>
</html>
```

## Standalone

Installation:

```cmd
npm i --save @tygr/logo
```

Usage:

```jsx

// Vanilla JS
import Logo from '@tygr/logo/lib/standalone';

const el = document.getElementById('tygr-logo');

Logo.mount(el);

// Vue
<template>
<div>
  <div ref="tygr-logo"></div>
</div>
</template>

<script>
import Logo from '@tygr/logo/lib/standalone';

export default {
  mounted() {
    Logo.mount(this.$refs['tygr-logo']);
  },
};
</script>

// Angular Typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import Logo from '@tygr/logo/lib/standalone';

@Component({
  selector: 'app-root',
  template: '<div><div #tygr-logo></div></div>',
})
export class LogoComponent  {
  @ViewChild('tygr-logo') el: ElementRef;

  ngAfterViewInit() {
    Logo.mount(this.el.nativeElement);
  }
}
```

You should not use the standalone version if you have multiple react components in your project.

## Customizing styles

Sass variables can be overridden if you accept responsibility for transpiling it into css. You can see an example of this setup in the `webpack.config.demo.js` configuration named `sass`.

Make sure to reassign any sass variables before importing the `main.scss` file:

```scss
$accent-1: white;
$accent-2: yellow;

@import '@tygr/logo/lib/main';
```
