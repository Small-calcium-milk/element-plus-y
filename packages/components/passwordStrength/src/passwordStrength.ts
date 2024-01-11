import { buildProps, definePropType } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

export const dataTypes = ['String', 'Array'] as const


export const passwordStrengthProps = buildProps({
  model: Object,
  modelValue: {
    type: definePropType<object>(Object),
  },
  styles: {
    type: definePropType<any>([Object, String, Array]),
  },
} as const)

export type PasswordStrengthProps = typeof passwordStrengthProps

// UPDATE_MODEL_EVENT
export const passwordStrengthEmits = {
  [UPDATE_MODEL_EVENT]: (val: CascaderValue) =>
    !!val || val === null || val === '',
}

export type PasswordStrengthEmits = typeof passwordStrengthEmits
