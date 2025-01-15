const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'routes' directory
app.use(express.static(path.join(__dirname, '../routes')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../routes/main/index.html'));
});

app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../routes/settings/settings.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
