import mongoose from "mongoose";

const GrantArchiveSchema = new mongoose.Schema(
    {
        url: {type:String, },
        nameSite: {type:String, },
        imgUrl:{type:String, },
        name:{type:String, },
        desc:{type:String, },
        financy:{type:String, },
        deadline:{type:String, },
    },
    {
        timestamps: true
    },
)

export default mongoose.model('GrantArchive', GrantArchiveSchema)