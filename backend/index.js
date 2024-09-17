const express = require('express');
const path = require('path');
const cors=require('cors')

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/api/tickers', async (req, res) => {
    try {
        const response = await fetch('https://api.wazirx.com/api/v2/tickers');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Serve the HTML file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
