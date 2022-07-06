# 运行项目基于的底层镜像，如本地开发需要安装go一样
FROM golang:1.17-alpine AS builder
# 为我们的镜像设置必要的环境变量
ENV GO111MODULE=on \
    GOPROXY=https://goproxy.cn,direct \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# 移动到工作目录：/build
WORKDIR /build

# 复制项目中的 go.mod 和 go.sum文件并下载依赖信息

# 设置代理，防止后面因为墙的原因下载go.mod依赖信息超时
# RUN go env -w GOPROXY=https://goproxy.io
COPY go.mod .
COPY go.sum .
RUN go mod download

# 将代码复制到容器中
COPY . .

# 将我们的代码编译成二进制可执行文件 bubble
RUN go build -o qlnc .

###################
# 接下来创建一个小镜像
###################
FROM scratch

# COPY ./templates /templates
# COPY ./static /static

# 从builder镜像中把/dist/app 拷贝到当前目录
COPY --from=builder /build/qlnc /

# 需要运行的命令
ENTRYPOINT ["/qlnc"]