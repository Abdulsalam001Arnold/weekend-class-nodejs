const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password"))
    return next();

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed
  next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
