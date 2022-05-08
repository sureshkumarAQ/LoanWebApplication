const {User,PanCard,Aadhar,SalarySlip} = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create and save new Driver

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

exports.Register= async(req,res)=>{
    //Validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    // Store all data in user object
    const user = await new User({
        username:req.body.username,
        password:req.body.password,
    })

     // zwt create a new tokken
     const token =  jwt.sign({id:user._id},process.env.JWT_SECRET);
     //save user token
     user.token = token;

    // Save user in the database
    await user.save(user).then(data=>{
        res.status(201).send(data)
        // res.redirect('/user/login');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occurred while creating a a new account"
        });
    });
}

// Login user
exports.Login = async (req,res)=>{


    //get user data
    try {

        //Validate request
        if(!req.body)
        {
            res.status(400).send({message:"Fill email and password"});
            return;
        }

        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password)
           return res.status(406).send({err:"Not all field have been entered"});

        // Check if user is already exist or not
        const user = await User.findOne({username});
        if(!user)
        {
            return res.status(406).send({err:"No account with this email"});
        }
        // Compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
           return res.status(406).send({err:"Invalid Credentials"});
 
        // zwt create a new tokken
       const token =  jwt.sign({id:user._id},process.env.JWT_SECRET);
       //save user token
       user.token = token;

       //Store jwt-token in cookie
       res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+10*24*60*60*1000),
           httpOnly:true
       })

        res.send({token});
        // res.redirect('/driver');
        
    } catch (err) {
        res.status(500).send("Error while Login")
    }
}


exports.uploadAdhar= async(req,res)=>{
   try {

    const userID = req.user._id;
    const aadhar = await new Aadhar({
        aadhar:req.file,
        user:userID,
    })
    // console.log(req.file);
    await aadhar.save(aadhar).then(data=>{
        res.status(201).send(data)
        // res.redirect('/user/login');
    })
      
   } catch (error) {
    res.status(400).send(error.message);
   }
}
exports.uploadPan= async(req,res)=>{
    try {
        const userID = req.user._id;
        const pancard = await new PanCard({
            pancard:req.file,
            user:userID,
        })
        // console.log(req.file);
        await pancard.save(pancard).then(data=>{
        res.status(201).send(data)
        // res.redirect('/user/login');
    })
    } catch (error) {
     res.status(400).send(error.message);
    }
}

exports.uploadSalarySlips = async(req,res)=>{
    try {
        const userID = req.user._id;

        let slipsArray = [];
        req.files.forEach(element => {
            const slip = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            slipsArray.push(slip);
        });


        const salaryslips = await new SalarySlip({
            slips:slipsArray,
            user:userID,
        })
        // console.log(req.file);
        await salaryslips.save(salaryslips).then(data=>{
        res.status(201).send(data)
        // res.redirect('/user/login');
    })
    } catch (error) {
     res.status(400).send(error.message);
    }
}

