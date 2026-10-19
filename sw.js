// TRi9i service worker: instant repeat loads + works offline for the app shell.
// Bump VERSION when you change this file's caching rules.
const VERSION = 'tri9i-v3';
const SHELL = ['./', 'index.html', 'tailwind.css', 'manifest.json', 'icon-192.png', 'icon-512.png'];
const CDN_HOSTS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// HTML / CSS / JS of the site: network first (so updates show immediately),
// but fall back to cache after 3.5s or when offline.
async function networkFirst(req) {
  const net = fetch(req)
    .then((r) => {
      if (r && r.ok) {
        const copy = r.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
      }
      return r;
    })
    .catch(() => null);
  const first = await Promise.race([net, new Promise((res) => setTimeout(() => res('timeout'), 3500))]);
  if (first && first !== 'timeout') return first;
  const hit = await caches.match(req, { ignoreSearch: req.mode === 'navigate' });
  if (hit) return hit;
  if (req.mode === 'navigate') {
    const shell = await caches.match('index.html');
    if (shell) return shell;
  }
  return (await net) || Response.error();
}

// Static assets (icons, fonts, supabase lib): cache first, refresh in background.
async function staleWhileRevalidate(req) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req);
  const net = fetch(req)
    .then((r) => {
      if (r && (r.ok || r.type === 'opaque')) cache.put(req, r.clone());
      return r;
    })
    .catch(() => null);
  return hit || (await net) || Response.error();
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    const isCode = req.mode === 'navigate' || /\.(html|css|js|json)$/.test(url.pathname) || url.pathname.endsWith('/');
    e.respondWith(isCode ? networkFirst(req) : staleWhileRevalidate(req));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(staleWhileRevalidate(req));
  }
  // Everything else (Supabase API, storage, wa.me...) is never touched.
});
