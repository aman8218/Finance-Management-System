const mongoose=require('mongoose');


const connectDB  = async ()=>{
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected.")
    }
    catch(error)
    {
        console.log('DB Connection Error', error);
    }
}
module.exports = connectDB