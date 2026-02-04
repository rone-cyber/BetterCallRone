const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send({message:"Better call Rone"})
});

app.listen(PORT,()=>{console.log('server is running')});