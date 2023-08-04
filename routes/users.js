const multer=require("multer");
const router=require("express").Router();
const middles=require("../utils/middleware");
const User = require("../models/User");
const fs=require("fs/promises");

//setup multer for profile pic upload
//to be replaced with memory storage after using S3 host
const storage=multer.diskStorage(
  {
    filename:(req,file,done)=>{
        return done(null,req.user.username+"-"+file.originalname);
    },
    destination:(req,file,done)=>{
        return done(null,process.env.profileDest);
    }
  }
);
const uploader=multer({storage:storage});

//setup multer for collection of pic upload
//to be replaced with memory storage after using S3 h
const collectionStorage=multer.diskStorage({
  filename:(req,file,done)=>{
      return done(null,file.originalname);
  },
  destination:(req,file,done)=>{
      return done(null,process.env.collectionDest+"/"+req.user.username);
  }
})
const picCollectionUpload=multer({storage:collectionStorage});

//uploading profile pic
router.post("/upload-profile-pic",middles.checkAuth,uploader.single("profilePic"),async(req,res)=>{
    try {
       const user=await User.findOne({username:req.user.username});
       if(user){
          user.profilrUrl=req.file.path;
          await user.save();
          res.status(200);
          res.send(req.file.path);
       }else{
          res.send("error, user not found");
       }
    } catch (err){
        res.status(500);
        res.send(err);
    }
});

//uploading a collection of pics
router.post("/upload-pics",middles.checkAuth,picCollectionUpload.array("photo"),(req,res)=>{
    res.sendStatus(200);
});


//returns pics of a profile of a given id
router.get("/pics/:id",middles.checkAuth,async(req,res)=>{
     try {
        const picsOwner=await User.findById(id);
        let picsFolder=picsOwner.username;
        let pics=await fs.readdir(process.env.collectionDest+picsFolder);

        const picsUrls=pics.map((pic,index)=>{
             return process.env.collectionDest+picsFolder+"/"+pic;
        });
        res.status(200);
        res.json(picsUrls);
     } catch(err){
        res.status(500);
        res.send(err);
     }
});

//gets all users from database
router.get("/matches",middles.checkAuth,async(req,res)=>{
     try {
        const users=await User.find();

        //only return users of opposite sex
        users.filter((user)=>{
             return req.user.sex!==user.sex; 
        });

        res.json(users);
     }catch(err){
        res.status(500);
        res.send(err);
     }
});


//liking a profile
router.get("/like/:id",middles.checkAuth,async(req,res)=>{
     try {
        const likedUser=await User.findById(req.params.id);
        const likes=likedUser.likes;
        likes.push(req.user._id);
        res.sendStatus(200);
     } catch(err){
        res.status(500);
        res.send(err);  
     }
});

module.exports=router;