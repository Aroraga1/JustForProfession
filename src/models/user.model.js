import mongoose,{Schema} from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        // required:true,
        lowercase:true,
        trim:true,
        index:true
    },fullname:{
        type:String,
        unique:true,
        // required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        unique:true,
        // required:true,
        lowercase:true,
        trim:true,
    },
    avtar:{
        type:String,
        // required:true,
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        // required:[true,'Password is required']
    },
    refrshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    const AccesToken = await jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRY
    }
)
return AccesToken;
}
userSchema.methods.generateRefreshToken = async function(){
    const RefreshToken = await jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
    return RefreshToken;
}

export const User = mongoose.model("User",userSchema)