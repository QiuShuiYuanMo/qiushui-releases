# 秋水桥梁 v2.0.0 升级说明

## 本次更新

- 修复设置加载完成后 React Hook 数量变化导致的设置面板崩溃。
- 回归扫描覆盖桌面客户端和两个管理后台，阻止 Hook 出现在提前返回之后。
- 节点检测继续通过真实代理 HTTPS 请求验证协议、TLS、DNS 和出口可用性；界面延迟使用 TCP RTT。
- 连接状态卡改为桌面双栏布局，窄窗口自动回落为单栏。
- 节点详情不再显示 `-1 ms`，检测失败统一显示“连通失败”。
- CI 强制校验 Git 标签、桌面版本、lockfile 和 Android 版本一致。
- 管理员令牌与秋水云令牌启用严格 audience 校验。

## 版本矩阵

- Windows / macOS：`2.0.0`
- Android：`versionName=2.0.0`，`versionCode=20000`
- 服务端：`1.5.1`

账号、节点、设置和配置格式没有改变，可直接覆盖升级。

## 升级方式

- Windows：下载并运行 `Setup.2.0.0.exe`。
- Android：优先下载 `qiushui-bridge-2.0.0-universal.apk`。
- macOS：Intel 设备选择 x64，Apple Silicon 设备选择 arm64。

Android 安装包沿用 1.4.8 的更新证书并由 CI 固定校验证书指纹，可直接覆盖升级。Windows 和 macOS 暂无商业代码签名与 Apple 公证，系统可能显示来源确认提示；请只使用官方发布页文件并核对 `SHA256SUMS.txt`。
