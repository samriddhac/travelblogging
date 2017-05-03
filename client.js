const express = require('express');
const path = require('path');
const port = process.env.PORT || 8001;

const app = express();

app.use(express.static(path.join(__dirname, 'dist/client')));
app.get('*',(req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist/client/index.html'));
});

app.listen(port);
console.log("server started");