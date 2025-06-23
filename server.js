const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generateImage', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await axios({
            method: 'post',
            url: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`
            },
            data: {
                text_prompts: [{ text: prompt }],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                steps: 30,
                samples: 1
            }
        });

        const image = response.data.artifacts[0];
        res.json({ image: image.base64 });
        
    } catch (error) {
        console.error('Generation error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: error.response?.data?.message || error.message 
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});