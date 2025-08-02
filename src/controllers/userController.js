const userModel = require("../models/userSchema");
const profileModel = require("../models/profileSchema")
const bcrypt = require("bcryptjs");
const userValidation = require("../validators/userSchemaValidate");
const loginValidation = require("../validators/loginValidator");
const {uploadToCloudinary} = require('../utils/cloudinaryUpload')

const { generateToken } = require("../utils/generateToken");

const createUser = async (req, res) => {
  try {
    const { username, email, password, bio, age } = req.body;
    let profilePictureUrl = ''
    const { error } = userValidation.validate({ username, email, password, bio, age });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    if(req.file){
      profilePictureUrl = await uploadToCloudinary(req.file.buffer)
    }

    const newProfile = await profileModel.create({
        bio,
        age,
        profilePicture: profilePictureUrl
    })

    if (username !== "" && email !== "" && password !== "") {
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      } else {
        const newUser = await userModel.create({
          username,
          email,
          password,
        profilePicture: profilePictureUrl,
          profile: newProfile?.id
        });

        res.status(201).json({
          status: "success",
          statusCode: 201,
          message: "User and profile created successfully.",
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            profile: newProfile
            
          },
          token: generateToken(newUser._id),
        });
      }
    }
  } catch (err) {
    console.error("Error has ocuured:", err);
    res.status(500).json({
      status: "failed",
      statusCode: 500,
      message: "An error occurred while creating user",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation.validate({ email, password });
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      message: error.details[0].message,
    });
  }

  try {

    if (email !== "" && password !== "") {
      const exist = await userModel.findOne({ email });

      if (!exist) {
        res.status(404).json({
          message: "User not found, please create an account",
          statusCode: 404,
        });
      }

      const isMatch = await bcrypt.compare(password, exist.password);
      if (!isMatch) {
        res.staus(400).json({
          error: "Invalid Credentials",
          message: "Email or password incorrect!",
        });
      }
      res.status(200).json({
        id: exist._id,
        username: exist.username,
        email: exist.email,
        token: generateToken(exist._id),
      });
    }
  } catch (err) {
    console.error("Error has occured:", err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAll = async (req, res) => {
    try{
        const users = await userModel.find()
        if(users){
            res.status(200).json({
                data: users,
                message: 'Users fetched successfully!'
            })
        }else{
            res.status(404).json({
                message: 'Users No users found.'
            })
        }
        
    }catch(err){
        console.error(err)
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}

module.exports = { createUser, login, getAll };
