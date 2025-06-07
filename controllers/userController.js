const aysncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userm");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser =  aysncHandler(async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('hi');
    }

    const userAvailable = await UserActivation.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already available");
    }

    //hash password
    const hashP = await bcrypt.hash(password, 10);
    console.log("Hashed passowrd");
    const user = await User.create({
        username,
        email,
        password: hashP,
    });

    console.log(`user ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message:"Register me"})
});

//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser =  aysncHandler(async (req,res)=>{
    const {emai, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error();
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password ))){
        const accessToekn = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
        );
        res.status(200).json({accessToekn});
    }else{
        res.status(401);
        throw new Error("eamil or password not valid")
    }

});

//@desc Current user info
//@route POST /api/users/current
//@access private

const currentUser =  aysncHandler(async  (req,res)=>{
    res.json(req.user);
  
});











module.exports = {registerUser, loginUser, currentUser}