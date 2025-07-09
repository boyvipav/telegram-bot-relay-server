import express from 'express';

const app = express();

// GET /sendTelegram?token=...&chat_id=...&text=...
app.get('/sendTelegram', async (req, res) => {
  const { token, chat_id, text } = req.query;

  if (!token || !chat_id || !text) {
    return res.status(200).json({ error: 'Missing token, chat_id or text' });
  }

  const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage` +
              `?chat_id=${encodeURIComponent(chat_id)}&text=${encodeURIComponent(text)}`;

  try {
    const tgRes = await fetch(url);
    const data = await tgRes.json();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Telegram relay server running on port ${PORT}`));
