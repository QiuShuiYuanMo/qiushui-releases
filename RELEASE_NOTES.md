# 秋水桥梁 Android v1.3.2

## 本次更新

- 目标 SDK 升级到 36，完成 Android 15/16 边到边窗口和系统行为适配。
- 兼容模式恢复 UDP/443，修复 Google Play、QUIC 与 Google 下载 CDN 路由。
- VPN 使用 IPv4/IPv6 双栈 TUN，并显式绑定 Wi-Fi 或蜂窝底层网络。
- Wi-Fi 与蜂窝可双向自动切换，连接意外中断后支持 Keystore 加密恢复。
- 手机端重构为“连接 / 节点 / 设置”三页，新增节点搜索和筛选。
- Windows 与 macOS 客户端继续使用 v1.3.1。

## 下载建议

- Windows 10/11：下载 `Setup.1.3.1.exe`。
- 大多数 Android 手机：下载 `qiushui-bridge-1.3.2-arm64-v8a.apk`。
- 不确定 Android 架构：下载 `qiushui-bridge-1.3.2-universal.apk`。
- Apple Silicon Mac：下载 `Setup.1.3.1-arm64.dmg`。
- Intel Mac：下载 `Setup.1.3.1-x64.dmg`。

## 重要提示

- Windows 安装器当前未配置 Authenticode，可能显示“未知发布者”。
- Android `v1.2.6` 使用了不同的 Debug 证书，首次迁移至正式版需先卸载旧版；v1.3.1 可直接覆盖升级到 v1.3.2。
- macOS 包当前未签名、未公证，也未完成 Mac 真机运行验收，仅供测试，Gatekeeper 可能阻止打开。
- 安装前请下载 `SHA256SUMS.txt` 并核对文件完整性。
