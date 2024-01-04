import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import consola from 'consola'
import { docRoot } from '@element-plus/build-utils'
import glob from 'fast-glob'
import chalk from 'chalk'

async function main() {
  let files = await glob("demo_for_read.vue", {
    cwd: path.resolve(docRoot, 'examples/test'),
    absolute: true,
    onlyFiles: true,
  })
  const content = await readFile(files[0], 'utf-8')
  // consola.log(chalk.cyan(content))

  await mkdir(path.dirname(path.resolve(docRoot, 'examples/test/components/demo.vue')), {
    recursive: true,
  })
  await writeFile(
    path.resolve(docRoot, 'examples/test/components/demo.vue'),
    `${content}`
  )
  consola.success(chalk.green(`写入 demo_for_read.vue 完成`))
}

main()
