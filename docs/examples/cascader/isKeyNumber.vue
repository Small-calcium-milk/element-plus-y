<template>
  <div class="m-4">
    <p>默认isKeyNumber: false | v-model: {{ form.a }}</p>
    <y-cascader
      v-model="form.a"
      :options="formOptions.users"
      :props="{
        multiple: true,
      }"
    >
    </y-cascader>
  </div>
  <div class="m-4">
    <p>
      isKeyNumber: true 看options里的value=>id 的类型是number | v-model:
      {{ form.c }}
    </p>
    <y-cascader
      v-model="form.c"
      :options="formOptions.users2"
      :props="{
        multiple: true,
      }"
      :is-key-number="true"
    >
    </y-cascader>
  </div>
  <div class="m-4">
    <p>
      <el-tag type="danger">错误示范</el-tag>：options里的value=>id
      的类型是number类型的情况下 设置is-key-number="false"
      会导致组件出错影响正常使用
    </p>
    <p>
      isKeyNumber: false 看options里的value=>id 的类型是number | v-model:
      {{ form.d }}
    </p>
    <y-cascader
      v-model="form.d"
      :options="formOptions.users2"
      :props="{
        multiple: true,
      }"
      :is-key-number="false"
    >
    </y-cascader>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'

const value = ref([])

const state: any = reactive({
  refData: [] as Array<any>,
  form: {
    a: '12',
    b: [12],
    c: '12',
    d: '12',
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
    users2: [
      {
        id: 1, // => number类型
        title: '名称1',
        children: [
          {
            id: 12,
            title: '名称1-1',
          },
          {
            id: 13,
            title: '名称1-2',
          },
        ],
      },
      {
        id: 2,
        title: '名称2',
      },
    ],
  },
  type: '',
  temp: {},
})
const { form, formOptions } = toRefs(state)
</script>
