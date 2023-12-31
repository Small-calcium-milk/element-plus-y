import { PKG_NAME, PKG_PREFIX, FULL_PAATH_PREFIX } from '@element-plus/build-constants'

import type { Plugin } from 'rollup'

export function ElementPlusAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  /*const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const*/
  const bundleThemeChalk = `${FULL_PAATH_PREFIX}/${themeChalk}` as const

  return {
    name: 'element-plus-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      }
    },
  }
}
