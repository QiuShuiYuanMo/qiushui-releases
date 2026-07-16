# 秋水桥梁 v1.3.1

## 本次更新

- 修复多种 sing-box 节点组合的解析与兼容提示，不再静默丢失关键字段。
- Android 修复 VPN 节点热切换、断网恢复、双栈 TUN、MTU 和前台服务状态。
- Windows 完成覆盖升级、真实代理链路、服务入口回退和系统代理恢复验证。
- Android APK 改用固定 Release 证书签名，`v1.3.1` 之后可持续覆盖升级。
- 新增 Intel 与 Apple Silicon 的 DMG/ZIP 构建产物。

## 下载建议

- Windows 10/11：下载 `Setup.1.3.1.exe`。
- 大多数 Android 手机：下载 `qiushui-bridge-1.3.1-arm64-v8a.apk`。
- 不确定 Android 架构：下载 `qiushui-bridge-1.3.1-universal.apk`。
- Apple Silicon Mac：下载 `Setup.1.3.1-arm64.dmg`。
- Intel Mac：下载 `Setup.1.3.1-x64.dmg`。

## 重要提示

- Windows 安装器当前未配置 Authenticode，可能显示“未知发布者”。
- Android `v1.2.6` 使用了不同的 Debug 证书，首次迁移至 `v1.3.1` 需先卸载旧版；卸载前请确认账号信息。
- macOS 包当前未签名、未公证，也未完成 Mac 真机运行验收，仅供测试，Gatekeeper 可能阻止打开。
- 安装前请下载 `SHA256SUMS.txt` 并核对文件完整性。
