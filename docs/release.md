# Northstar Desk 发布说明

## 1. 生产环境变量

桌面端构建前至少确认：

```bash
VITE_API_BASE_URL=https://your-api.example.com
VITE_GOADMIN_BASE_URL=https://your-goadmin.example.com
```

## 2. Windows 打包

本地打包：

```bash
npm run dist:win
```

输出目录：

```bash
release/
```

## 3. 代码签名

正式上线前建议配置 Windows 代码签名。常见做法是通过环境变量注入证书：

```bash
CSC_LINK=<certificate-file-or-url>
CSC_KEY_PASSWORD=<certificate-password>
```

如果当前阶段只是内部测试包，可以先不签名。

## 4. 自动更新

当前 `electron-builder.json` 已预留 `generic` 发布配置：

```json
"publish": [
  {
    "provider": "generic",
    "url": "https://your-download-host.example.com/northstar-desk/"
  }
]
```

上线前需要把它替换成真实下载地址，并确保安装包、`latest.yml` 等更新文件可被客户端访问。

## 5. 发布前检查

- 确认生产 API 地址正确
- 确认 go-admin 静态资源地址正确
- 确认关闭开发环境 seed/mock 数据
- 确认应用图标、版本号、作者、描述正确
- 确认安装包可安装、可启动、可登录
