<template>
  <div class="m-4">
    <YPasswordStrength
      ref="ruleFormRef"
      :model="form"
      label-width="120px"
      :fieldsOptions="{
        disabled: true,
      }"
    >
    </YPasswordStrength>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const state: any = reactive({
  ruleFormRef: ref<FormInstance>(),
  form: {
    password: '123',
  },
})
const { ruleFormRef, form } = toRefs(state)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
