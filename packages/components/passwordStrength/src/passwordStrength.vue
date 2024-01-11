<template>
  <el-form
    :ref="setRefFn"
    v-model="selectData"
    :style="styles"
    v-bind="attrsBind"
  >
    <slot name="top" />

    <slot name="bottom"></slot>
    <slot name="footer"></slot>
  </el-form>
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  useSlots,
  useAttrs,
  computed,
  reactive,
  toRefs,
  onMounted,
  watch,
} from 'vue'

import { isEmpty } from '../../../utils/utils/util'
import {
  passwordStrengthEmits,
  passwordStrengthProps,
} from './passwordStrength'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

const COMPONENT_NAME = 'YPasswordStrength'

defineOptions({
  name: COMPONENT_NAME,
})

const instance: any = getCurrentInstance()

const props = defineProps(passwordStrengthProps)

// vue3 不需要改 默认的 v-model 事件名 不会和子组件的v-model冲突
const emit = defineEmits(passwordStrengthEmits)
const slots: any = useSlots()
const attrs: any = useAttrs()
const attrsBind: any = computed(() => {
  let obj = {
    clearable: true, // 默认开启清空
    filterable: true, // 默认开启过滤
    ...attrs,
    popperClass: !props.showRadioControl
      ? `${props.popperClass} popper-custom`
      : props.popperClass, // 默认自定义样式
    props: Object.assign(
      {},
      {
        // 指定选项的子选项为选项对象的某个属性值
        children:
          props.props && props.props.hasOwnProperty('children')
            ? props.props.children
            : 'children',
      },
      props.props ? props.props : {}
    ),
  }
  return obj
})

const state: any = reactive({
  refData: [] as Array<any>,
  selectData: null as any,
})

const { selectData } = toRefs(state)

onMounted(() => {
  // console.log(state.refData[0], "state.refData[0]");
  // console.log(state.refData[0].$, "state.refData[0].$");
  extendMethod()
})

// 继承Methods
const extendMethod = () => {
  // 把方法注入到实例的exposed中
  const entries = Object.entries(state.refData[0].$.exposed)
  // console.log('111', entries)
  for (const [key, value] of entries) {
    instance.exposed[key] = value
  }
}

const setRefFn = (el: any) => {
  // console.log(el, "elel");
  state.refData.push(el)
}


/*watchEffect(() => {
  console.log(props.modelValue, 'props.modelValue')
})*/

watch(
  () => props.modelValue,
  (val: any) => {
    // console.log(val, "props.modelValue");
    if (attrsBind.value.props.multiple) {
      // 多选
      let list: any = null
      if (props.dataType == 'Array') {
        list = val
      } else {
        list = val ? val.split(',') : []
      }
      if (props.isKeyNumber) {
        list.map((item, index) => {
          list[index] = Number(item)
        })
      }
      state.selectData = list
    } else {
      // let val = props.modelValue;
      // 单选
      if (props.isKeyNumber) {
        state.selectData = Number(val)
      } else {
        state.selectData = val
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
watch(
  () => state.selectData,
  (val: any) => {
    // console.log(val, "state.selectData");
    if (attrsBind.value.props.multiple) {
      emit(UPDATE_MODEL_EVENT, props.dataType == 'Array' ? val : val.join(','))
    } else {
      emit(UPDATE_MODEL_EVENT, state.selectData)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

// 暴露方法出去 保险起见
defineExpose({ ...instance.exposed })
</script>
