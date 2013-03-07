#!/bin/sh

PID=`ps -u noonnightstorm|grep node|sed -n 1p|awk '{print $1}'`



stop()
{
kill $PID
}
restart()
{
kill $PID
nohup node app.js > node.log 2>&1 &
}
start()
{
nohup node app.js > node.log 2>&1 &
}


if [ "$1" = "stop" ];then
stop
elif [ "$1" = "start" ];then
start
elif [ "$1" = "restart" ];then
restart
else
echo "err params"
fi
