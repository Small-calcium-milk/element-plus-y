import 'normalize.css'
// import 'uno.css'
import VPDemo from './components/vp-demo/index.vue'
import ApiTyping from './components/globals/vp-api-typing.vue'
import ApiEnumType from './components/globals/vp-api-enum.vue'

import './style/css-vars.scss'
import './style/index.scss'

export { VPDemo }

import type { Component } from 'vue'

export const globals: [string, Component][] = [
    ['Demo', VPDemo],
    ['ApiTyping', ApiTyping],
    ['EnumType', ApiEnumType],
]
