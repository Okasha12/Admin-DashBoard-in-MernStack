import mongoose from "mongoose";
// import { DB_NAME } from "../../constants.js";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://Api:yfAZMGdAJCAvrIH6@cluster0.0sakhmu.mongodb.net/Products`)
        console.log(`MongoDb Connection Successful ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MONGODB connection ERROR: ', error );
        process.exit(1);
    }
}
export default connectDB;