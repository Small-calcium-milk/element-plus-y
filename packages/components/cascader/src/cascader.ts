import { buildProps, definePropType } from '@element-plus/utils'

export const dataTypes = ['String', 'Array'] as const

export type CascaderValue = number | string | []
export type ExpandTrigger = 'click' | 'hover'
export type isDisabled = (data: CascaderOption, node: Node) => boolean
export type isLeaf = (data: CascaderOption, node: Node) => boolean
export type Resolve = (dataList?: CascaderOption[]) => void
export type LazyLoad = (node: Node, resolve: Resolve) => void
export type CascaderNodeValue = string | number
export interface CascaderOption extends Record<string, unknown> {
  label?: string
  value?: CascaderNodeValue
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}
export interface CascaderProps {
  expandTrigger?: ExpandTrigger
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: LazyLoad
  value?: string
  label?: string
  children?: string
  disabled?: string | isDisabled
  leaf?: string | isLeaf
  hoverThreshold?: number
}

export const cascaderProps = buildProps({
  modelValue: {
    type: definePropType<CascaderValue>([Number, String, Array]),
  },
  props: {
    type: definePropType<CascaderProps>(Object),
    default: () => ({} as CascaderProps),
  },
  popperClass: {
    type: String,
    default: '',
  },
  isKeyNumber: {
    type: Boolean,
    default: false,
  },
  dataType: {
    type: String,
    values: dataTypes,
    default: 'String',
  },
  // 默认显示 全选子集按钮
  showSelectAllBtn: {
    type: Boolean,
    default: true,
  },
  // 默认不显示 单选情况下左侧的radio控件
  showRadioControl: {
    type: Boolean,
    default: false,
  },
} as const)

// export type CascaderPropsY = typeof cascaderProps
