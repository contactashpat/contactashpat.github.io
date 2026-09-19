// Theme switcher for getloupe.org — light / dark / system.
// Pages carry a tiny pre-paint snippet in <head> that applies the stored
// choice before first paint; this script only renders the control and
// handles changes. Stored in localStorage('loupe-theme'); absent = system.
(function () {
  var KEY = 'loupe-theme';
  var ORDER = ['system', 'light', 'dark'];
  var ICONS = {
    system:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    light:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    dark:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  };
  var LABEL = { system: 'Theme: system', light: 'Theme: light', dark: 'Theme: dark' };

  function current() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : 'system';
    } catch (e) {
      return 'system';
    }
  }
  function apply(mode) {
    if (mode === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = mode;
    try {
      if (mode === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (e) {}
  }

  var style = document.createElement('style');
  style.textContent =
    '.theme-toggle{position:fixed;top:14px;right:14px;z-index:50;display:flex;align-items:center;justify-content:center;' +
    'width:34px;height:34px;border-radius:999px;border:1px solid var(--border);background:var(--card);color:var(--muted);' +
    'cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12);transition:color .15s}' +
    '.theme-toggle:hover{color:var(--fg)}';
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  var mode = current();
  function render() {
    btn.innerHTML = ICONS[mode];
    btn.title = LABEL[mode] + ' — click to change';
    btn.setAttribute('aria-label', LABEL[mode]);
  }
  btn.addEventListener('click', function () {
    mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    apply(mode);
    render();
  });
  render();
  document.body.appendChild(btn);
})();
