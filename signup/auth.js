const express = require('express');
const User = require('../info/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var fetchuser = require('../middle/fetchuser');

var jwt = require('jsonwebtoken');
// var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Pranay$oy';

router.post('/signup', [


   body('email', 'Enter a valid email').isEmail(),


], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).json({ error: "Email already exist" })
   }
   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password, salt)
   user = await User.create({
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      password: secPass,
      country: req.body.country,
      phone: req.body.phone,
      role: req.body.role,
   });
   const data = {
      user: {
         id: user.id
      }
   }

  
   const authtoken = jwt.sign(data, JWT_SECRET);
   res.json({ authtoken })
   
})



router.post('/login', [


   body('email', 'Enter a valid email').isEmail(),
   body('password', 'enter valid password').exists(),
   body('role'),


], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { email, password, role } = req.body;

   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "login with correct creds" })
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         return res.status(400).json({ error: "login with correct creds" })

      }

      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken })
   } catch (error) {
      console.log(error.message)
      res.status(500).send("Some server error occured");

   }
})



router.post('/getuser', fetchuser, async (req, res) => {
   try {
      userid = req.user.id;
      const user = await User.findById(userid).select("-password")
      res.send(user)
   } catch (error) {
      console.log(error.message)
      res.status(500).send("Some server error occured");
   }
})
module.exports = router