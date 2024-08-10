import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    })
    
    // Upload an image

    const uploadOnCloudinary = async (localfilepath) =>{
        try {
            if(!localfilepath) return null
            //upload file on cloudinary
            const uploadResult = await cloudinary.uploader.upload(
                localfilepath, {
                    resource_type:"auto",
                  }
            ) //file has been uploaded successfully!
            console.log("file uploaded successfully",uploadResult);
            return uploadResult;
        } catch (error) {
            fs.unlinkSync(localfilepath) //remove localy saved temperary file as upload function fail
        }
    }

export {uploadOnCloudinary}