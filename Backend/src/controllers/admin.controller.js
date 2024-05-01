import { asyncHandlder } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (adminId) => {
    try {
      
      const admin = await Admin.findById(adminId);
  
      const accessToken = await admin.generateAccessToken();
      const refreshToken = await admin.generateRefreshToken();

      // console.log(accessToken, refreshToken);
  
      admin.refreshToken = refreshToken;
      await admin.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };

    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access token"
      );
    }
  };

  const adminLogin = asyncHandlder(async (req, res) => {
    const { email, password } = req.body;
    console.log(email , password)

    if (!email) {
      throw new ApiError(400, "Email  are required");
    }
    //-------Check User through Email or Username
  if(!(email == "admin@gmail.com")){
    return res.status(401).json({ message: "admin login failed" });
  }

  if(!(password === "123")){
    return res.status(404).json({ message: "invalid crediential" });
    
  }

  const admin = await Admin.findOne({
    $or: [
      { email },
      {password }
    ],
  });

  if (!admin) {
    throw new ApiError(404, "Admin does not exit");
  }

    
    //-------Send Token through cookies
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      admin._id
    );
//   samajhna
    const loggedIn = await Admin.findById(admin._id).select(
      //Remove password and refreshToken
      "-password -refreshToken"
    );
  
  // console.log(admin)
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            admin: loggedIn,
            accessToken,
            refreshToken,
          },
          "Admin Logged in successfully"
        )
      );
  });

  export {adminLogin};