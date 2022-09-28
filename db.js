const mongoose=require('mongoose');
const mongoURI="mongodb+srv://Pranay:Pranay%402022@cluster0.w03fgse.mongodb.net/signup?retryWrites=true&w=majority";

//const mongoURI="mongodb://localhost:27017/signup";

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successfully");
    })
}
module.exports=connectToMongo;