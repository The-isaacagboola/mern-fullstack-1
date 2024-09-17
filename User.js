const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 65,
    validate: {
      // validation only works if you use create or save methods
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  // to ensure that a field is required, we achieve this as in email below
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 10,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: addressSchema,
});

module.exports = mongoose.model("User", userSchema);
