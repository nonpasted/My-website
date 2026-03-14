# 🌺 Portfolio — GitHub Pages

A clean, Apple/macOS-inspired portfolio site built with React.

---

## 🚀 Deploy to GitHub Pages

### 1. Install dependencies
```bash
npm install
```

### 2. Update your homepage URL
In `package.json`, change:
```json
"homepage": "https://YOUR_USERNAME.github.io/portfolio"
```

### 3. Update your email in `src/App.js`
Search for `your@email.com` and replace with your real email.

### 4. Deploy
```bash
npm run deploy
```

This will build the app and push it to the `gh-pages` branch automatically.

### 5. Enable GitHub Pages
- Go to your repo → **Settings → Pages**
- Set **Source** to `Deploy from a branch`
- Set **Branch** to `gh-pages` → `/ (root)`

Your site will be live at `https://YOUR_USERNAME.github.io/portfolio` in a minute or two.

---

## 🛠 Local Development
```bash
npm start
```

---

## ✏️ Customizing

| What to change | Where |
|---|---|
| Your name / bio | `src/App.js` → `Hero` component |
| Projects | `src/App.js` → `PROJECTS` array |
| Skills & levels | `src/App.js` → `Skills` component |
| Colors / fonts | `src/App.css` → `:root` variables |
| Contact email | `src/App.js` → `handleSubmit` in `Contact` |

---

Built with React · Deployed on GitHub Pages · Made in Hawaiʻi 🌺
