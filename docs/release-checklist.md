# Northstar Desk 发布检查清单

## 一、发布前配置确认

### 后端 `ai-go-service`

- [ ] `APP_ENV=production`
- [ ] `ENABLE_DESKTOP_SEED=false`
- [ ] `HTTP_ADDR` 已确认
- [ ] `DATABASE_URL` 已确认
- [ ] `GOADMIN_BASE_URL` 已确认
- [ ] `AUTH_TOKEN_SECRET` 已确认
- [ ] `AUTH_TOKEN_TTL` 已确认

### 前端 `ai-desktop-app`

- [ ] `VITE_API_BASE_URL` 已确认
- [ ] `VITE_GOADMIN_BASE_URL` 已确认
- [ ] `electron-builder.json` 中 `publish.url` 已替换为真实地址
- [ ] Windows 图标已确认
- [ ] 签名证书已准备（如正式对外发布）

## 二、构建前检查

### 后端

```bash
cd /Users/zhangyibo/Desktop/ai-go-service
go test ./...
go build ./...
```

检查项：

- [ ] `go test ./...` 通过
- [ ] `go build ./...` 通过

### 前端

```bash
cd /Users/zhangyibo/Desktop/ai-desktop-app
npm run typecheck
npm run build
```

检查项：

- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 通过

## 三、Windows 打包

```bash
cd /Users/zhangyibo/Desktop/ai-desktop-app
npm run dist:win
```

检查项：

- [ ] `release/` 目录生成成功
- [ ] 安装包生成成功
- [ ] `latest.yml` 已生成

重点产物：

- `release/Northstar Desk-<version>-x64.exe`
- `release/Northstar Desk-<version>-x64.exe.blockmap`
- `release/latest.yml`

## 四、安装包验收

在一台干净机器上验证：

- [ ] 可安装
- [ ] 可启动
- [ ] 可登录
- [ ] 工作台正常
- [ ] 我的日程显示正常
- [ ] 系统统计正常
- [ ] 使用统计正常
- [ ] 系统监控正常
- [ ] 消息/公告正常
- [ ] 个人中心正常
- [ ] 退出登录正常

## 五、发布上传

如果启用自动更新，上传这些文件到下载服务器：

- [ ] `.exe`
- [ ] `.blockmap`
- [ ] `latest.yml`

并确认：

- [ ] `publish.url` 可从客户端访问
- [ ] 下载地址为 HTTPS

## 六、发布后巡检

- [ ] 后端 `/healthz` 正常
- [ ] 后端 `/readyz` 正常
- [ ] 桌面端首次登录正常
- [ ] 统计页面正常
- [ ] 监控立即采集正常
- [ ] 头像/个人中心正常
- [ ] 没有明显错误日志

## 七、常用发布命令

### 后端

```bash
cd /Users/zhangyibo/Desktop/ai-go-service
go test ./...
go build ./...
```

### 前端

```bash
cd /Users/zhangyibo/Desktop/ai-desktop-app
npm run typecheck
npm run build
npm run dist:win
```
