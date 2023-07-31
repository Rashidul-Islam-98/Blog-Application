const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePic,{
      folder: "blogApp",
    })
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic:{
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) {return res.status(400).json("Wrong credentials!")};

    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated) {return res.status(400).json("Wrong credentials!")};

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
