import mongoose from "mongoose"

const Messageschema=new mongoose.Schema({
    conversationId:{
        type:String,
    },
    senderid:{
        type:String
    },
    message:{
        type:String,
    }

},{timestamps:true})

export default mongoose.model("Messages",Messageschema)