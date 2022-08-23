const  mongoose=require('mongoose')
mongoose.connect(`mongodb+srv://satyam:satyam123@cluster0.pxfed.mongodb.net/student?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Connected")
})
.catch(()=>{
    console.log("fail")
})