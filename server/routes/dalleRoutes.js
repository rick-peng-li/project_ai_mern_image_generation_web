import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

let accessToken = null;
let tokenExpireTime = 0;

const getAccessToken = async () => {
  const now = Date.now();
  if (accessToken && now < tokenExpireTime) {
    return accessToken;
  }

  try {
    const response = await axios.post('https://aip.baidubce.com/oauth/2.0/token', null, {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.BAIDU_API_KEY,
        client_secret: process.env.BAIDU_SECRET_KEY,
      },
    });

    accessToken = response.data.access_token;
    tokenExpireTime = now + (response.data.expires_in - 60) * 1000;
    return accessToken;
  } catch (error) {
    console.error('Failed to get access token:', error.message);
    throw error;
  }
};

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from ERNIE-ViLG!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!process.env.BAIDU_API_KEY || !process.env.BAIDU_SECRET_KEY) {
      return res.status(400).json({ 
        error: 'Please set BAIDU_API_KEY and BAIDU_SECRET_KEY in .env file' 
      });
    }

    const token = await getAccessToken();

    const aiResponse = await axios.post('https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/text2image/image_gen', {
      prompt,
      image_num: 1,
      size: '1024x1024',
    }, {
      params: {
        access_token: token,
      },
    });

    if (aiResponse.data.results && aiResponse.data.results.length > 0) {
      const imageUrl = aiResponse.data.results[0].image;
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
      res.status(200).json({ photo: base64Image });
    } else {
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } catch (error) {
    console.error('Image generation error:', error.message);
    res.status(500).send(error?.response?.data?.error_msg || error?.message || 'Something went wrong');
  }
});

export default router;