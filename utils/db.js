const mongoose=require("mongoose");


const connection=mongoose.connect(process.env.mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((data)=>console.log(data))
.catch((err)=>console.log(err));

module.exports=connection;