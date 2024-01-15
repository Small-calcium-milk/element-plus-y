import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import locale from "element-plus/es/locale/lang/zh-cn"
import yblUiElementPlus from '@small_calcium_milk/element-plus-y'
import '@small_calcium_milk/element-plus-y/dist/index.css'

import { globals } from '../vitepress'
// import VPApp, { NotFound, globals } from '../vitepress'
// import { define } from '../utils/types'
// import 'uno.css'
import './style.css'
import './custom.scss'
// import type { Theme } from 'vitepress'
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

// 贡献者
import vpMember from '../vitepress/components/vp-members/index.vue'

// 测试源组件
// import sourceComp from '../../../packages/components/cascader/src/cascader.vue'

const getAllComponentsFn = async (app) => {
  const component_modules = import.meta.glob(
    '../../../packages/components/*/*',
    {
      eager: true,
    }
  )

  for (const comp in component_modules) {
    const module = component_modules[comp]
    // TestYCascader  Module
    app.component(`Test${module.default.name}`, module.default)
  }
}

export default {
  // NotFound,
  // Layout: VPApp,
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus, {
      locale: zhCn,
    })
    app.use(yblUiElementPlus)

    // 注册所有组件用于测试
    getAllComponentsFn(app)
    // 测试源组件
    // app.component('sourceComp', sourceComp)
    // 贡献者
    app.component('vpMember', vpMember)

    app.component('demo-preview', ElementPlusContainer)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
