import mongoose from "mongoose"


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    Firstname:{
        type:String,
        required:true,
    },
    Lastname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    friends:{
        type:Array,
        default:[]
    },
    friendrequest:{
        type:Array,
        default:[]
    },
    requestSent:{
        type:Array,
        default:[]
    },
    profileImg:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
export default mongoose.model("Users",UserSchema)
