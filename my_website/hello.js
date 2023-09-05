const express = require('express');

const app = express();

const hostname = 'granitx.com';

// Create an Express app





app.get('/', (req, res) => {
  res.send('Helloaaa World!');
});



// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
