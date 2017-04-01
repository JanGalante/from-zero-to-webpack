const path = require('path');
const express = require('express');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(3000, () => {
  console.log('React app listening on port 3000!')
});