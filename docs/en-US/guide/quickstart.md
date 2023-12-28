# Quick Start

This section describes how to use element-plus-y in your project.

## Usage

### Full Import

If you don’t care about the bundle size so much, it’s more convenient to use full import.

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
// tips: You must register element-plus-y after registering element-plus
import yblUiElementPlus from "@small_calcium_milk/element-plus-y";
import "@small_calcium_milk/element-plus-y/dist/index.css";
app.use(yblUiElementPlus);

app.mount('#app')
```

#### Volar support

If you use volar, please add the global component type definition to `tsconfig.json` in `compilerOptions.types`.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@small_calcium_milk/element-plus-y/global"]
  }
}
```

### Manually import

element-plus-y provides out of box [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) functionalities based on ES Module.

> App.vue

```html
<template>
  <YCascader></YCascader>
</template>
<script>
  import '@small_calcium_milk/element-plus-y/es/components/cascader/style/css'
  import { YCascader } from '@small_calcium_milk/element-plus-y'
  export default {
    components: { YCascader },
  }
</script>
```
