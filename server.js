const express = require('express');
const fs = require('fs');
const app = express();

const filePath = './cart_visit_count.json';

app.get('/track-cart-visit', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    let count = 0;

    if (!err && data) {
      const json = JSON.parse(data);
      count = json.count || 0;
    }

    count++;

    fs.writeFile(filePath, JSON.stringify({ count }), (err) => {
      if (err) return res.status(500).send('Failed to save count.');
      res.send(`🛒 Cart visits so far: ${count}`);
    });
  });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
