
const router = require('express').Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const passport=require("passport");


router.post('/register',async function(req, res,) {
      let pass=req.body.password;
      let password=await bcrypt.hash(pass,6);
      
      const user=new User(
        {
          fullname:req.body.fullname,
          password:password,
          username:req.body.username,
          phoneNumber:req.body.phonenumber,
          sex:req.body.sex
        }
      );
      try {
        await user.save();
        res.sendStatus(200);
      } catch (error) {
        res.status(500);
      }
});

router.post("/login",passport.authenticate("local",{failureRedirect:"http://localhost:5173/",failureFlash:"wrong password or username",successRedirect:"/http://localhost:5173/home"}),(req,res)=>{
     res.sendStatus(200);
     //res.redirect("http://localhost:5173/home");
});

router.get("/logout",(req,res)=>{
    req.logOut(()=>{
        
    });
    res.sendStatus(200);
});


module.exports = router;
