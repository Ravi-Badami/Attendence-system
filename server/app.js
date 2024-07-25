const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());
app.post('/send-sms', async (req, res) => {
  const { recipientNumber, messageContent } = req.body;

  try {
    const response = await axios.post(
      'https://rest.clicksend.com/v3/sms/send',
      {
        messages: [
          {
            body: messageContent,
            to: recipientNumber,
          },
        ],
      },
      {
        auth: {
          username: 'enerucreations@gmail.com',
          password: '98DE562B-1B20-14BA-3110-C93F91B9B762',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response.data);
    res.status(500).send('Failed to send SMS');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
