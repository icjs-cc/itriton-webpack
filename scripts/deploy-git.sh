#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 进入生成的文件夹
cd docs

git init
git add -A
git commit -m 'deploy'
git remote add origin git url
git push -f -u origin master

cd -