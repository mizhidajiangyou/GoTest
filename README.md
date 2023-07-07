# GoTest
基于go-zero框架的测试工具

* goctl
```go get -u github.com/tal-tech/go-zero/tools/goctl```

* 推荐和shelltest工具一起使用

* 可以根据dockerfile生成镜像

e.g.

1、 使用一个通用的shell脚本    
```curl -H "Content-Type: application/json" -X POST -d '{"args": "\[Asd,vasd\]"}' "127.0.0.1:18080/bash/normal"```