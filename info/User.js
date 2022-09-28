const mongoose = require('mongoose');

const { Schema } = mongoose;

const USerSchema = new Schema({
    firstname:{
        type:String,
       required:true
    },

    middlename:{
        type:String,
       required:true
    },

    lastname:{
        type:String,
       required:true
    },


    email:{
        type:String,
        required:true,
        unique:true
    },

   password :{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
         
    },
    phone:{
        type:String,
        required:true
         
    },

    role:{
        type:String,
        required:true
         
    },

  
});
const User=mongoose.model('user',USerSchema)
User.createIndexes();
module.exports = User;

// mongoose.model need a model name here is user and schema name ie USerSchema