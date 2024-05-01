import dotenv from 'dotenv'
import connectDB from "./src/db/index.js";
import {app} from "./app.js"


dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(3000, ()=>{
        console.log(`Server is running at port : ${3000}`);
    })
})
.catch((err)=>{
    console.log("MongoDb connection error!! " ,err)
})