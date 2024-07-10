#!/usr/bin/expect

# 获取传入参数
set project_path [lindex $argv 0]
set user [lindex $argv 1]
set password [lindex $argv 2]
set ip [lindex $argv 3]
set server_path [lindex $argv 4]

# 启动进程(由spawn启动的进程的输出可以被expect所捕获)
spawn scp $project_path/docs.tar.gz $user@$ip:$server_path
expect "$user@$ip's password:"
send "$password\r"
# shell脚本要注释该字段，命令行运行正常
# interact
expect eof