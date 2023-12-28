import { defineConfig } from 'vitepress'
// import { mdPlugin } from './config/plugins'
import tooltip from './plugins/tooltip'
import tag from './plugins/tag'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
// import { docRoot } from '@element-plus/build-utils'
import buildUtils from '@element-plus/build-utils'
const { docRoot } = buildUtils

import { highlight } from './utils/highlight'
import path from 'path'
import fs from 'fs'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'
import type { UserConfig } from 'vitepress'

const localMd = MarkdownIt().use(tag)

import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}

// https://vitepress.dev/reference/site-config
export const config: UserConfig = defineConfig({
  base: "/element-plus-y/",
  title: 'element-plus-y',
  description: '',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // outline: [2, 6],
    i18nRouting: false,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            //这里是个大坑，zh是不生效的，改为root即可
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
          'en-US': {
            //这里是个大坑，zh是不生效的，改为root即可
            translations: {
              button: {
                buttonText: 'Search document',
                buttonAriaLabel: 'Search document',
              },
              modal: {
                noResultsText: 'No results could be found',
                resetButtonTitle: 'Clear query criteria',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Toggle',
                },
              },
            },
          },
        },
      },
    },

    /*nav: [
      { text: '指南', link: '/zh-CN/guide/installation' },
      { text: '组件', link: '/zh-CN/component/cascader' },
    ],*/
    /*sidebar: {
      '/zh-CN/guide/': [
        {
          text: '基础',
          items: [
            { text: '安装', link: '/zh-CN/guide/installation' },
            { text: '快速开始', link: '/zh-CN/guide/quickstart' },
          ],
        },
      ],
      '/zh-CN/component/': [
        {
          text: 'Form 表单组件',
          items: [
            { text: 'cascader 级联选择器', link: '/zh-CN/component/cascader' },
          ],
        },
      ],
    },*/
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present element-plus-y',
    },
  },
  markdown: {
    /*theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,*/
    // config: (md) => mdPlugin(md),
    config: (md) => {
      md.use(containerPreview)
      md.use(componentPreview)
      md.use(tooltip)

      md.use(mdContainer, 'demo', {
        validate(params) {
          return !!params.trim().match(/^demo\s*(.*)$/)
        },

        render(tokens, idx) {
          const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

          if (tokens[idx].nesting === 1 /* means the tag is opening */) {
            const description = m && m.length > 1 ? m[1] : ''
            const sourceFileToken = tokens[idx + 2]
            let source = ''
            const sourceFile = sourceFileToken.children?.[0].content ?? ''

            if (sourceFileToken.type === 'inline') {
              source = fs.readFileSync(
                path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
                'utf-8'
              )
            }
            if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

            // :demos="demos" 这里不传 在vp-demo里根据path动态获取对应vue文件
            return `<Demo source="${encodeURIComponent(
              highlight(source, 'vue')
            )}" path="${sourceFile}" raw-source="${encodeURIComponent(
              source
            )}" description="${encodeURIComponent(
              localMd.render(description)
            )}">`
          } else {
            return '</Demo>'
          }
        },
      } as ContainerOpts)
    },
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      // link: '/zh-CN/index', // 主语言只能用根目录的index.md
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh-CN/guide/installation' },
          { text: '组件', link: '/zh-CN/component/cascader' },
        ],
        sidebar: {
          '/zh-CN/guide/': [
            {
              text: '基础',
              items: [
                { text: '安装', link: '/zh-CN/guide/installation' },
                { text: '快速开始', link: '/zh-CN/guide/quickstart' },
              ],
            },
          ],
          '/zh-CN/component/': [
            {
              text: 'Form 表单组件',
              items: [
                {
                  text: 'cascader 级联选择器',
                  link: '/zh-CN/component/cascader',
                },
              ],
            },
          ],
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        }
      },
    },
    'en-US': {
      label: 'English',
      lang: 'en-US', // optional, will be added  as `lang` attribute on `html` tag
      link: '/en-US/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en-US/guide/installation' },
          { text: 'Component', link: '/en-US/component/cascader' },
        ],
        sidebar: {
          '/en-US/guide/': [
            {
              text: 'Base',
              items: [
                { text: 'installation', link: '/en-US/guide/installation' },
                { text: 'quickstart', link: '/en-US/guide/quickstart' },
              ],
            },
          ],
          '/en-US/component/': [
            {
              text: 'Form',
              items: [
                {
                  text: 'cascader',
                  link: '/en-US/component/cascader',
                },
              ],
            },
          ],
        },
      },
    },
  },
})

export default config
