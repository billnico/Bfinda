const mongoose=require("mongoose");


const connection=mongoose.connect(process.env.mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

module.exports=connection;