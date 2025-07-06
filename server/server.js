// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ───── ミドルウェア設定 ─────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ───── セッション管理 ─────
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // 本番でHTTPSを使うなら true
      maxAge: 1000 * 60 * 60 // 1時間（必要なら調整）
    }
  })
);

// ───── 認証ルート ─────
app.use('/auth', authRoutes);

// ───── Viteでビルドされた静的ファイル配信 ─────
app.use(express.static(path.join(__dirname, '../client/dist')));

// ───── SPA対応のcatch-allルート（404防止）─────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ───── サーバー起動 ─────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});