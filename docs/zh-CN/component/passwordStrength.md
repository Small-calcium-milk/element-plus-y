[//]: # 'components-helper 是读取 第一级 # 后面的内容作为标题title '

# PasswordStrength 密码强度

:::tip

适合需要验证密码强度的场景

:::

## 基础用法

默认 密码字段: password;确认密码字段:againPassword; 可以通过`pwdValue`和`againPasswordValue`配置
:::tip

配置 `pwdValue`和`againPasswordValue` 为空字符串时，表示不使用这个字段 会隐藏对应的 el-form-item 项

:::

:::demo

passwordStrength/basic

:::

## 强度等级

通过`level` 指定校验密码强度的等级 `默认:middle` 可选`low` | `middle` | `high`

:::demo

passwordStrength/level

:::

## 禁用

通过`disabled`配置

:::demo

passwordStrength/disabled

:::

## 显示密码项

通过`show`配置

:::demo

passwordStrength/show

:::

## 密码长度限制

通过`minLength`和`maxLength`配置

:::demo

passwordStrength/length

:::

## 插槽使用

提供三个插槽 `top` `bottom` `default`

:::demo

passwordStrength/slot

:::

## PasswordStrength API

### PasswordStrength Attributes

| Name          | Description                             | Type                    | Default |
| ------------- | --------------------------------------- | ----------------------- | ------- |
| model         | 绑定值                                  | `Object`                | —       |
| fieldsOptions | 配置选项, 请参阅下面 `FieldsOption` 表. | ^[object]`FieldsOption` | -       |
| rule...       | 其他参数同 el-form                      | —                       | —       |

### PasswordStrength Events

| Name   | Description                             | Type                                        |
| ------ | --------------------------------------- | ------------------------------------------- |


### PasswordStrength Slots

| Name    | Description                  | Scope |
| ------- | ---------------------------- | ----- |
| top     | 在密码上面                   | -     |
| bottom  | 在密码下面                   | -     |
| default | 默认插槽 在插槽`#bottom`下面 | -     |

## FieldsOption

| Attribute          | Description       | Type                                 | Default         |
| ------------------ | ----------------- | ------------------------------------ | --------------- |
| pwdValue           | 密码的属性值      | `string`                             | 'password'      |
| pwdLabel           | 密码的标签值      | `string`                             | '登录密码'      |
| againPasswordValue | 确认密码的标签值  | `string`                             | 'againPassword' |
| againPasswordLabel | 确认密码的标签值  | `string`                             | '确认密码'      |
| disabled           | 是否禁用          | `boolean`                            | false           |
| show               | 是否显示 pwdValue | `boolean`                            | true            |
| level              | 安全等级          | ^[enum]`'low' \| 'middle' \| 'high'` | 'middle'        |
| minLength          | 密码最小长度      | `number`                             | 8               |
| maxLength          | 密码最大长度      | `number`                             | 16              |

## 贡献者

<vpMember />
