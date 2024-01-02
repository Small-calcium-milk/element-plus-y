<template>
  <el-cascader
    :ref="setRefFn"
    v-model="selectData"
    style="width: 100%"
    v-bind="attrsBind"
  >
    <!--attrs-->
    <template #default="{ node, data }">
      <el-button
        class="button_all_select"
        type="primary"
        plain
        size="small"
        v-if="
          !isEmpty(data[attrsBind.props.children]) &&
          attrsBind.props.multiple &&
          attrsBind.props.checkStrictly &&
          showSelectAllBtn
        "
        @click.stop="handleSelectAllChildren(data)"
      >
        全选
      </el-button>
      {{ data[attrsBind.props.label] }}
    </template>

    <!-- 遍历子组件作用域插槽，并对父组件暴露 $slots vue2 -->
    <template v-for="(index, name) in slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </el-cascader>
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
import { cascaderEmits, cascaderProps, CascaderProps } from './cascader'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

const COMPONENT_NAME = 'YCascader'

defineOptions({
  name: COMPONENT_NAME,
})

const instance: any = getCurrentInstance()

const props = defineProps(cascaderProps)

// vue3 不需要改 默认的 v-model 事件名 不会和子组件的v-model冲突
const emit = defineEmits(cascaderEmits)
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
        // 取消父子关联 可以选择任意一项
        checkStrictly:
          props.props && props.props.hasOwnProperty('checkStrictly')
            ? props.props.checkStrictly
            : true,
        // 值返回节点的id 不返回各级菜单的值所组成的数组
        emitPath:
          props.props && props.props.hasOwnProperty('emitPath')
            ? props.props.emitPath
            : false,
        value:
          props.props && props.props.hasOwnProperty('value')
            ? props.props.value
            : 'id',
        label:
          props.props && props.props.hasOwnProperty('label')
            ? props.props.label
            : 'title',
        // 指定选项的禁用为选项对象的某个属性值
        disabled:
          props.props && props.props.hasOwnProperty('disabled')
            ? props.props.disabled
            : 'disabled',
        // 次级菜单的展开方式
        expandTrigger:
          props.props && props.props.hasOwnProperty('expandTrigger')
            ? props.props.expandTrigger
            : 'hover',
        multiple:
          props.props && props.props.hasOwnProperty('multiple')
            ? props.props.multiple
            : false,
        // 指定选项的子选项为选项对象的某个属性值
        children:
          props.props && props.props.hasOwnProperty('children')
            ? props.props.children
            : 'children',
      },
      props.props ? props.props : {}
    ) as CascaderProps,
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

// 选择所有子分类
const handleSelectAllChildren = (item) => {
  const childrenIds = getChildrenDeepFn(item[attrsBind.value.props.children])
  let temp = state.selectData.concat(childrenIds)
  state.selectData = temp
}
// 递归获取所有的子元素
const getChildrenDeepFn = (arr) => {
  let temp = [] as any[]
  arr.forEach((child) => {
    if (!state.selectData.includes(child[attrsBind.value.props.value])) {
      temp.push(child[attrsBind.value.props.value])
    }
    if (props.isDeepSelect && !isEmpty(child[attrsBind.value.props.children])) {
      temp.push(...getChildrenDeepFn(child[attrsBind.value.props.children]))
    }
  })
  return temp
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
