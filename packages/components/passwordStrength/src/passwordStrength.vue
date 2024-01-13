<template>
  <el-form
    :ref="setRefFn"
    :model="form"
    class="passwordStrength"
    v-bind="attrsBind"
  >
    <slot name="top" />
    <el-form-item
      :label="fieldsOption.pwdLabel + ':'"
      v-if="fieldsOption.pwdValue && fieldsOption.show"
      :prop="fieldsOption.pwdValue"
    >
      <el-input
        :type="newPsdtype"
        v-model="form[fieldsOption.pwdValue]"
        :disabled="fieldsOption.disabled"
      >
        <template v-slot:suffix>
          <span class="show_pwd" @click="showPwd" v-if="!fieldsOption.disabled">
            <el-icon v-if="newPsdtype == 'password'"><View /></el-icon>
            <el-icon v-else><Hide /></el-icon>
          </span>
        </template>
      </el-input>

      <div class="intensity" v-if="!fieldsOption.disabled">
        <span class="psdText">密码强度</span>
        <span class="line" :class="[level.includes('low') ? 'low' : '']">
          低
        </span>
        <span class="line" :class="[level.includes('middle') ? 'middle' : '']">
          中
        </span>
        <span class="line" :class="[level.includes('high') ? 'high' : '']">
          高
        </span>
        <div class="warningtext">
          密码应由
          {{ fieldsOption.minLength || defaultFieldsOption.minLength }}-{{
            fieldsOption.maxLength || defaultFieldsOption.maxLength
          }}
          位数字、字母、符号组成。 请不要使用容易被猜到的密码,密码强度必须达到{{
            levelOptions[fieldsOption.level]
          }}。
        </div>
      </div>
    </el-form-item>
    <el-form-item
      :label="fieldsOption.againPasswordLabel + ':'"
      v-if="fieldsOption.againPasswordValue"
      :prop="fieldsOption.againPasswordValue"
    >
      <el-input
        :type="confirmPsdtype"
        v-model="form[fieldsOption.againPasswordValue]"
        :disabled="fieldsOption.disabled"
      >
        <template v-slot:suffix>
          <span
            slot="suffix"
            class="show_pwd"
            @click="showconfirmPwd"
            v-if="!fieldsOption.disabled"
          >
            <el-icon v-if="confirmPsdtype == 'password'"><View /></el-icon>
            <el-icon v-else><Hide /></el-icon>
          </span>
        </template>
      </el-input>
    </el-form-item>
    <slot name="bottom" />
    <slot />
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
} from 'vue'
// import { cloneDeep } from 'lodash-unified'
import { View, Hide } from '@element-plus/icons-vue'

import {
  passwordStrengthEmits,
  passwordStrengthProps,
  defaultFieldsOption,
} from './passwordStrength'
// import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

const levelOptions = {
  low: '低',
  middle: '中',
  high: '高',
}

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

const fieldsOption: any = computed(() => {
  return Object.assign({}, defaultFieldsOption, props.fieldsOptions)
})

const attrsBind: any = computed(() => {
  let obj = {
    ...attrs,
    rules: Object.assign(
      {},
      {
        [fieldsOption.value.pwdValue]: [
          {
            required: true,
            validator: checkPassword,
            trigger: ['blur', 'change'],
          },
        ],
        [fieldsOption.value.againPasswordValue]: [
          {
            required: true,
            validator: checkConfirmPassword,
            trigger: ['blur', 'change'],
          },
        ],
      },
      attrs.rules ? attrs.rules : {}
    ),
  }
  return obj
})

const state: any = reactive({
  refData: [] as Array<any>,
  level: [],
  confirmPsdtype: 'password',
  newPsdtype: 'password',
})

const { level, confirmPsdtype, newPsdtype } = toRefs(state)

onMounted(() => {
  extendMethod()
})

const form = computed<object>({
  get() {
    return props.model as object
  },
  set(val) {
    emit('model', val)
  },
})

// 继承Methods
const extendMethod = () => {
  // 把方法注入到实例的exposed中
  const entries = Object.entries(state.refData[0].$.exposed)
  for (const [key, value] of entries) {
    instance.exposed[key] = value
  }
}

const setRefFn = (el: any) => {
  state.refData.push(el)
}

//点击小眼睛
const showPwd = () => {
  if (fieldsOption.disabled) return
  if (state.newPsdtype === 'password') {
    state.newPsdtype = ''
  } else {
    state.newPsdtype = 'password'
  }
}
//点击小眼睛
const showconfirmPwd = () => {
  if (fieldsOption.value.disabled) return
  if (state.confirmPsdtype === 'password') {
    state.confirmPsdtype = ''
  } else {
    state.confirmPsdtype = 'password'
  }
}
// 校验密码
const checkPassword = (rule, value, callback) => {
  // console.log(rule, value, 'rule, value')
  if (fieldsOption.value.disabled) return callback()
  state.level = []
  // 校验是数字
  const regex1 = /^\d+$/
  // 校验字母
  const regex2 = /^[A-Za-z]+$/
  // 校验符号
  const regex3 =
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
  if (regex1.test(value)) {
    state.level.push('low')
  } else if (regex2.test(value)) {
    state.level.push('low')
  } else if (regex3.test(value)) {
    state.level.push('low')
  } else if (/^[A-Za-z\d]+$/.test(value)) {
    state.level.push('low')
    state.level.push('middle')
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
      value
    )
  ) {
    state.level.push('low')
    state.level.push('middle')
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
      value
    )
  ) {
    state.level.push('low')
    state.level.push('middle')
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
      value
    )
  ) {
    state.level.push('low')
    state.level.push('middle')
    state.level.push('high')
  }
  if (!state.level.includes(fieldsOption.value.level || 'high')) {
    return callback('密码强度必须达到' + levelOptions[fieldsOption.value.level])
  }

  if (!value) {
    return callback('密码不能为空')
  }
  if (value.length < fieldsOption.value.minLength) {
    return callback(`密码不少于${fieldsOption.value.minLength}位`)
  }
  if (value.length > fieldsOption.value.maxLength) {
    return callback(`密码不大于${fieldsOption.value.maxLength}位`)
  }
  return callback()
}
// 确认密码
const checkConfirmPassword = (rule, value, callback) => {
  if (!value) {
    return callback('请输入确认密码')
  }
  if (value != form.value[fieldsOption.value.pwdValue]) {
    return callback('两次密码输入不一致，请重新输入')
  }
  return callback()
}

/*watchEffect(() => {
  console.log(props.modelValue, 'props.modelValue')
})*/

// 暴露方法出去 保险起见
defineExpose({ ...instance.exposed })
</script>
