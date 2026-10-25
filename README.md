# مفرداتي

موقع/تطبيق شخصي لتعلم الإنجليزي: احفظ كلماتك، اقرأ قصص، اضغط على أي كلمة تعرف معناها، ومرّن نفسك ببطاقات.

- بدون سيرفر، البيانات تنحفظ في متصفحك (localStorage). خذ نسخة احتياطية من الرئيسية.
- يشتغل على الجوال كتطبيق: افتح الرابط ثم "إضافة إلى الشاشة الرئيسية".

## النشر على GitHub Pages

```bash
git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

ثم في GitHub: Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save.
الرابط: `https://USERNAME.github.io/REPO/`

## تجربة محلية

```bash
python -m http.server 8000
```
