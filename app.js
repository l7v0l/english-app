(() => {
  const KEY = "mufradati-v1";
  const TKEY = "mufradati-theme";
  const $ = (s, r = document) => r.querySelector(s);
  const app = $("#app");

  // ---------- icons ----------
  const ICONS = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    words: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    core: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    stories: '<path d="M2 5c3-1 7-1 10 1v14c-3-2-7-2-10-1V5z"/><path d="M22 5c-3-1-7-1-10 1v14c3-2 7-2 10-1V5z"/>',
    library: '<path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"/>',
    practice: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
    auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 000 18z" fill="currentColor"/>',
    speaker: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    back: '<path d="M9 5l7 7-7 7"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 9"/>',
    video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    audio: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/>',
    pdf: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 15h6M9 18h4"/>',
    link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
    note: '<path d="M5 3h14v18H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    play: '<path d="M7 4l13 8-13 8V4z" fill="currentColor"/>',
    fire: '<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
    open: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  };
  const ic = (n, c = "") =>
    `<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;

  // ---------- 1000 words ----------
  const CORE = (() => {
    const seen = new Set();
    const out = [];
    for (const l of (window.WORDS_RAW || "").split("\n")) {
      const i = l.indexOf("|");
      if (i < 1) continue;
      const en = l.slice(0, i).trim();
      const ar = l.slice(i + 1).trim();
      const k = en.toLowerCase();
      if (!en || !ar || seen.has(k)) continue;
      seen.add(k);
      out.push({ en, ar });
    }
    return out.slice(0, 1000);
  })();
  const PACK = 100;
  const PACKS = Math.ceil(CORE.length / PACK);
  const coreMap = new Map(CORE.map((w) => [w.en.toLowerCase(), w]));

  // ---------- state ----------
  const blank = () => ({
    words: [], myStories: [], read: {}, lastStory: null,
    streak: { last: "", count: 0 }, known: {}, today: { d: "", n: 0 }, goal: 5, lib: [],
  });
  let S = blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(blank(), JSON.parse(raw));
  } catch (e) {}
  let saveErr = false;
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {
      if (!saveErr) { saveErr = true; toast("تعذّر الحفظ: مساحة المتصفح ممتلئة"); }
    }
  };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const day = (d = new Date()) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const allStories = () => [...STORIES, ...S.myStories];
  const findWord = (en) => S.words.find((w) => w.en.toLowerCase() === en.toLowerCase());
  const isKnown = (en) => !!S.known[en.toLowerCase()];
  const fmtSize = (b) => (b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (t.hidden = true), 2000);
  }

  function touchStreak() {
    const today = day();
    if (S.streak.last === today) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    S.streak.count = S.streak.last === day(y) ? S.streak.count + 1 : 1;
    S.streak.last = today;
  }
  const streakNow = () => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return S.streak.last === day() || S.streak.last === day(y) ? S.streak.count : 0;
  };
  function bump() {
    const t = day();
    if (S.today.d !== t) S.today = { d: t, n: 0 };
    S.today.n++;
    touchStreak();
  }
  const todayN = () => (S.today.d === day() ? S.today.n : 0);

  function speak(text) {
    if (!("speechSynthesis" in window)) return toast("جهازك ما يدعم النطق");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function addWord(en, ar, ex) {
    en = (en || "").trim();
    ar = (ar || "").trim();
    if (!en || !ar) { toast("اكتب الكلمة ومعناها"); return false; }
    const old = findWord(en);
    if (old) {
      old.ar = ar;
      if (ex && ex.trim()) old.ex = ex.trim();
      toast("تم تحديث الكلمة");
    } else {
      S.words.unshift({ id: uid(), en, ar, ex: (ex || "").trim(), learned: false, added: Date.now() });
      bump();
      toast("انحفظت الكلمة ✓");
    }
    save();
    return true;
  }

  // ---------- theme ----------
  const themePref = () => { try { return localStorage.getItem(TKEY) || "auto"; } catch (e) { return "auto"; } };
  const mq = matchMedia("(prefers-color-scheme: dark)");
  function applyTheme() {
    const p = themePref();
    const dark = p === "dark" || (p === "auto" && mq.matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    $('meta[name="theme-color"]').content = dark ? "#0a0f1a" : "#f6f7fb";
    $("#themeBtn").innerHTML = ic(p === "auto" ? "auto" : p === "dark" ? "moon" : "sun");
    $("#themeBtn").title = { auto: "تلقائي", light: "فاتح", dark: "داكن" }[p];
  }
  function setTheme(p) {
    try { localStorage.setItem(TKEY, p); } catch (e) {}
    applyTheme();
  }
  mq.addEventListener("change", applyTheme);
  $("#themeBtn").onclick = () => {
    const next = { auto: "light", light: "dark", dark: "auto" }[themePref()];
    setTheme(next);
    toast({ auto: "المظهر: تلقائي", light: "المظهر: فاتح", dark: "المظهر: داكن" }[next]);
    if (view === "home") render();
  };

  // ---------- nav + router ----------
  const TABS = [
    ["home", "الرئيسية"], ["words", "كلماتي"], ["core", "١٠٠٠ كلمة"],
    ["stories", "القصص"], ["library", "المكتبة"], ["practice", "تمرّن"],
  ];
  $("#nav").innerHTML = TABS.map(([k, t]) => `<button data-act="go" data-h="${k}">${ic(k)}<span>${t}</span></button>`).join("");

  let view = "home";
  let arg = "";
  const go = (h) => { if (location.hash === "#" + h) route(); else location.hash = h; };
  function route() {
    closeSheet();
    const [v, a] = (location.hash.slice(1) || "home").split("/");
    view = RENDER[v] ? v : "home";
    arg = a ? decodeURIComponent(a) : "";
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    const tab = view === "read" ? "stories" : view;
    document.querySelectorAll("#nav button").forEach((b) => b.classList.toggle("on", b.dataset.h === tab));
    $("#streakPill").innerHTML = `${ic("fire", "sm")}<span class="en">${streakNow()}</span>`;
    RENDER[view]();
  }
  window.addEventListener("hashchange", route);

  // ---------- sheet ----------
  const sh = $("#sheet");
  function openSheet(html) {
    sh.innerHTML = `<div class="panel">${html}</div>`;
    sh.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeSheet() {
    if (sh.hidden) return;
    sh.hidden = true;
    sh.innerHTML = "";
    document.body.style.overflow = "";
    Object.keys(viewerUrls).forEach((k) => { if (!keepUrls.has(k)) { URL.revokeObjectURL(viewerUrls[k]); delete viewerUrls[k]; } });
  }
  sh.addEventListener("click", (e) => { if (e.target === sh) closeSheet(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeSheet());

  // =====================================================
  // HOME
  // =====================================================
  function wordOfDay() {
    const n = Math.floor(Date.now() / 86400000);
    return CORE[n % CORE.length];
  }
  function renderHome() {
    const learned = S.words.filter((w) => w.learned).length;
    const knownCore = CORE.filter((w) => isKnown(w.en)).length;
    const last = S.lastStory && allStories().find((s) => s.id === S.lastStory);
    const wd = wordOfDay();
    const goalPct = Math.min(100, Math.round((todayN() / S.goal) * 100));
    const p = themePref();
    app.innerHTML = `
      <div class="hero">
        <h1>أهلاً 👋</h1>
        <p class="sub">${todayN() >= S.goal ? "وصلت هدف اليوم، ممتاز! 🎉" : "كل يوم كلمات جديدة وتصير أقوى."}</p>
        <div class="row between"><small>هدف اليوم</small><small class="en">${todayN()} / ${S.goal}</small></div>
        <div class="bar" style="margin-top:6px"><i style="width:${goalPct}%"></i></div>
      </div>

      <div class="stats">
        <div class="stat fire"><b>${streakNow()}</b><small>أيام متتالية</small></div>
        <div class="stat"><b>${S.words.length}</b><small>كلماتي</small></div>
        <div class="stat"><b>${knownCore}</b><small>حفظتها من ${CORE.length}</small></div>
      </div>

      <div class="card">
        <div class="row between"><span class="tag amber">كلمة اليوم</span>
          <button class="icon-btn soft sm" data-act="say" data-v="${esc(wd.en)}" aria-label="نطق">${ic("speaker", "sm")}</button></div>
        <div class="row" style="margin-top:8px">
          <div class="grow"><div class="en" style="font-size:1.6rem;font-weight:800">${esc(wd.en)}</div>
          <div style="color:var(--primary);font-weight:700">${esc(wd.ar)}</div></div>
        </div>
        <div class="row wrap" style="margin-top:12px">
          <button class="btn sm soft" data-act="addcore" data-en="${esc(wd.en)}">${ic("plus", "sm")} أضفها لكلماتي</button>
          <button class="btn sm ${isKnown(wd.en) ? "" : "warn"}" data-act="knowcore" data-en="${esc(wd.en)}" data-r="home">${ic("check", "sm")} ${isKnown(wd.en) ? "حفظتها" : "حفظتها؟"}</button>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:10px">إضافة كلمة جديدة</h3>
        <input id="hEn" class="en" placeholder="English word" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false">
        <input id="hAr" placeholder="المعنى بالعربي" autocomplete="off">
        <input id="hEx" class="en" placeholder="Example sentence (optional)" autocomplete="off">
        <button class="btn block" data-act="homeadd">${ic("plus", "sm")} حفظ الكلمة</button>
      </div>

      <div class="grid">
        <button class="card pack" data-act="go" data-h="practice" style="margin:0"><b>${ic("practice", "lg")}</b>ابدأ التمرين<br><small>بطاقات واختبار</small></button>
        ${last
          ? `<button class="card pack" data-act="go" data-h="read/${esc(last.id)}" style="margin:0"><b>${ic("stories", "lg")}</b>كمّل القراءة<br><small class="en">${esc(last.title)}</small></button>`
          : `<button class="card pack" data-act="go" data-h="stories" style="margin:0"><b>${ic("stories", "lg")}</b>اقرأ قصة<br><small>اضغط على أي كلمة</small></button>`}
      </div>

      <h2>الإعدادات</h2>
      <div class="card">
        <label class="lbl">المظهر</label>
        <div class="seg">
          ${[["auto", "تلقائي"], ["light", "فاتح"], ["dark", "داكن"]].map(([k, t]) => `<button class="${p === k ? "on" : ""}" data-act="theme" data-v="${k}">${t}</button>`).join("")}
        </div>
        <label class="lbl">هدف اليوم (كلمات)</label>
        <select data-input="goal">${[3, 5, 10, 15, 20, 30].map((n) => `<option value="${n}" ${n === S.goal ? "selected" : ""}>${n}</option>`).join("")}</select>
        <hr>
        <label class="lbl">نسخة احتياطية (كلماتك وتقدّمك. الملفات والصور ما تدخل فيها)</label>
        <div class="row wrap">
          <button class="btn sm soft" data-act="exp">${ic("download", "sm")} تصدير</button>
          <button class="btn sm soft" data-act="imp">${ic("upload", "sm")} استيراد</button>
          <input type="file" id="impFile" accept="application/json,.json" hidden>
        </div>
      </div>`;
    $("#hEx").onkeydown = (e) => e.key === "Enter" && acts.homeadd();
    $("#impFile").onchange = importData;
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mufradati-" + day() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  }
  function importData(e) {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!Array.isArray(d.words)) throw 0;
        // keep library entries whose files exist only on this device
        const lib = S.lib;
        S = Object.assign(blank(), d, { lib });
        save();
        toast("تم الاستيراد ✓");
        render();
      } catch (_) { toast("الملف غير صالح"); }
    };
    r.readAsText(f);
  }

  // =====================================================
  // MY WORDS
  // =====================================================
  let wf = { q: "", f: "all" };
  function wordRow(w) {
    return `<div class="card word ${w.learned ? "known" : ""}">
      <div class="row">
        <div class="grow"><div class="w-en en">${esc(w.en)}</div><div class="w-ar">${esc(w.ar)}</div>
        ${w.ex ? `<div class="w-ex en">${esc(w.ex)}</div>` : ""}</div>
        <button class="icon-btn soft" data-act="say" data-v="${esc(w.en)}" aria-label="نطق">${ic("speaker", "sm")}</button>
      </div>
      <div class="acts">
        <button class="btn sm ${w.learned ? "soft" : ""}" data-act="tgl" data-id="${w.id}">${ic("check", "sm")} ${w.learned ? "حافظها" : "حفظتها"}</button>
        <button class="btn sm danger" data-act="del" data-id="${w.id}">${ic("trash", "sm")} حذف</button>
      </div></div>`;
  }
  function listWords() {
    const q = wf.q.trim().toLowerCase();
    const list = S.words.filter((w) => {
      if (wf.f === "new" && w.learned) return false;
      if (wf.f === "done" && !w.learned) return false;
      return !q || w.en.toLowerCase().includes(q) || w.ar.includes(q);
    });
    $("#list").innerHTML = list.length ? list.map(wordRow).join("")
      : `<div class="empty"><span class="big">📝</span>${S.words.length ? "ما فيه نتائج." : "ما أضفت كلمات للحين.<br>أضف من الرئيسية، أو من القصص، أو من الـ١٠٠٠ كلمة."}</div>`;
  }
  function renderWords() {
    const done = S.words.filter((w) => w.learned).length;
    app.innerHTML = `
      <div class="row between"><h1>كلماتي</h1>
        <button class="btn sm" data-act="go" data-h="practice">${ic("practice", "sm")} تمرّن</button></div>
      <p class="sub">${S.words.length} كلمة · ${done} حفظتها</p>
      <input data-input="wq" placeholder="ابحث بالإنجليزي أو العربي" value="${esc(wf.q)}">
      <div class="chips">${[["all", "الكل"], ["new", "أتعلّمها"], ["done", "حفظتها"]].map(([k, t]) => `<button class="chip ${wf.f === k ? "on" : ""}" data-act="wf" data-v="${k}">${t}</button>`).join("")}</div>
      <div id="list"></div>`;
    listWords();
  }

  // =====================================================
  // 1000 WORDS
  // =====================================================
  let cf = { q: "", f: "all" };
  const packRange = (p) => CORE.slice(p * PACK, p * PACK + PACK);
  function coreRow(w) {
    const k = isKnown(w.en);
    const mine = !!findWord(w.en);
    return `<div class="card word ${k ? "known" : ""}">
      <div class="row">
        <div class="grow"><div class="w-en en">${esc(w.en)}</div><div class="w-ar">${esc(w.ar)}</div></div>
        <button class="icon-btn soft" data-act="say" data-v="${esc(w.en)}" aria-label="نطق">${ic("speaker", "sm")}</button>
      </div>
      <div class="acts">
        <button class="btn sm ${k ? "soft" : ""}" data-act="knowcore" data-en="${esc(w.en)}">${ic("check", "sm")} ${k ? "حافظها" : "حفظتها"}</button>
        <button class="btn sm soft" data-act="addcore" data-en="${esc(w.en)}" ${mine ? "disabled" : ""}>${ic("plus", "sm")} ${mine ? "في كلماتي" : "أضفها لكلماتي"}</button>
      </div></div>`;
  }
  function listCore() {
    const q = cf.q.trim().toLowerCase();
    let base = arg !== "" ? packRange(+arg) : CORE;
    let list = base.filter((w) => {
      const k = isKnown(w.en);
      if (cf.f === "new" && k) return false;
      if (cf.f === "done" && !k) return false;
      return !q || w.en.toLowerCase().includes(q) || w.ar.includes(q);
    });
    if (arg === "" && !q) list = [];
    $("#clist").innerHTML = list.length ? list.slice(0, 200).map(coreRow).join("")
      : arg === "" && !q ? "" : `<div class="empty"><span class="big">🔍</span>ما فيه نتائج.</div>`;
  }
  function renderCore() {
    const total = CORE.filter((w) => isKnown(w.en)).length;
    if (arg === "") {
      app.innerHTML = `
        <h1>١٠٠٠ كلمة أساسية</h1>
        <p class="sub">أكثر الكلمات اللي تحتاجها، مقسّمة ${PACKS} حزم. كل حزمة ${PACK} كلمة.</p>
        <div class="card"><div class="row between"><b>تقدّمك</b><span class="en">${total} / ${CORE.length}</span></div>
          <div class="bar" style="margin-top:8px"><i style="width:${Math.round((total / CORE.length) * 100)}%"></i></div></div>
        <input data-input="cq" placeholder="ابحث في الـ١٠٠٠ كلمة" value="${esc(cf.q)}">
        <div id="clist"></div>
        <div id="packs" class="grid g3" style="${cf.q ? "display:none" : ""}">
          ${Array.from({ length: PACKS }, (_, p) => {
            const items = packRange(p);
            const k = items.filter((w) => isKnown(w.en)).length;
            return `<button class="card pack" style="margin:0" data-act="go" data-h="core/${p}"><b class="en">${p + 1}</b>الحزمة ${p + 1}<br><small class="en">${p * PACK + 1}–${p * PACK + items.length}</small>
              <div class="bar"><i style="width:${Math.round((k / items.length) * 100)}%"></i></div><small class="en">${k}/${items.length}</small></button>`;
          }).join("")}
        </div>`;
      listCore();
    } else {
      const p = Math.min(+arg || 0, PACKS - 1);
      const items = packRange(p);
      const k = items.filter((w) => isKnown(w.en)).length;
      app.innerHTML = `
        <button class="back" data-act="go" data-h="core">${ic("back", "sm")} الحزم</button>
        <div class="row between"><h1>الحزمة ${p + 1}</h1>
          <button class="btn sm" data-act="practicepack" data-p="${p}">${ic("practice", "sm")} تمرّن</button></div>
        <div class="card"><div class="row between"><b>حفظت</b><span class="en">${k} / ${items.length}</span></div>
          <div class="bar" style="margin-top:8px"><i style="width:${Math.round((k / items.length) * 100)}%"></i></div></div>
        <div class="chips">${[["all", "الكل"], ["new", "ما حفظتها"], ["done", "حفظتها"]].map(([id, t]) => `<button class="chip ${cf.f === id ? "on" : ""}" data-act="cf" data-v="${id}">${t}</button>`).join("")}</div>
        <div id="clist"></div>`;
      listCore();
    }
  }

  // =====================================================
  // STORIES
  // =====================================================
  function renderStories() {
    app.innerHTML = `
      <h1>القصص</h1>
      <p class="sub">اضغط على أي كلمة داخل القصة يطلع معناها وتحفظها.</p>
      ${allStories().map((s) => `
        <div class="card story" data-act="go" data-h="read/${esc(s.id)}">
          <div class="row"><span class="tag">${esc(s.level)}</span>${S.read[s.id] ? `<span class="tag good">قرأتها ✓</span>` : ""}</div>
          <h3 class="en">${esc(s.title)}</h3>
          <div class="sub en" style="margin:2px 0 0">${esc(s.text.slice(0, 90))}…</div>
          ${s.id.startsWith("u") ? `<div class="acts" style="margin-top:8px"><button class="btn sm danger" data-act="delstory" data-id="${s.id}">${ic("trash", "sm")} حذف</button></div>` : ""}
        </div>`).join("")}
      <details class="card">
        <summary>أضف نص تبغى تقراه</summary>
        <div style="margin-top:12px">
          <input id="sT" class="en" placeholder="Title">
          <textarea id="sX" class="en" placeholder="Paste English text here"></textarea>
          <button class="btn block" data-act="addstory">حفظ</button>
        </div>
      </details>`;
  }

  // wrap English words of a text into tappable spans
  function tappable(text) {
    return text.split(/\n\s*\n/).map((p) =>
      "<p>" + p.split(/([A-Za-z]+(?:'[A-Za-z]+)?)/).map((t, i) => (i % 2 ? `<span class="w" data-act="tapword" data-w="${esc(t)}">${esc(t)}</span>` : esc(t))).join("") + "</p>"
    ).join("");
  }
  function markSaved(root) {
    (root || document).querySelectorAll(".reader .w").forEach((el) => el.classList.toggle("saved", !!findWord(el.dataset.w)));
  }
  function renderRead() {
    const s = allStories().find((x) => x.id === arg);
    if (!s) return go("stories");
    S.lastStory = s.id;
    save();
    app.innerHTML = `
      <button class="back" data-act="go" data-h="stories">${ic("back", "sm")} القصص</button>
      <div class="row"><span class="tag">${esc(s.level)}</span></div>
      <h1 class="en">${esc(s.title)}</h1>
      <div class="card"><div class="reader">${tappable(s.text)}</div></div>
      <button class="btn block" data-act="finish" data-id="${s.id}">${ic("check", "sm")} ${S.read[s.id] ? "قرأتها" : "خلصت القراءة"}</button>`;
    markSaved();
  }

  // ---------- word sheet (tap a word) ----------
  const defCache = {};
  async function fetchDef(word) {
    const k = word.toLowerCase();
    if (k in defCache) return defCache[k];
    try {
      const r = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(k));
      if (!r.ok) throw 0;
      const m = (await r.json())[0].meanings[0];
      defCache[k] = (m.partOfSpeech ? m.partOfSpeech + ": " : "") + m.definitions[0].definition;
    } catch (_) { defCache[k] = ""; }
    return defCache[k];
  }
  function suggest(word) {
    const w = word.toLowerCase();
    const c = [w, w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ed$/, ""), w.replace(/d$/, ""),
      w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/ly$/, ""), w.replace(/er$/, ""), w.replace(/ied$/, "y")];
    for (const x of c) if (coreMap.has(x)) return coreMap.get(x).ar;
    return "";
  }
  function sentenceOf(el) {
    if (!el) return "";
    let before = "", after = "", hit = false;
    el.parentElement.childNodes.forEach((n) => {
      if (n === el) hit = true; else if (hit) after += n.textContent; else before += n.textContent;
    });
    return (before.split(/(?<=[.!?])\s+/).pop() + el.textContent + after.split(/(?<=[.!?])\s/)[0]).trim();
  }
  let tapEl = null;
  function wordSheet(word, el) {
    tapEl = el;
    const old = findWord(word);
    const pre = old ? old.ar : suggest(word);
    openSheet(`
      <div class="row"><div class="big en grow">${esc(word)}</div>
        <button class="icon-btn soft" data-act="say" data-v="${esc(word)}" aria-label="نطق">${ic("speaker", "sm")}</button>
        <button class="icon-btn" data-act="closesheet" aria-label="إغلاق">${ic("x", "sm")}</button></div>
      <div class="def" id="def"></div>
      <input id="shAr" placeholder="المعنى بالعربي" value="${esc(pre)}" autocomplete="off">
      ${!old && pre ? `<p class="sub" style="margin-top:-4px">اقتراح من قائمة الـ١٠٠٠، عدّله لو تبغى</p>` : ""}
      <button class="btn block" data-act="shsave" data-w="${esc(word)}">${old ? "تحديث" : "حفظ في كلماتي"}</button>`);
    fetchDef(word).then((d) => { const e = $("#def"); if (e) e.textContent = d || ""; });
  }

  // =====================================================
  // PRACTICE
  // =====================================================
  let P = { src: "mine", pack: 0, mode: "cards", deck: [], i: 0, flip: false, score: 0, started: false, q: null };
  function pool() {
    if (P.src === "mine") return S.words.map((w) => ({ en: w.en, ar: w.ar, ex: w.ex, kind: "mine", id: w.id, known: w.learned }));
    return packRange(P.pack).map((w) => ({ en: w.en, ar: w.ar, ex: "", kind: "core", known: isKnown(w.en) }));
  }
  function startPractice() {
    const all = pool();
    let d = all.filter((x) => !x.known);
    if (!d.length) d = all;
    if (!d.length) return toast("أضف كلمات أول");
    if (P.mode === "quiz" && CORE.length + S.words.length < 4) return toast("ما فيه كلمات كافية للاختبار");
    P.deck = shuffle(d.slice());
    P.i = 0; P.flip = false; P.score = 0; P.started = true; P.q = null;
    render();
  }
  function markKnown(it) {
    if (it.kind === "mine") {
      const w = S.words.find((x) => x.id === it.id);
      if (w && !w.learned) { w.learned = true; bump(); }
    } else if (!isKnown(it.en)) { S.known[it.en.toLowerCase()] = 1; bump(); }
    touchStreak();
    save();
  }
  function buildQuiz(it) {
    const others = shuffle([...CORE, ...S.words].filter((w) => w.ar !== it.ar));
    const opts = [];
    for (const o of others) { if (!opts.includes(o.ar)) opts.push(o.ar); if (opts.length === 3) break; }
    opts.push(it.ar);
    P.q = { opts: shuffle(opts), picked: null };
  }
  function renderPractice() {
    if (!P.started) {
      const mineN = S.words.length;
      app.innerHTML = `
        <h1>تمرّن</h1>
        <p class="sub">اختر مصدر الكلمات ونوع التمرين.</p>
        <div class="card">
          <label class="lbl">الكلمات</label>
          <div class="seg">
            <button class="${P.src === "mine" ? "on" : ""}" data-act="psrc" data-v="mine">كلماتي (${mineN})</button>
            <button class="${P.src === "core" ? "on" : ""}" data-act="psrc" data-v="core">الـ١٠٠٠ كلمة</button>
          </div>
          ${P.src === "core" ? `<label class="lbl">الحزمة</label><select data-input="ppack">${Array.from({ length: PACKS }, (_, p) => `<option value="${p}" ${p === P.pack ? "selected" : ""}>الحزمة ${p + 1} (${p * PACK + 1}–${Math.min(CORE.length, p * PACK + PACK)})</option>`).join("")}</select>` : ""}
          <label class="lbl">نوع التمرين</label>
          <div class="seg">
            <button class="${P.mode === "cards" ? "on" : ""}" data-act="pmode" data-v="cards">بطاقات</button>
            <button class="${P.mode === "quiz" ? "on" : ""}" data-act="pmode" data-v="quiz">اختبار</button>
          </div>
          <button class="btn block" data-act="pstart">${ic("play", "sm")} ابدأ</button>
        </div>
        ${P.src === "mine" && !mineN ? `<div class="empty">ما عندك كلمات للحين. أضف كلمات أول، أو جرّب الـ١٠٠٠ كلمة.</div>` : ""}`;
      return;
    }
    if (P.i >= P.deck.length) {
      app.innerHTML = `
        <div class="card empty"><span class="big ring">🎉</span>
          <h2 style="margin:0 0 6px">خلصت!</h2>
          ${P.mode === "quiz" ? `<p>نتيجتك: <b class="en">${P.score} / ${P.deck.length}</b></p>` : `<p>راجعت ${P.deck.length} كلمة.</p>`}
          <div class="row wrap" style="justify-content:center">
            <button class="btn" data-act="pstart">إعادة</button>
            <button class="btn soft" data-act="pexit">رجوع</button></div></div>`;
      return;
    }
    const it = P.deck[P.i];
    const head = `
      <div class="row between"><button class="back" data-act="pexit">${ic("back", "sm")} خروج</button><span class="en hint">${P.i + 1} / ${P.deck.length}</span></div>
      <div class="bar" style="margin-bottom:14px"><i style="width:${Math.round((P.i / P.deck.length) * 100)}%"></i></div>`;
    if (P.mode === "cards") {
      app.innerHTML = head + `
        <button class="flash" data-act="pflip">
          <div class="big en">${esc(it.en)}</div>
          ${P.flip ? `<div class="ans">${esc(it.ar)}</div>${it.ex ? `<div class="en hint">${esc(it.ex)}</div>` : ""}` : `<div class="hint">اضغط لإظهار المعنى</div>`}
        </button>
        <div class="row" style="margin-top:12px;justify-content:center">
          <button class="icon-btn soft" data-act="say" data-v="${esc(it.en)}" aria-label="نطق">${ic("speaker", "sm")}</button></div>
        ${P.flip ? `<div class="row" style="margin-top:14px">
          <button class="btn warn grow" data-act="pno">ما عرفتها</button>
          <button class="btn grow" data-act="pyes">${ic("check", "sm")} عرفتها</button></div>` : ""}`;
    } else {
      if (!P.q) buildQuiz(it);
      const q = P.q;
      app.innerHTML = head + `
        <div class="flash" style="min-height:170px;cursor:default"><div class="big en">${esc(it.en)}</div>
          <button class="icon-btn soft" data-act="say" data-v="${esc(it.en)}" aria-label="نطق">${ic("speaker", "sm")}</button></div>
        <div class="opts">${q.opts.map((o) => {
          let c = "";
          if (q.picked !== null) c = o === it.ar ? "ok" : o === q.picked ? "no" : "";
          return `<button class="opt ${c}" data-act="popt" data-v="${esc(o)}" ${q.picked !== null ? "disabled" : ""}>${esc(o)}</button>`;
        }).join("")}</div>
        ${q.picked !== null ? `<button class="btn block" style="margin-top:14px" data-act="pnext">التالي</button>` : ""}`;
    }
  }

  // =====================================================
  // LIBRARY (files / images / videos / links / notes)
  // =====================================================
  const viewerUrls = {};
  const keepUrls = new Set();
  const thumbUrls = {};
  const LT = { image: "صورة", video: "فيديو", audio: "صوت", pdf: "PDF", file: "ملف", link: "رابط", note: "ملاحظة" };
  const FILTERS = [["all", "الكل"], ["image", "صور"], ["video", "فيديو"], ["audio", "صوت"], ["pdf", "PDF"], ["file", "ملفات"], ["link", "روابط"], ["note", "ملاحظات"]];
  let lf = { q: "", f: "all", add: "file" };
  const typeOf = (f) => {
    const t = f.type || "";
    if (t.startsWith("image/")) return "image";
    if (t.startsWith("video/")) return "video";
    if (t.startsWith("audio/")) return "audio";
    if (t === "application/pdf" || /\.pdf$/i.test(f.name)) return "pdf";
    return "file";
  };
  const ytId = (u) => (String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  async function blobUrl(id, cache) {
    if (cache[id]) return cache[id];
    const b = await DB.get(id);
    return b ? (cache[id] = URL.createObjectURL(b)) : null;
  }

  async function storageInfo() {
    try {
      const e = await navigator.storage.estimate();
      const el = $("#store");
      if (el) el.textContent = `المساحة المستخدمة: ${fmtSize(e.usage || 0)}`;
    } catch (_) {}
  }
  function libCard(it) {
    const inner = {
      image: `<img alt="" data-thumb="${it.id}">`,
      video: `<video muted preload="metadata" playsinline data-thumbv="${it.id}"></video><span class="badge">${ic("play", "sm")}</span>`,
    }[it.type] || ic({ audio: "audio", pdf: "pdf", file: "file", link: "link", note: "note" }[it.type], "lg");
    return `<button class="card lib-item" data-act="libview" data-id="${it.id}">
      <div class="lib-thumb">${inner}</div>
      <div class="lib-meta"><b>${esc(it.title)}</b><small>${LT[it.type]}${it.size ? " · " + fmtSize(it.size) : ""}</small></div></button>`;
  }
  function listLib() {
    const q = lf.q.trim().toLowerCase();
    const list = S.lib.filter((it) => (lf.f === "all" || it.type === lf.f) && (!q || (it.title + " " + (it.note || "") + " " + (it.text || "")).toLowerCase().includes(q)));
    const box = $("#llist");
    if (!box) return;
    box.innerHTML = list.length ? `<div class="lib-grid">${list.map(libCard).join("")}</div>`
      : `<div class="empty"><span class="big">📂</span>${S.lib.length ? "ما فيه نتائج." : "مكتبتك فاضية.<br>أضف صور، فيديوهات، ملفات PDF، روابط، أو ملاحظات تتعلم منها."}</div>`;
    box.querySelectorAll("[data-thumb]").forEach(async (img) => { const u = await blobUrl(img.dataset.thumb, thumbUrls); if (u) img.src = u; });
    box.querySelectorAll("[data-thumbv]").forEach(async (v) => { const u = await blobUrl(v.dataset.thumbv, thumbUrls); if (u) v.src = u + "#t=0.1"; });
  }
  function renderLibrary() {
    app.innerHTML = `
      <div class="row between"><h1>مكتبتي</h1>
        <button class="btn sm" data-act="libadd">${ic("plus", "sm")} إضافة</button></div>
      <p class="sub">مرجعك للتعلّم: صور، فيديوهات، ملفات، روابط وملاحظات. <span id="store"></span></p>
      <input data-input="lq" placeholder="ابحث في مكتبتك" value="${esc(lf.q)}">
      <div class="chips">${FILTERS.map(([k, t]) => `<button class="chip ${lf.f === k ? "on" : ""}" data-act="lf" data-v="${k}">${t}</button>`).join("")}</div>
      <div id="llist"></div>
      <p class="sub" style="margin-top:14px">⚠️ الملفات تنحفظ في هذا المتصفح وهذا الجهاز فقط (ما ترفع لأي مكان).</p>`;
    listLib();
    storageInfo();
  }

  function addSheet() {
    const t = lf.add;
    openSheet(`
      <div class="row between"><h2 style="margin:0">إضافة للمكتبة</h2>
        <button class="icon-btn" data-act="closesheet" aria-label="إغلاق">${ic("x", "sm")}</button></div>
      <div class="seg" style="margin-top:12px">
        ${[["file", "ملف/صورة/فيديو"], ["link", "رابط"], ["note", "ملاحظة"]].map(([k, n]) => `<button class="${t === k ? "on" : ""}" data-act="addtab" data-v="${k}">${n}</button>`).join("")}
      </div>
      ${t === "file" ? `
        <label class="drop" id="drop" for="fileIn">${ic("upload", "lg")}<b>اختر ملفات أو اسحبها هنا</b><small>صور · فيديو · صوت · PDF · أي ملف</small></label>
        <input type="file" id="fileIn" multiple hidden>
        <div id="picked" class="sub"></div>
        <input id="aTitle" placeholder="العنوان (اختياري)">
        <textarea id="aNote" placeholder="ملاحظاتك (اختياري)" style="min-height:80px"></textarea>
        <button class="btn block" data-act="savefiles">حفظ</button>`
      : t === "link" ? `
        <input id="aUrl" class="en" type="url" inputmode="url" placeholder="https://..." autocapitalize="off">
        <input id="aTitle" placeholder="العنوان (اختياري)">
        <textarea id="aNote" placeholder="ملاحظاتك (اختياري)" style="min-height:80px"></textarea>
        <p class="sub">روابط يوتيوب تتشغّل داخل المكتبة.</p>
        <button class="btn block" data-act="savelink">حفظ</button>`
      : `
        <input id="aTitle" placeholder="العنوان">
        <textarea id="aText" class="en" placeholder="Write or paste English text. You can tap any word later."></textarea>
        <button class="btn block" data-act="savenote">حفظ</button>`}`);
    if (t === "file") {
      const drop = $("#drop"), inp = $("#fileIn");
      const show = () => { $("#picked").textContent = inp.files.length ? `${inp.files.length} ملف: ` + [...inp.files].map((f) => f.name).join("، ") : ""; };
      inp.onchange = show;
      ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
      ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
      drop.addEventListener("drop", (e) => { inp.files = e.dataTransfer.files; show(); });
    }
  }
  async function saveFiles(btn) {
    const files = [...($("#fileIn").files || [])];
    if (!files.length) return toast("اختر ملف أول");
    const title = $("#aTitle").value.trim();
    const note = $("#aNote").value.trim();
    btn.disabled = true;
    try { navigator.storage?.persist?.(); } catch (_) {}
    let n = 0;
    for (const f of files) {
      const id = "f" + uid();
      try {
        await DB.put(id, f);
        S.lib.unshift({ id, type: typeOf(f), title: (files.length === 1 && title) || f.name, note, mime: f.type, size: f.size, added: Date.now() });
        n++;
      } catch (e) { toast("المساحة ما تكفي: " + f.name); }
    }
    save();
    closeSheet();
    if (n) { bump(); save(); toast(`انحفظ ${n} ✓`); }
    renderLibrary();
  }
  function saveLink() {
    const url = $("#aUrl").value.trim();
    if (!/^https?:\/\//i.test(url)) return toast("اكتب رابط صحيح يبدأ بـ https://");
    S.lib.unshift({ id: "l" + uid(), type: "link", title: $("#aTitle").value.trim() || url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 50), url, note: $("#aNote").value.trim(), added: Date.now() });
    save(); closeSheet(); toast("انحفظ ✓"); renderLibrary();
  }
  function saveNote() {
    const text = $("#aText").value.trim();
    if (!text) return toast("اكتب النص");
    S.lib.unshift({ id: "n" + uid(), type: "note", title: $("#aTitle").value.trim() || text.slice(0, 30), text, added: Date.now() });
    save(); closeSheet(); toast("انحفظ ✓"); renderLibrary();
  }

  async function viewSheet(id, editing) {
    const it = S.lib.find((x) => x.id === id);
    if (!it) return;
    let body = "";
    if (it.type === "link") {
      const y = ytId(it.url);
      body = y
        ? `<iframe class="yt" src="https://www.youtube-nocookie.com/embed/${y}" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
        : "";
      body += `<a class="btn block soft" style="margin-top:10px" href="${esc(it.url)}" target="_blank" rel="noopener noreferrer">${ic("open", "sm")} فتح الرابط</a>`;
    } else if (it.type === "note") {
      body = editing
        ? `<textarea id="eText" class="en" style="min-height:200px">${esc(it.text)}</textarea>`
        : `<div class="reader card" id="noteBox">${tappable(it.text)}</div><p class="sub">اضغط أي كلمة لمعناها.</p>`;
    } else {
      const u = await blobUrl(id, viewerUrls);
      if (!u) body = `<div class="empty">الملف غير موجود على هذا الجهاز.</div>`;
      else if (it.type === "image") body = `<img src="${u}" alt="">`;
      else if (it.type === "video") body = `<video src="${u}" controls playsinline preload="metadata"></video>`;
      else if (it.type === "audio") body = `<audio src="${u}" controls></audio>`;
      else if (it.type === "pdf") body = `<iframe src="${u}"></iframe>`;
      body += `<div class="row wrap" style="margin-top:10px">
        <a class="btn sm soft" href="${u}" target="_blank" rel="noopener">${ic("open", "sm")} فتح</a>
        <a class="btn sm soft" href="${u}" download="${esc(it.title)}">${ic("download", "sm")} تنزيل</a></div>`;
    }
    openSheet(`
      <div class="row between"><span class="tag">${LT[it.type]}</span>
        <button class="icon-btn" data-act="closesheet" aria-label="إغلاق">${ic("x", "sm")}</button></div>
      <div class="viewer" style="margin-top:10px">${body}</div>
      <hr>
      ${editing || it.type !== "note" ? `
        <input id="eTitle" value="${esc(it.title)}" placeholder="العنوان">
        ${it.type !== "note" ? `<textarea id="eNote" placeholder="ملاحظاتك" style="min-height:80px">${esc(it.note || "")}</textarea>` : ""}` : `<h3>${esc(it.title)}</h3>`}
      <div class="row wrap" style="margin-top:6px">
        ${editing || it.type !== "note" ? `<button class="btn sm" data-act="libsave" data-id="${id}">حفظ التعديل</button>` : `<button class="btn sm soft" data-act="libedit" data-id="${id}">${ic("edit", "sm")} تعديل</button>`}
        <button class="btn sm danger" data-act="libdel" data-id="${id}">${ic("trash", "sm")} حذف</button>
      </div>`);
    markSaved($("#noteBox"));
  }

  // =====================================================
  // actions (event delegation)
  // =====================================================
  const acts = {
    go: (t) => go(t.dataset.h),
    say: (t, e) => { e.stopPropagation(); speak(t.dataset.v); },
    closesheet: closeSheet,
    theme: (t) => { setTheme(t.dataset.v); render(); },
    exp: exportData,
    imp: () => $("#impFile").click(),
    homeadd: () => {
      if (addWord($("#hEn").value, $("#hAr").value, $("#hEx").value)) renderHome();
    },
    addcore: (t) => {
      const w = coreMap.get(t.dataset.en.toLowerCase());
      if (w && !findWord(w.en)) { addWord(w.en, w.ar, ""); render(); }
    },
    knowcore: (t) => {
      const k = t.dataset.en.toLowerCase();
      if (S.known[k]) delete S.known[k]; else { S.known[k] = 1; bump(); }
      save(); render();
    },
    tgl: (t) => {
      const w = S.words.find((x) => x.id === t.dataset.id);
      w.learned = !w.learned;
      if (w.learned) bump();
      save(); renderWords();
    },
    del: (t) => {
      if (!confirm("تحذف هذي الكلمة؟")) return;
      S.words = S.words.filter((x) => x.id !== t.dataset.id);
      save(); renderWords();
    },
    wf: (t) => { wf.f = t.dataset.v; renderWords(); },
    cf: (t) => { cf.f = t.dataset.v; renderCore(); },
    practicepack: (t) => { P = { ...P, src: "core", pack: +t.dataset.p, started: false }; go("practice"); },
    addstory: () => {
      const title = $("#sT").value.trim();
      const text = $("#sX").value.trim();
      if (!title || !text) return toast("اكتب العنوان والنص");
      S.myStories.unshift({ id: "u" + uid(), title, level: "نصي", text });
      save(); toast("انحفظ ✓"); renderStories();
    },
    delstory: (t, e) => {
      e.stopPropagation();
      if (!confirm("تحذف النص؟")) return;
      S.myStories = S.myStories.filter((x) => x.id !== t.dataset.id);
      save(); renderStories();
    },
    finish: (t) => {
      S.read[t.dataset.id] = true;
      bump(); save(); toast("أحسنت! 🎉");
      go("stories");
    },
    tapword: (t) => wordSheet(t.dataset.w, t),
    shsave: (t) => {
      const w = t.dataset.w;
      const old = findWord(w);
      if (addWord(w, $("#shAr").value, old ? old.ex : sentenceOf(tapEl))) {
        closeSheet();
        markSaved();
      }
    },
    // practice
    psrc: (t) => { P.src = t.dataset.v; renderPractice(); },
    pmode: (t) => { P.mode = t.dataset.v; renderPractice(); },
    pstart: startPractice,
    pexit: () => { P.started = false; renderPractice(); },
    pflip: () => { if (!P.flip) { P.flip = true; renderPractice(); } },
    pyes: () => { markKnown(P.deck[P.i]); P.i++; P.flip = false; renderPractice(); },
    pno: () => {
      const it = P.deck[P.i];
      if (!it.rep) { it.rep = true; P.deck.push({ ...it }); }
      touchStreak(); save();
      P.i++; P.flip = false; renderPractice();
    },
    popt: (t) => {
      if (P.q.picked !== null) return;
      P.q.picked = t.dataset.v;
      if (t.dataset.v === P.deck[P.i].ar) P.score++;
      touchStreak(); save();
      renderPractice();
    },
    pnext: () => { P.i++; P.q = null; renderPractice(); },
    // library
    libadd: () => addSheet(),
    addtab: (t) => { lf.add = t.dataset.v; addSheet(); },
    lf: (t) => { lf.f = t.dataset.v; renderLibrary(); },
    savefiles: (t) => saveFiles(t),
    savelink: saveLink,
    savenote: saveNote,
    libview: (t) => viewSheet(t.dataset.id, false),
    libedit: (t) => viewSheet(t.dataset.id, true),
    libsave: (t) => {
      const it = S.lib.find((x) => x.id === t.dataset.id);
      it.title = $("#eTitle").value.trim() || it.title;
      if (it.type === "note") it.text = $("#eText") ? $("#eText").value.trim() || it.text : it.text;
      else it.note = $("#eNote").value.trim();
      save(); closeSheet(); toast("انحفظ ✓"); renderLibrary();
    },
    libdel: async (t) => {
      if (!confirm("تحذف هذا العنصر؟")) return;
      const id = t.dataset.id;
      S.lib = S.lib.filter((x) => x.id !== id);
      try { await DB.del(id); } catch (_) {}
      [viewerUrls, thumbUrls].forEach((c) => { if (c[id]) { URL.revokeObjectURL(c[id]); delete c[id]; } });
      save(); closeSheet(); renderLibrary();
    },
  };
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (t && !t.disabled && acts[t.dataset.act]) acts[t.dataset.act](t, e);
  });
  document.addEventListener("input", (e) => {
    const k = e.target.dataset.input;
    if (!k) return;
    const v = e.target.value;
    if (k === "wq") { wf.q = v; listWords(); }
    else if (k === "cq") {
      cf.q = v; listCore();
      const pk = $("#packs");
      if (pk) pk.style.display = v.trim() ? "none" : "";
    }
    else if (k === "lq") { lf.q = v; listLib(); }
    else if (k === "goal") { S.goal = +v; save(); }
    else if (k === "ppack") { P.pack = +v; }
  });

  const RENDER = { home: renderHome, words: renderWords, core: renderCore, stories: renderStories, read: renderRead, library: renderLibrary, practice: renderPractice };

  // ---------- boot ----------
  applyTheme();
  route();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
