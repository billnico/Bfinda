const mongoose=require("mongoose");


const connection=mongoose.connect(process.env.mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((data)=>{})
.catch((err)=>{});

module.exports=connection;