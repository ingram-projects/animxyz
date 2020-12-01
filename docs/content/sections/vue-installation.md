---
title: Installation
id: vue-installation
quote: May the force be with Vue.
---

### Using a package manager

VueAnimXYZ can be installed using your favorite package manager:

```bash
# with npm
npm install @animxyz/vue

# with yarn
yarn install @animxyz/vue
```

After installation, you will need to import VueAnimXYZ into your project and tell the Vue instance to use the [plugin](https://vuejs.org/v2/guide/plugins.html). This has to be done before you instantiate your Vue app.

```js
import Vue from 'vue'
import VueAnimXYZ from '@animxyz/vue'

Vue.use(VueAnimXYZ)

// Instantiate your Vue instance after using plugins
// new Vue({...})
```

### Using jsDelivr

To install VueAnimXYZ using a CDN put this script in the `<head>` of your `index.html` file:

```html
<script src="https://cdn.jsdelivr.net/npm/@animxyz/vue@0.1.0/dist/VueAnimXyz.js"></script>
```