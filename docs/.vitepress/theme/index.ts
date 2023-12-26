import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import locale from "element-plus/es/locale/lang/zh-cn"
import yblUiElementPlus from "@small_calcium_milk/element-plus-y";
import "@small_calcium_milk/element-plus-y/dist/index.css";

import { globals } from "../vitepress";
// import VPApp, { NotFound, globals } from '../vitepress'
// import { define } from '../utils/types'
// import 'uno.css'
import './style.css'
import './custom.scss'
// import type { Theme } from 'vitepress'
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

// 测试源组件
import sourceComp from '../../../packages/components/cascader/src/cascader.vue'

export default {
  // NotFound,
  // Layout: VPApp,
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    app.use(yblUiElementPlus)

    // 测试源组件
    app.component('sourceComp', sourceComp)

    app.component('demo-preview', ElementPlusContainer)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
