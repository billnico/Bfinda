const { default: mongoose } = require("mongoose");

const Schema=require("mongoose").Schema;


const userSchema=new Schema({
    fullname:{type:String,required:true},
    password:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    profilrUrl:{type:String,required:false},
    prefs:[{type:String,required:false}],
    likes:[{type:mongoose.Types.ObjectId,ref:"user"}],
    sex:{type:String,required:true},
    phoneNumber:{type:String,required:true}
});


module.exports=mongoose.model("User",userSchema);