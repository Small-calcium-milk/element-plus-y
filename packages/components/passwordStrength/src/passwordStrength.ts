import { buildProps, definePropType } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

export const levelEnum = ['low', 'middle', 'high'] as const
export type LevelEnum = 'low' | 'middle' | 'high'

export interface FieldsOption {
  pwdValue?: string
  pwdLabel?: string
  againPasswordValue?: string
  againPasswordLabel?: string
  disabled?: boolean
  show?: boolean
  level?: LevelEnum
  minLength?: number
  maxLength?: number
}

export const defaultFieldsOption: FieldsOption = {
  pwdValue: 'password',
  pwdLabel: '登录密码',
  againPasswordValue: 'againPassword',
  againPasswordLabel: '确认密码',
  disabled: false, // 是否禁用
  show: true, // 是否显示pwdValue
  level: 'middle', // 安全等级
  minLength: 8, // 密码最小长度
  maxLength: 16, // 密码最大长度
}

export const passwordStrengthProps = buildProps({
  model: {
    type: definePropType<object>(Object),
  },
  fieldsOptions: {
    type: definePropType<FieldsOption>(Object),
    default: () => defaultFieldsOption,
  },
} as const)

export type PasswordStrengthProps = typeof passwordStrengthProps

// UPDATE_MODEL_EVENT
export const passwordStrengthEmits = {
  [UPDATE_MODEL_EVENT]: (val: object) => !!val || val === null || val === '',
  model: (val: object) => !!val || val === null || val === '',
}

export type PasswordStrengthEmits = typeof passwordStrengthEmits
