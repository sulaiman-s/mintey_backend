const express=require('express');
const app=express();
require("./startup/urls")(app);
require("./startup/db")

const port=process.env.PORT||4000;

app.listen(port,()=>{
    console.log(`listening on port${port}`)
})


