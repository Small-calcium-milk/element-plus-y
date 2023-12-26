# 快速开始

本节将介绍如何在项目中使用 element-plus-y。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
// tips: 必须在注册 element-plus 后, 再注册element-plus-y
import yblUiElementPlus from "@small_calcium_milk/element-plus-y";
import "@small_calcium_milk/element-plus-y/dist/index.css";
app.use(yblUiElementPlus);

app.mount('#app')
```

#### Volar 支持

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.types` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@small_calcium_milk/element-plus-y/global"]
  }
}
```

### 手动导入

element-plus-y 提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
功能.

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
