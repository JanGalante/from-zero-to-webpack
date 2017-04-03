import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactServer from 'react-dom/server';
import HelloWorld from './HelloWorld';

const app = express();

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();
  const markup = ReactServer.renderToString(<HelloWorld />);
  
  res.send(html.replace('$react', markup));
});

app.listen(3000, () => {
  console.log('React app listening on port 3000!')
});