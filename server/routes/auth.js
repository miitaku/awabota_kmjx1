// routes/auth.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
require('dotenv').config();

// ───── 環境変数 ─────
const CLIENT_ID = process.env.X_CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI; // .envから読み込むこと！
const SCOPE = 'tweet.read tweet.write users.read offline.access';

// ───── 認可エンドポイント ─────
router.get('/twitter', (req, res) => {
  // ランダムな state と code_verifier を生成
  const state = crypto.randomBytes(10).toString('hex');
  const codeVerifier = crypto.randomBytes(32).toString('hex');

  // code_challenge（PKCE用）を生成
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // セッションに保存
  req.session.state = state;
  req.session.codeVerifier = codeVerifier;

  // Twitter認証URL生成
  const authUrl = 'https://twitter.com/i/oauth2/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  res.redirect(authUrl);
});

// ───── コールバック処理 ─────
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  // state検証（セキュリティ）
  if (!code || !state || state !== req.session.state) {
    return res.status(403).send('❌ 無効なstateです');
  }

  const codeVerifier = req.session.codeVerifier;

  try {
    // アクセストークン取得
    const response = await axios.post(
      'https://api.twitter.com/2/oauth2/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = response.data.access_token;

    // 🎉 成功レスポンス（あとで画面に転送してもOK）
    res.send(`<h2>✅ ログイン成功！</h2><p>Access Token: ${accessToken}</p>`);
  } catch (err) {
    console.error('❌ トークン取得エラー:', err.response?.data || err.message);
    res.status(500).send('アクセストークン取得に失敗しました');
  }
});

module.exports = router;