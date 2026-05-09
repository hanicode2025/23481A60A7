const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYW5lZXNodGFkZXBhbGxpQGdtYWlsLmNvbSIsImV4cCI6MTc3ODMwODE3NywiaWF0IjoxNzc4MzA3Mjc3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDlhMzYwNzEtZWEzZi00Y2VkLTg1ZjMtMGI5MWZkZDkwNGY0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGFkZXBhbGxpIGhhbmVlc2giLCJzdWIiOiI5NTcwNzU0OC1jZDVlLTRhNWMtOGQzYy0yY2Q2N2E0MTIxOGYifSwiZW1haWwiOiJoYW5lZXNodGFkZXBhbGxpQGdtYWlsLmNvbSIsIm5hbWUiOiJ0YWRlcGFsbGkgaGFuZWVzaCIsInJvbGxObyI6IjIzNDgxYTYwYTciLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiI5NTcwNzU0OC1jZDVlLTRhNWMtOGQzYy0yY2Q2N2E0MTIxOGYiLCJjbGllbnRTZWNyZXQiOiJlRmJTeHRmelJId2RyR1loIn0.eyThO2Y84M3TiSTy7eKDgUc3IMG1HMYGJItUVVNpfRU"

app.get('/notifications', async (req, res) => {
    try {
        const response = await axios.get('http://4.224.186.213/evaluation-service/notifications', {
            headers: { Authorization: `Bearer ${TOKEN}` },
            params: req.query
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/logs', async (req, res) => {
    try {
        const response = await axios.post('http://4.224.186.213/evaluation-service/logs', req.body, {
            headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('Proxy server running on port 5000'));