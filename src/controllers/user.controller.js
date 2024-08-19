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

    const existUser = await User.findOne({$or : [{username},{email}]})

    if(existUser){
        throw new ApiError(409,"this user already exists")
    }

    let avtarLocalPath;
    if(req.files && Array.isArray(req.files.avtar) && req.files.avtar.length>0){
        avtarLocalPath = req.files.avtar[0].path;
    }

        if(!avtarLocalPath || avtarLocalPath===null){
            throw new ApiError(409,"Avtar is required")
        }

    const avatar = await uploadOnCloudinary(avtarLocalPath);

    if(!avatar){
        throw new ApiError(409,"Avatar is required")
    }

    let CoverImgLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        CoverImgLocalPath = req.files.coverImage[0].path;
    }
    const CoverImg = await uploadOnCloudinary(CoverImgLocalPath);

    const user = await User.create({
        fullname,
        avtar:avatar.url,
        coverImage:CoverImg?.url||null,
        email,
        password,
        username:username.toLowerCase()
    })

    // const createdUser = await user.findById(user._id).select(
    //     "-password -refrshToken"
    // )

    // if(!createdUser){
    //     throw new ApiError(500,"Something went wrong while registering")
    // }

    res.status(201).json(
        new ApiResponse(200,"user created successfully")
    )
})

export {registerUser}