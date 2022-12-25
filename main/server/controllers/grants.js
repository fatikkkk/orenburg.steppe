import Grant from '../models/Grant.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

//  Get All Grants
export const getAll = async (req,res) => {
    try {
        const grants = await Grant.find().sort('-createdAt')
        if(!grants){
            return res.json({message: "No grants"})
        }
        res.json({grants})
    } catch (error) {
        console.log(error)
        res.json({message: "Error"})
    }
}

//  Create Grant
export const createGrant = async (req,res) => {
    try {
        
        const {url, nameSite, imgUrl, name, desc, financy, deadline} = req.body
        const newGrant = new Grant({
            url,
            nameSite,
            imgUrl,
            name,
            desc,
            financy,
            deadline,
        })
        await newGrant.save()
        console.log('Send data from controller')
        return res.json(newGrant)
        
    } catch (error) {
        console.log(error)
        res.json({message: error})
    }
}

export const removeGrants = async (req, res) =>{
    try {
        const grants = await Grant.deleteMany()
        res.json({message: 'All grant has been deleted'})
    } catch (error) {
        res.json({message: 'Something went wrong'})
    }
}


// url: {type:String, required:true},
// nameSite: {type:String, required:true},
// imgUrl:{type:String, default:''},
// name:{type:String, required:true},
// desc:{type:String, },
// financy:{type:String, default:"Финансирование отсутствует."},
// deadline:{type:String, default:"Сроки не известны"},