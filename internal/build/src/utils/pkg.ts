import { PKG_NAME, PKG_PREFIX, FULL_PAATH_PREFIX } from '@element-plus/build-constants'
import { buildConfig } from '../build-info'

import type { Module } from '../build-info'

/** used for type generator */
export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    /*id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
    id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`)*/
    id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${FULL_PAATH_PREFIX}/theme-chalk`)
    id = id.replaceAll(`${PKG_PREFIX}/`, `${FULL_PAATH_PREFIX}/${config.output.name}/`)
    return id
  }
}
