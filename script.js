const mongoose = require("mongoose");
const User = require("./User");
mongoose.connect("mongodb://localhost/testdb");

run();

async function run() {
  try {
    /*
    // method 1
    const user = new User({
      name: "Isaac",
      age: 27,
    });
    //  await user.save()
    //  console.log(user)

    // method 2
    const newUser = await User.create({
      name: "Another Isaac",
      age: 48,
      hobbies: ["studying, teaching"],
      address: {
        street: "main street",
        city: "zaria",
      },
      email: "Tanks@gee.com",
    });

    newUser.age = 25;
    await newUser.save();

    
    console.log(newUser);
    */
    const user = await User.findById("66e7f351565bcd913d6677d0");
    //mutating without using updates or replace
    user.hobbies = ["Word Study", "Prayer"];
    user.age = 6;
    await user.save();

    const nuser = await User.findById(
      "66e7db8406434b11011e02a9",
      "name age hobbies",
    );

    const oldUser = await User.findOneAndUpdate(
      {
        age: {
          $gt: 10,
        },
      },
      {
        $inc: { age: 1 },
        $set: {
          bestFriend: "66e7f351565bcd913d6677d0",
        },
      },
    );

    console.log(await oldUser.populate("bestFriend"));
  } catch (error) {
    console.log(error.message);
  }
}
