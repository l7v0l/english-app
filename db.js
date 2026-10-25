// تخزين الملفات (صور/فيديو/PDF...) داخل المتصفح عبر IndexedDB
window.DB = (() => {
  let p;
  const open = () =>
    p ||
    (p = new Promise((res, rej) => {
      const r = indexedDB.open("mufradati-files", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("f");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }));
  const tx = async (mode, fn) => {
    const db = await open();
    return new Promise((res, rej) => {
      const t = db.transaction("f", mode);
      const req = fn(t.objectStore("f"));
      t.oncomplete = () => res(req && req.result);
      t.onerror = t.onabort = () => rej(t.error);
    });
  };
  return {
    put: (k, blob) => tx("readwrite", (s) => s.put(blob, k)),
    get: (k) => tx("readonly", (s) => s.get(k)),
    del: (k) => tx("readwrite", (s) => s.delete(k)),
  };
})();
