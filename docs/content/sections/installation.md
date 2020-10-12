---
title: Installation
quote: Woah... I know kung fu.
---

---
## Using a package manager

To install AnimXYZ, use your favorite package manager:

```bash
# with npm
npm install @animxyz/core

# with yarn
yarn install @animxyz/core
```

**Import into a Webpack project:** If your Webpack project uses `css-loader` you can import the CSS by putting this snippet anywhere in your javascript code:

```js
import '@animxyz/core'
```

**Import into a SASS/SCSS project:** AnimXYZ is built in SCSS and provides useful functions and mixins for customization. Import it anywhere in your SASS code:

```css
@import '@animxyz/core';
```

---
## Using jsDelivr

To add AnimXYZ using a CDN put this link in the `<head>` of your `index.html` file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@animxyz/core@0.0.22/dist/animxyz.min.css">
```

---

::: note [Vue,React]
If you are using AnimXYZ in a Vue or React project we strongly recommend you also use our AnimXYZ components. To add those, follow the installation instructions in the relevant sections [Vue](#vue) and [React](#react).
:::
