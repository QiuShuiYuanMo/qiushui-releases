# 秋水桥梁 v1.4.6

## 本次更新

- Windows、macOS 与 Android 客户端同步升级至 v1.4.6。
- 新增 sing-box 1.13.11、Xray 26.3.27、Hysteria2 2.10.0 多内核选择与健康状态展示。
- 自动切换节点默认关闭，只有本机用户主动开启后才会生效；默认故障恢复不会更换节点。
- 优化弱网恢复、内核进程清理、远程配置同步与更新校验稳定性。
- 管理后台升级至 v1.5.0，新增内核发布、四平台发布集与设备内核状态能力。

## 下载建议

- Windows 10/11：下载 `Setup.1.4.6.exe`。
- Android 手机：下载 `qiushui-bridge-1.4.6-universal.apk`。
- Apple Silicon Mac：下载 `Setup.1.4.6-arm64.dmg`。
- Intel Mac：下载 `Setup.1.4.6-x64.dmg`。

## 重要提示

- Windows 安装器当前未配置 Authenticode，可能显示“未知发布者”。
- Android APK 支持 v2/v3 签名，并沿用线上 v1.4.5 的同一证书，可直接覆盖升级。
- macOS 包当前未签名、未公证，Gatekeeper 可能阻止首次打开，需在系统安全设置中确认。
- 安装前请下载 `SHA256SUMS-1.4.6.txt` 并核对文件完整性。
