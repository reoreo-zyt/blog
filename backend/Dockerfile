# 运行项目基于的底层镜像，如本地开发需要安装go一样
FROM golang:1.17.7
# 将项目放到容器中的位置
WORKDIR /opt
# 将项目中的所有文件放到容器的opt文件下
ADD . /opt
# 取消代理
RUN go env -u GOPROXY
# 生成二进制文件
RUN go build -o main ./main.go
# 接口
EXPOSE 5200
# 执行项目的命令
CMD ["/opt/mian"]