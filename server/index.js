
const path = require('path')
const express = require('express');
const app = express();

// middleware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

// routes
require('./app.routes')(app);

// client-side routing
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(8080, () => {
  console.log('server started on port 8080');
});
