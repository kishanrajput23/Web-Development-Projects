const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');  
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'meispero';

// Create a user using : POST 'api/auth/createuser'. Doesn't require Auth.
router.post('/createuser', async (req, res)=>{

      let success = false;
      // Unique email check
      try{
      let user = await User.findOne({email:req.body.email});
      if(user){
        success = false;
        return res.status(400).json({success, error:"An account with this email already exists!"});
      }

      success = true;
      
      const salt = await bcrypt.genSalt(10);  
      const  secPass = await bcrypt.hash(req.body.password, salt);  

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // JWT
      const data = {
        user:{
          id:user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success, authToken});

    } catch(error){
      success = false;
      console.error(error.message);
      res.status(500).send(success, "Some error occured!")
    }
})

// Authenticate a user using : POST 'api/auth/login'. Doesn't require Auth.
router.post('/login', async (req, res)=>{
  let success = false;
  const {email, password} = req.body;
  try{
    // Account existence 
    let user = await User.findOne({email:req.body.email});
    if(!user){
      success = false;
      return res.status(400).json({success, error:"Invalid credentials!"});
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);  
    if(!passwordCompare){
      success = false;
      return res.status(400).json({success, error:"Invalid credentials!"});
    }
    
    const payload = {
      user:{
        id:user.id
      }
    }

    const authToken = jwt.sign(payload, JWT_SECRET);
    console.log(authToken);
    success = true;
    res.json({success, authToken});

  } catch(error){
    success = false;
    console.error(error.message);
    res.status(500).send(success, "Some error occured!")
  }

})

// Get a user using : POST 'api/auth/getuser'. Requires Auth.
router.get('/getuser',fetchuser, async (req, res)=>{
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured!")
  }
})

module.exports = router