const express=require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const controllers =require("../controllers/user");
const {
    loginRules, 
    registerRules,
     validation,
    } =require("../middleware/validator");
const isAuth=require("../middleware/passport"); 
   
// test get
router.get("/", (req,res) => {
      res.send("hello world");
})
// // register
// router.post("/register", registerRules(), validation, async(req,res) => {
//     const {name, lastName,email,password} = req.body;
//     try{
        
//         const newUser = new User({name, lastName, email, password});

//         // check if the email exist
//         const searchedUser=await User.findOne({email});

//         if (searchedUser){
//             return res.status(400).send({msg:"user already exist"});
//         }

//         //hach pawssword
//          const salt=10;
//          const genSalt = await bcrypt.genSalt(salt);
//          const hashedPassword =await bcrypt.hashSync(password, genSalt);
//          console.log(hashedPassword);
//          newUser.password=hashedPassword;

//          //generate a token

         
//         //save the user
//         const newUserToken=  await newUser.save();
//         const payload={
//             _id:newUserToken.id,
//             name: newUserToken.name,

//         };
//         const token= await jwt.sign(payload, process.env.SecretOrKey,{
//             expiresIn:3600,
//         });
 
//         res.send({newUserToken, msg: "user is saved", token});
//     }catch(error){
//         res.send("can not save the user");
//         console.log(error)    }
// })

// //login
// router.post("/login",loginRules(), validation, async(req,res)=>{
//     const {email, password}=req.body
//     try {
//         // find if the user exist 
//         const searchedUser=await User.findOne({email});
//         // if the email not exist
//         if (!searchedUser){
//             return res.send({msg: "bad Credential"});
//         }
//         // password are equals
//         const match= await bcrypt.compare(password, searchedUser.password);
       
//         if(!match){
//             return res.send({msg: "bad Credential"});
//         }

//         // create token
//         const payload = {
//             _id: searchedUser.id,
//             name:searchedUser.name,

//         };
//         const token= jwt.sign(payload, process.env.SecretOrKey,{
//             expiresIn:3600,
//         });
       
        
//          //send the user
          
//          return res.send({user: searchedUser, msg: "success",token:`Bearer ${token}` });


//     } catch (error) {
//         res.send({msg: "cannot get the user"});
//     }

// })

// //get profile route (user auth ou nn dawr el pass)

// router.get("/current", isAuth(), (req, res)=>{
//     res.send({user:req.user});
// })

// register

router.put("/:id",async (req,res)=>{
    try{
        const updateuser = await User.findOneAndUpdate(
            {_id: req.params.id},
            { $set: {...req.body}}
        );
        if(!updateuser){
            res.status(404).send("not found");
        }
        res.status(201).send({message: "user is updated"});

    }catch(error){
        res.status(500).send(error);
    }
});
router.post("/register", registerRules(), validation, controllers.register);

// login
router.post("/login", loginRules(), validation, controllers.login);

router.get("/current", isAuth(), controllers.current);


module.exports=router;


