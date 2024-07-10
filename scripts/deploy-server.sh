#!/usr/bin/env sh
# 可以通过git update-index --assume-unchanged scripts/deploy-server.sh标记该文件不被跟踪提交
# 可以通过git update-index --no-assume-unchanged scripts/deploy-server.sh再次标记该文件跟踪提交

project_path=./
user=
password=
ip=
server_path=

# cd $project_path
tar -zcvf docs.tar.gz docs

# 回到根目录
# cd ../

# 上传文件到服务器
expect scripts/uploadfile2server.sh $project_path $user $password $ip $server_path

# 解压服务器文件
expect scripts/unzipfileinserver.sh $user $password $ip $server_path

rm -rf $project_path/docs.tar.gz

exit