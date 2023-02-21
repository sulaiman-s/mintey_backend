const express = require("express");
const { User, validateUser } = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  if (!req.body.wallet_address)
    return res.status(400).send({ message: "Please enter a wallet address" });

  const { wallet_address } = req.body;

  try {
    let user = await User.findOne({ wallet_address });

    if (user) {
      const token = user.generateAuthToken();
      res.status(200).send({ access: token });
    } else {
      res.status(400).send({ message: "Please enter your email and username" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({message:err.message});
  }
});

router.post('/signup', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({message:error.details[0].message});
  
      const existingUsername = await User.findOne({username:req.body.username });
      const existingEmail = await User.findOne({email:req.body.email });
      if (existingUsername) {
        return res.status(409).send({ message: 'Username is alread taken' });
      }
      if (existingEmail) {
        return res.status(409).send({ message: 'Account with this email is already exist' });
      }
      const user = new User(req.body);
      await user.save();
  
      const token = user.generateAuthToken();
      return res.send({ access:token });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  });
  

module.exports = router;
