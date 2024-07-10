#!/usr/bin/expect

# 获取传入参数
set user [lindex $argv 0]
set password [lindex $argv 1]
set ip [lindex $argv 2]
set server_path [lindex $argv 3]

# 启动进程(由spawn启动的进程的输出可以被expect所捕获)
spawn ssh $user@$ip
expect "$user@$ip's password:"
send "$password\r"
expect "#"
send "cd $server_path\r"
expect "#"
send "tar -zxvf docs.tar.gz --strip-components 1\r"
# 退出远程终端
expect eof