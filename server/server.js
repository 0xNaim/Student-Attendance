require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, Express!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
