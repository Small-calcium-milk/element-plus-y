

[//]: # (components-helper 是读取 第一级 # 后面的内容作为标题title )
# Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

:::tip

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/)).

:::

## 基础用法

基本配置做了修改: `开启清空` | `开启过滤` | `取消父子关联` | `选中值只返回节点的id` | `value: 'id'` | `label: 'title'`

:::demo

cascader/basic

:::

## 指定options选项item的value值类型

通过`isKeyNumber` 指定item的value值类型 是number类型还是字符串类型 可以 让v-model绑定的数据 适应对应value值的类型 `默认false`

:::demo

cascader/isKeyNumber

:::


## 多选情况下 v-model绑定值的 2种类型

:::demo

cascader/dataType

:::

## 全选子集按钮

如果是存在子集children的情况下 默认显示 全选子集按钮 可以通过`showSelectAllBtn`来控制

:::demo

cascader/showSelectAllBtn

:::

## 全选子集时 是否递归

全选子集 默认递归 可以通过`isDeepSelect`来控制

:::demo

cascader/isDeepSelect

:::

## 单选情况下 不显示radio控件

可以通过`showRadioControl`来控制

:::demo

cascader/showRadioControl

:::

[//]: # (插件@vitepress-demo-preview的demo写法)
[//]: # (有两种触发子菜单的方式)
[//]: # (:::preview)

[//]: # ()
[//]: # (demo-preview=../../examples/cascader/basic.vue)

[//]: # ()
[//]: # (:::)

## Cascader API

### Cascader Attributes

| Name                  | Description                                                                                         | Type                          | Default |
|-----------------------|-----------------------------------------------------------------------------------------------------|-------------------------------|----|
| model-value / v-model | 绑定值                                                                                                 | `string[] \| number[] \| any` | —  |
| options               | 选项的数据源-同element-plus, `value` 和 `label` 可以通过 `CascaderProps`自定义.                                    | `object`                      | —  |
| props   | 配置选项-同element-plus  ^[默认配置]`开启清空 \| 开启过滤 \| 取消父子关联 \| 选中值只返回节点的id \| value: 'id' \| label: 'title'` | `object`      | —  |
| isKeyNumber           | options选项item的value 值 是否是 number 如果不是就默认字符串                                                         | `Boolean`   | false  |
| dataType    | 多选情况下 => v-model绑定值的类型   `String`: `'1,2,3'` 和 `Array`: `[2,3,4]` 两种               | ^[enum]`'String' \| 'Array'` | 'String'  |
| showSelectAllBtn      | 是否显示全选子集按钮                                                                                          | `Boolean`      | true  |
| showRadioControl    | 单选情况下是否显示radio控件 => 内置了默认自定义样式 单选情况下不显示radio控件                                                      | `Boolean`      | false  |
| ...                   | 其他参数同element-plus                                                                                   | —      | —  |


### Cascader Events 事件


## 贡献者
<vpMember />
