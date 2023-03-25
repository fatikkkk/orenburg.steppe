import mongoose from "mongoose";

const GrantSchema = new mongoose.Schema(
    {
        url: {type:String, required:true},
        nameSite: {type:String, required:true},
        imgUrl:{type:String, default:''},
        name:{type:String, required:true},
        desc:{type:String, },
        financy:{type:String, default:"Финансирование отсутствует."},
        deadline:{type:String, default:"Сроки не известны"},
        tags : {type: Array},
    },
    {
        timestamps: true
    },
)

export default mongoose.model('Grant', GrantSchema)