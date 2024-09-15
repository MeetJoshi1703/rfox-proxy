const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Route to handle login requests
app.post('/api/login', async (req, res) => {
  try {
    const response = await axios.post('https://id-dev.rfoxvalt.com/api/v1/auth/email/login', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});
app.get('/',async (req,res)=>{
  res.send("hello world")
})
// Route to handle user profile requests
app.get('/api/user-profile', async (req, res) => {
  try {
    const response = await axios.get('https://id-dev.rfoxvalt.com/api/v1/auth/user', {
      headers: { Authorization: `Bearer ${req.headers.authorization}` },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
