

[//]: # (components-helper 是读取 第一级 # 后面的内容作为标题title )
# Cascader

If the options have a clear hierarchical structure, Cascader can be used to view and select them.

:::tip

This component requires the `<client-only></client-only>` wrap when used in SSR (eg: [Nuxt](https://nuxt.com/v3)) and SSG (eg: [VitePress](https://vitepress.vuejs.org/)).

:::

## Basic usage

The basic configuration has been modified: `Open clear` | `Enable filtering` | `Disassociate parent` | `The selected value returns only the id of the node` | `value: 'id'` | `label: 'title'`

:::demo

cascader/basic

:::

## Specify the options option item value type

Specifying whether the item's value type is number or string by `isKeyNumber` allows v-model bound data to adapt to the corresponding value type `default false`

:::demo

cascader/isKeyNumber

:::


## Two types of v-model binding values in multiple cases

:::demo

cascader/dataType

:::

## Select All Subset button

If there is a subset of children, the default display of the select all subset button can be controlled by `showSelectAllBtn`

:::demo

cascader/showSelectAllBtn

:::

## The radio control is not displayed in the single option case

It can be controlled by `showRadioControl`

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

| Name                  | Description                                                                                                                                                                                             | Type                          | Default |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|----|
| model-value / v-model | binding value                                                                                                                                                                                           | `string[] \| number[] \| any` | —  |
| options               | data of the options,-same as element-plus, `value` 和 `label` can be customized through `CascaderProps`.                                                                                                 | `object`                      | —  |
| props   | config option-same as element-plus  ^[default configuration]`open clear \| enable filter \| disassociate parent \| the selected value returns only the id of the node \| value: 'id' \| label: 'title'` | `object`      | —  |
| isKeyNumber           | options Specifies whether the value of the option item is number. If not, the default string is used                                                                                                    | `Boolean`   | false  |
| dataType    | multiple choices => v-model Indicates the type of the binding value   `String`: `'1,2,3'` 和 `Array`: `[2,3,4]` two types                                                                                | ^[enum]`'String' \| 'Array'` | 'String'  |
| showSelectAllBtn      | Whether to display the Select All Subset button                                                                                                                                                         | `Boolean`      | true  |
| showRadioControl    | Whether to display the radio control when multiple: false => Built-in default custom style radio control does not appear in the case of radio                                                           | `Boolean`      | false  |
| ...                   | other parameters are the same as element-plus                                                                                                                                                           | —      | —  |


### Cascader Events


## Contributors
<vpMember />
