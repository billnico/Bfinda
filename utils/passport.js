const LocalStrategy=require("passport-local").Strategy;
const passport=require("passport");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

passport.use(new LocalStrategy(async (username,password,done)=>{
      try {
        const user=await User.findOne({username:username});
        if(user){
            if(await verifyPassword(user.password,password)){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
      } catch (err) {
         return done(err);
      }
}));

async function verifyPassword(actualPassword,givenPassword){
        return await bcrypt.compare(givenPassword,actualPassword);
}


passport.serializeUser((user,done)=>{
    return  done(null,user._id);
});

passport.deserializeUser(async (id,done)=>{
     try {
        const user=await User.findById(id);
        if(user){
            return done(null,user)
        }else{
            return done(null,false);
        }
     } catch(err){
        return done(err);
     }
});

