const mongoose =require('mongoose')

 const connectDb = async() => {

   try {
       await mongoose.connect("mongodb://127.0.0.1:27017/chennaitask")
        console.log(' db connected successfully')
       
    
   } catch (error) {
    console.log(error,'db error')
   }


}

module.exports =connectDb;
