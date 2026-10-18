/**
 * 秋水桥梁下载页脚本
 *
 * 设计约束（来自 ui-ux-pro-max 检查清单）：
 * - 图标一律内联 SVG，不用 emoji
 * - 所有可点击元素有可见 hover/focus，触控目标 ≥ 44px
 * - 尊重 prefers-reduced-motion（由 CSS 统一处理）
 * - 数据全部通过 textContent 写入，避免把远端内容当 HTML 解析
 */
(function () {
  'use strict';

  var RELEASE_FALLBACK = 'https://github.com/QiuShuiYuanMo/qiushui-releases/releases/latest';

  var ICONS = {
    download: '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 21h16"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
    windows: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
    apple: '<path d="M12 4v16"/><path d="M8.5 7.5h7"/><path d="M9 16.5h6"/><path d="M7.5 4.5 5 2M16.5 4.5 19 2"/>',
    android: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 6h4M11 18h2"/>',
    code: '<path d="m9 8-5 4 5 4"/><path d="m15 8 5 4-5 4"/>',
    shield: '<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/>'
  };

  function svg(paths, size) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.setAttribute('viewBox', '0 0 24 24');
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', 'currentColor');
    el.setAttribute('stroke-width', '2');
    el.setAttribute('stroke-linecap', 'round');
    el.setAttribute('stroke-linejoin', 'round');
    el.setAttribute('aria-hidden', 'true');
    if (size) { el.setAttribute('width', String(size)); el.setAttribute('height', String(size)); }
    el.innerHTML = paths;
    return el;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatBytes(bytes) {
    if (!bytes || bytes < 0) return '';
    var units = ['B', 'KB', 'MB', 'GB'];
    var value = bytes;
    var unit = 0;
    while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit += 1; }
    return (unit === 0 ? value : value.toFixed(1)) + ' ' + units[unit];
  }

  /** 粗粒度平台识别：只用于「推荐下载」高亮，不参与任何安全判断。 */
  function detectPlatform() {
    var ua = (navigator.userAgent || '').toLowerCase();
    if (ua.indexOf('android') !== -1) return 'android';
    if (ua.indexOf('windows') !== -1) return 'windows';
    if (ua.indexOf('mac os') !== -1 || ua.indexOf('macintosh') !== -1) return 'macos';
    return null;
  }

  function detectMacArch() {
    var ua = navigator.userAgent || '';
    // Safari 会在 Apple Silicon 上报告 Intel，因此无法可靠区分；默认给 arm64（新机主流）。
    return /arm64|aarch64/i.test(ua) ? 'arm64' : 'arm64';
  }

  function byKind(data, platform, kind) {
    return (data.assets || []).filter(function (a) {
      return a.platform === platform && a.kind === kind;
    });
  }

  function assetByName(data, name) {
    return (data.assets || []).filter(function (a) { return a.name === name; })[0];
  }

  var PLATFORM_META = {
    windows: { title: 'Windows', sub: 'Windows 10 / 11 · x64', icon: 'windows' },
    macos: { title: 'macOS', sub: 'Intel 与 Apple Silicon', icon: 'apple' },
    android: { title: 'Android', sub: 'Android 7.0 及以上', icon: 'android' }
  };

  var SIGN_BADGE = {
    'self-signed': { text: '自签名', cls: 'badge badge-warn' },
    unsigned: { text: '未签名', cls: 'badge badge-warn' },
    release: { text: '生产证书', cls: 'badge badge-signed' }
  };

  function downloadRow(asset) {
    var row = el('div', 'download-row');
    var text = el('div', 'download-text');
    text.appendChild(el('span', 'download-label', asset.label || asset.name));
    var noteText = asset.note || '';
    if (noteText) text.appendChild(el('span', 'download-note', noteText));
    row.appendChild(text);

    if (asset.signed && SIGN_BADGE[asset.signed]) {
      var badge = el('span', SIGN_BADGE[asset.signed].cls, SIGN_BADGE[asset.signed].text);
      row.appendChild(badge);
    }

    row.appendChild(el('span', 'download-size', formatBytes(asset.size)));

    var link = document.createElement('a');
    link.className = 'download-link';
    link.href = asset.url;
    link.setAttribute('download', '');
    link.setAttribute('aria-label', '下载 ' + (asset.label || asset.name));
    link.appendChild(svg(ICONS.download));
    row.appendChild(link);
    return row;
  }

  function renderPlatforms(data) {
    var grid = document.getElementById('platform-grid');
    if (!grid) return;
    grid.textContent = '';
    var detected = detectPlatform();

    Object.keys(PLATFORM_META).forEach(function (platform) {
      var meta = PLATFORM_META[platform];
      var card = el('section', 'platform-card');
      card.setAttribute('aria-labelledby', 'platform-' + platform);
      if (platform === detected) card.classList.add('is-recommended');

      var head = el('div', 'platform-head');
      var icon = el('span', 'platform-icon');
      icon.appendChild(svg(ICONS[meta.icon]));
      head.appendChild(icon);

      var heading = el('div');
      var h3 = el('h3', 'platform-title', meta.title);
      h3.id = 'platform-' + platform;
      heading.appendChild(h3);
      heading.appendChild(el('p', 'platform-sub', meta.sub));
      head.appendChild(heading);

      if (platform === detected) head.appendChild(el('span', 'recommended-badge', '推荐'));
      card.appendChild(head);

      var list = el('div', 'download-list');
      var rows = [];
      if (platform === 'windows') {
        rows = byKind(data, 'windows', 'installer').concat(byKind(data, 'other', 'cert'));
      } else if (platform === 'macos') {
        var arch = detectMacArch();
        rows = byKind(data, 'macos', 'dmg').filter(function (a) { return a.arch === arch; })
          .concat(byKind(data, 'macos', 'zip').filter(function (a) { return a.arch === arch; }))
          .concat(byKind(data, 'macos', 'dmg').filter(function (a) { return a.arch !== arch; }))
          .concat(byKind(data, 'macos', 'zip').filter(function (a) { return a.arch !== arch; }));
      } else {
        rows = byKind(data, 'android', 'apk').concat(byKind(data, 'android', 'aab'));
      }

      rows.forEach(function (asset) { list.appendChild(downloadRow(asset)); });
      card.appendChild(list);
      grid.appendChild(card);
    });

    // 主按钮：直接指向当前平台最合适的产物。
    var primary = document.getElementById('primary-download');
    var label = document.getElementById('primary-download-label');
    if (!primary || !label) return;

    var target = null;
    if (detected === 'windows') target = byKind(data, 'windows', 'installer')[0];
    else if (detected === 'macos') {
      var arch = detectMacArch();
      target = byKind(data, 'macos', 'dmg').filter(function (a) { return a.arch === arch; })[0]
        || byKind(data, 'macos', 'dmg')[0];
    } else if (detected === 'android') target = byKind(data, 'android', 'apk')[0];

    if (target) {
      primary.href = target.url;
      primary.setAttribute('download', '');
      label.textContent = '下载 ' + (PLATFORM_META[detected] ? PLATFORM_META[detected].title : '') + ' 版 · ' + formatBytes(target.size);
    } else {
      primary.href = '#downloads';
      label.textContent = '选择你的平台';
    }
  }

  function renderChecksums(data) {
    var body = document.getElementById('checksum-body');
    if (!body) return;
    body.textContent = '';

    (data.assets || []).forEach(function (asset) {
      var tr = document.createElement('tr');

      var nameCell = document.createElement('td');
      nameCell.appendChild(el('span', 'download-label', asset.label || asset.name));
      tr.appendChild(nameCell);

      var sizeCell = document.createElement('td');
      sizeCell.className = 'download-size';
      sizeCell.textContent = formatBytes(asset.size);
      tr.appendChild(sizeCell);

      var hashCell = document.createElement('td');
      hashCell.className = 'hash-cell';
      hashCell.textContent = asset.sha256 || '—';
      tr.appendChild(hashCell);

      var actionCell = document.createElement('td');
      var button = el('button', 'copy-button');
      button.type = 'button';
      button.setAttribute('aria-label', '复制 ' + (asset.label || asset.name) + ' 的 SHA256');
      button.appendChild(svg(ICONS.copy));
      button.appendChild(el('span', null, '复制'));
      if (asset.sha256) {
        button.addEventListener('click', function () { copyHash(button, asset.sha256); });
      } else {
        button.disabled = true;
      }
      actionCell.appendChild(button);
      tr.appendChild(actionCell);

      body.appendChild(tr);
    });
  }

  function copyHash(button, text) {
    var done = function () {
      button.dataset.copied = 'true';
      var label = button.querySelector('span');
      if (label) label.textContent = '已复制';
      announce('已复制 SHA256');
      window.setTimeout(function () {
        button.dataset.copied = 'false';
        if (label) label.textContent = '复制';
      }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* 复制失败时静默，用户仍可手动选择 */ }
    document.body.removeChild(area);
  }

  var announceNode = null;
  function announce(message) {
    if (!announceNode) {
      announceNode = el('div', 'sr-only');
      announceNode.setAttribute('role', 'status');
      announceNode.setAttribute('aria-live', 'polite');
      document.body.appendChild(announceNode);
    }
    announceNode.textContent = message;
  }

  function renderSources(data) {
    var grid = document.getElementById('source-grid');
    if (!grid) return;
    grid.textContent = '';

    var sources = (data.assets || []).filter(function (a) { return a.kind === 'source'; });
    sources.forEach(function (asset) {
      var card = document.createElement('a');
      card.className = 'source-card';
      card.href = asset.url;
      card.setAttribute('download', '');
      card.appendChild(el('h3', null, asset.label || asset.name));
      card.appendChild(el('p', null, asset.note || ''));

      var meta = el('div', 'source-meta');
      meta.appendChild(el('span', null, formatBytes(asset.size)));
      var action = el('span');
      action.appendChild(svg(ICONS.code, 16));
      meta.appendChild(action);
      card.appendChild(meta);
      grid.appendChild(card);
    });
  }

  function applyMeta(data) {
    var version = 'v' + data.version;
    var pill = document.getElementById('version-pill');
    var metaVersion = document.getElementById('meta-version');
    var metaDate = document.getElementById('meta-date');
    if (pill) pill.textContent = version;
    if (metaVersion) metaVersion.textContent = version;
    if (metaDate && data.releasedAt) metaDate.textContent = data.releasedAt;

    var releaseLink = document.getElementById('release-link');
    if (releaseLink && data.releaseUrl) releaseLink.href = data.releaseUrl;

    var sums = (data.assets || []).filter(function (a) { return a.kind === 'checksums'; })[0];
    var sumsLink = document.getElementById('sums-link');
    if (sumsLink) sumsLink.href = sums ? sums.url : (data.releaseUrl || RELEASE_FALLBACK);
  }

  function setupTheme() {
    var root = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    var moon = toggle.querySelector('.icon-moon');
    var sun = toggle.querySelector('.icon-sun');

    function sync() {
      var light = root.dataset.theme === 'light';
      toggle.setAttribute('aria-pressed', light ? 'true' : 'false');
      if (moon) moon.hidden = light;
      if (sun) sun.hidden = !light;
    }

    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('qsb-theme', next); } catch (e) { /* 忽略 */ }
      sync();
      announce(next === 'light' ? '已切换到浅色主题' : '已切换到深色主题');
    });

    sync();
  }

  function showError(message) {
    var grid = document.getElementById('platform-grid');
    if (grid) {
      grid.textContent = '';
      var notice = el('p', 'notice');
      notice.appendChild(svg(ICONS.shield));
      notice.appendChild(el('span', null, message));
      grid.appendChild(notice);
    }
  }

  function load() {
    fetch('releases.json', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (data) {
        applyMeta(data);
        renderPlatforms(data);
        renderChecksums(data);
        renderSources(data);
      })
      .catch(function () {
        showError('下载列表加载失败，请直接前往 GitHub Release 获取最新版本。');
        var body = document.getElementById('checksum-body');
        if (body) {
          body.textContent = '';
          var tr = document.createElement('tr');
          var td = document.createElement('td');
          td.colSpan = 4;
          td.className = 'loading-placeholder';
          td.textContent = '校验值加载失败，请以下载的 SHA256SUMS.txt 为准。';
          tr.appendChild(td);
          body.appendChild(tr);
        }
      });
  }

  setupTheme();
  load();
})();
