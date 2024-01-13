// GlobalComponents for Volar
// import YCascader from "./packages/components/cascader";

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    YCascader: typeof import('@small_calcium_milk/element-plus-y')['YCascader']
    YPasswordStrength: typeof import('@small_calcium_milk/element-plus-y')['YPasswordStrength']
  }

  interface ComponentCustomProperties {
    // $message: typeof import('element-plus')['ElMessage']
  }
}

export {}
