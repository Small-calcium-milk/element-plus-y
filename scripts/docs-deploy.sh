#!/bin/sh

# 确保脚本抛出遇到的错误
set -e

# 打包docs
pnpm docs:build

# 进入打包后的文件目录
cd docs/.vitepress/dist

# int git
git init
git add -A
git commit -m "deploy docs"

# 推送到github 的gh-pages分支   master:gh-pages 本地分支名:远程分支名
git push -f https://github.com/Small-calcium-milk/element-plus-y.git master:gh-pages


cd -

echo "✅ deploy docs completed"
