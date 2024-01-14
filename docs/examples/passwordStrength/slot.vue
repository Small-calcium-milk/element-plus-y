<template>
  <div class="m-4">
    <p>top 插槽</p>
    <YPasswordStrength
      ref="ruleFormRef"
      :model="form"
      label-width="120px"
      :fieldsOptions="{}"
    >
      <template #top>
        <el-form-item label="top插槽">
          <el-input></el-input>
        </el-form-item>
      </template>
    </YPasswordStrength>
    <p>bottom 插槽 <el-tag type="warning">也可以加入el-form的其他属性,如: rules</el-tag></p>
    <YPasswordStrength
      ref="ruleFormRef"
      :model="form"
      label-width="120px"
      :fieldsOptions="{}"
      :rules="rules"
    >
      <template #bottom>
        <el-form-item label="bottom插槽" prop="ruleTest">
          <el-input v-model="form.ruleTest"></el-input>
        </el-form-item>
      </template>
    </YPasswordStrength>
    <p>default 默认插槽(默认插槽在 bottom插槽下面)</p>
    <YPasswordStrength
      ref="ruleFormRef"
      :model="form"
      label-width="120px"
      :fieldsOptions="{}"
    >
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
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
  rules: {
    ruleTest: [{ required: true, message: '不能为空', trigger: 'blur' }],
  },
})
const { ruleFormRef, form, rules } = toRefs(state)

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
