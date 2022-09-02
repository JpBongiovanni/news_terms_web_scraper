const express = require('express');
const product = require('./api/news_terms');

const app = express();

const PORT = process.env.PORT || 8000;


app.use("/api/news_terms", product);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))