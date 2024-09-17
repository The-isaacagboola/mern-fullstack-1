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
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: addressSchema,
});

// Methods
userSchema.methods.sayHi = function () {
  console.log("My name is", this.name);
};

// static method to be used on the model itself
userSchema.statics.findByName = function (name) {
  // return this.where("name").equals(name); // works fine; to use regular expressions, see below

  return this.find({ name: new RegExp(name, "i") }); // you can also use this.where(condition) in place of find
};

//  using mongoose queries; we also have;
userSchema.query.byName = function (name) {
  return this.where("name").equals(name);
};

// Virtual method: this applies the method virtually-without touching the original schema

userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// userSchema.pre("save", function (next) {
//   //to update the updatedAt time of the user before saving it and moving on
//   this.updatedAt = Date.now();
//   next();
// });

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});
module.exports = mongoose.model("User", userSchema);
