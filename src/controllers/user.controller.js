//user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res)=>{
    const {username,fullname,email,password} = req.body;
    console.log(username);

    if(
        [fullname,username,email,password].some((fields)=>
            fields?.trim() === ""
        )
    ){
        throw new ApiError(400,"All fields are require")
    }

    const existUser = User.findOne({$or : [{username},{email}]})

    if(existUser){
        throw new ApiError(409,"this user already exists")
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const CoverImgLocalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalPath){
        throw new ApiError(409,"Avtar is required")
    }

    const avtar = await uploadOnCloudinary(avtarLocalPath);
    const CoverImg = await uploadOnCloudinary(CoverImgLocalPath);

    if(!avtar){
        throw new ApiError(409,"Avatar is required")
    }

    const user = await User.create({
        fullname,
        avtar:avtar.url,
        coverImage:CoverImg?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await user.findById(user._id).select(
        "-password -refrshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering")
    }

    res.status(201).json(
        new ApiResponse(200,createdUser,"user created successfully11`   1")
    )
})

export {registerUser}