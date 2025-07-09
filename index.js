const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// POST /sendTelegram
app.post('/sendTelegram', async (req, res) => {
  const { token, chat_id, text } = req.body;

  if (!token || !chat_id || !text) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id,
      text
    });

    res.json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Telegram relay server running on port ${PORT}`));
