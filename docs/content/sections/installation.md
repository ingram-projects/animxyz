---
title: Installation
id: installation
quote: Woah... I know kung fu.
---

---
## Using a package manager

AnimXYZ can be installed using your favorite package manager:

```bash
# with npm
npm install @animxyz/core

# with yarn
yarn add @animxyz/core
```

After installation, you will need to import AnimXYZ into your project.

### Import into a Webpack project
If your Webpack project uses `css-loader` you can import the CSS by putting this snippet anywhere in your javascript code:

```js
import '@animxyz/core'
```

### Import into a SASS project
AnimXYZ is built in SASS and provides useful functions and mixins for customization. Import it anywhere in your SASS code:

```scss
// Import the functions/mixins
@import '@animxyz/core';

// Add all the core/utilities selectors
@include xyz-all;
// --- Or for more control and granularity ---
@include xyz-core;
@include xyz-utilities;
```

---
## Using jsDelivr

To add AnimXYZ using a CDN put this link in the `<head>` of your `index.html` file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@animxyz/core@0.6.0/dist/animxyz.min.css">
```

---

::: note [Vue,React]
If you are using AnimXYZ in a Vue or React project we strongly recommend you also use our AnimXYZ components. To add those, follow the installation instructions in the relevant sections [Vue](#vue-installation) and [React](#react-installation).
:::
