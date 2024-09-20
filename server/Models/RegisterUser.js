const mongoose = require('mongoose')

const RegisterUser = new mongoose.Schema({
    name : {type : String , required : true},
    username : {type:String , required : true  ,unique : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    about : {type:String},
    DP : {type:String}
   })

const user = mongoose.model('Users' ,RegisterUser)
module.exports = user