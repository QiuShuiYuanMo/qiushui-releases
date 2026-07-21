# 秋水桥梁 v1.4.5

## 本次更新

- Windows、macOS 与 Android 客户端同步升级至 v1.4.5。
- 正常的远端连接关闭不再被误判为节点不稳定或触发无意义重连。
- 仅在真实代理数据面连续探测失败时才自动恢复连接。
- 超级管理员自动拥有全部启用节点，后台支持向指定用户授予全部节点权限。
- 管理后台完善全节点权限展示和授权操作。

## 下载建议

- Windows 10/11：下载 `Setup.1.4.5.exe`。
- Android 手机：下载 `qiushui-bridge-1.4.5-universal.apk`。
- Apple Silicon Mac：下载 `Setup.1.4.5-arm64.dmg`。
- Intel Mac：下载 `Setup.1.4.5-x64.dmg`。

## 重要提示

- Windows 安装器当前未配置 Authenticode，可能显示“未知发布者”。
- Android APK 为 v2 签名包；如设备已安装不同证书签名的旧包，Android 会要求先卸载旧包才能安装。
- macOS 包当前未签名、未公证，也未完成 Mac 真机运行验收，仅供测试，Gatekeeper 可能阻止打开。
- 安装前请下载 `SHA256SUMS.txt` 并核对文件完整性。
