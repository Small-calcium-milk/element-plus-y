<template>
  <div class="m-4">
    <p>dataType: 'String' | v-model:'{{ form.a }}'</p>
    <y-cascader
        ref="formRef"
        v-model="form.a"
        :options="formOptions.users"
        :props="{
        multiple: true,
      }"
        :isKeyNumber="true"
        :dataType="'String'"
    >
    </y-cascader>
  </div>
  <div class="m-4">
    <p>dataType: 'Array' | v-model:{{ form.b }}</p>
    <y-cascader
      ref="formRef"
      v-model="form.b"
      :options="formOptions.users"
      :props="{
        multiple: true,
      }"
      placeholder="类型"
      :isKeyNumber="true"
      :dataType="'Array'"
    >
    </y-cascader>
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
        id: 1,
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
const { formRef, form, formOptions } = toRefs(state);
</script>
