const express = require("express");
const app = express();




const PORT = process.env.PORT
app.listen(PORT, ()=>{
	console.log(`service is running on http://localhost:5564`);
})