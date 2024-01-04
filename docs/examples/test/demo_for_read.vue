<template>
  <div class="m-4">
    <!-- 组件必须以Test开头  vitepress 注册组件时加了Test前缀 -->
    <TestYCascader
      ref="formRef"
      v-model="form.a"
      :options="formOptions.users"
      :props="{
        multiple: true,
      }"
    >
    </TestYCascader>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'

const value = ref([])

const state: any = reactive({
  formRef: null,
  refData: [] as Array<any>,
  form: {
    a: '12',
    b: [12],
    c: '12',
  },
  formOptions: {
    users: [
      {
        id: '1',
        title: '名称1',
        children: [
          {
            id: '12',
            title: '名称1-1',
          },
          {
            id: '13',
            title: '名称1-2',
          },
        ],
      },
      {
        id: '2',
        title: '名称2',
      },
    ],
  },
  type: '',
  temp: {},
})
const { formRef, form, formOptions } = toRefs(state)
</script>
