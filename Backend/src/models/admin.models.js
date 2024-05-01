import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const adminSchema = new Schema(
  {
  
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    
    password:{
        type: String,
        required: [true , "Password is required"]
    },
    role: {
        type: String,
        default: 'user',
      },
    refreshToken:{
        type: String,
    }
  },
  {
    timestamps: true
  }
);

adminSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
})
// login
adminSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}
adminSchema.methods.generateAccessToken = function (){
   return jwt.sign(
        {
            _id: this._id,
        },
        "1LK3lo5hLOlpWgf/3LWtnrTja?ZAkZ3RrCJf2jL9FJ-nB2xyjKxYQbNWOJZSpV", {
            expiresIn:  "1d"
        }
    )
}
adminSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        "lpWgf/3LWtnrTja?ZAkZ3RrCJf2jL9FJ-nB2xyjKxYQ", {
            expiresIn:  "10d"
        }
    )
}

export const Admin = mongoose.model("Admin", adminSchema);
