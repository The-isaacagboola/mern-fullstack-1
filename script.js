const mongoose = require('mongoose')
const User = require ("./User")
mongoose.connect("mongodb://localhost/testdb");

const user =  new User({
    name: 'isaac',
    age : 27
})

run();

async function run(){
     await user.save()
     console.log(user)
}

