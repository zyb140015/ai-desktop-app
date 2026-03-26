# ai-desktop-app

## 本地联调

桌面端默认通过 `VITE_API_BASE_URL` 调用后端接口。

推荐联调顺序：

1. 在 `ai-go-service` 目录启动后端：

```bash
make run-desktop-local
```

2. 在当前目录启动桌面端：

```bash
npm run dev:local-api
```

该命令会固定使用：

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## 登录态说明

- 桌面端登录态保存在浏览器存储中，key 为 `desktop-auth`
- 如果后端重启、token 失效，应用会自动清空登录态并跳回登录页
- 如果页面数据异常但接口已恢复，最稳妥的处理是重新登录一次

## 常用命令

```bash
npm run dev
npm run dev:local-api
npm run typecheck
npm run build
npm run pack
npm run dist:win
```

## 生产环境变量

桌面端上线前至少确认以下变量：

```bash
VITE_API_BASE_URL=https://your-api.example.com
VITE_GOADMIN_BASE_URL=https://your-goadmin.example.com
```

- `VITE_API_BASE_URL`：桌面端 BFF，也就是 `ai-go-service`
- `VITE_GOADMIN_BASE_URL`：go-admin 资源地址，用于头像等相对资源路径解析

## Windows 打包

安装依赖后，可以直接执行：

```bash
npm run dist:win
```

产物默认输出到：

```bash
release/
```

当前已补充 `electron-builder` 基础配置，适合本地生成 Windows 安装包。正式上线前还需要继续补：

- 应用图标（ico）
- 代码签名
- 自动更新配置（如需要）

详细发布说明见：

```bash
docs/release.md
```
