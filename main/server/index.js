import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cron from "node-cron"
import fileUpload from "express-fileupload"
import grantRoute from './routes/grants.js'
import { mainFunc } from "./parse/parse.js"

const app = express()
dotenv.config()

//  Constants
const PORT = process.env.PORT || 3002
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_CLUSTER = process.env.DB_CLUSTER
const DB_NAME = process.env.DB_NAME

//  Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))


//  Routes
// http://localhost:3001
app.use('/api/grants', grantRoute)


async function start(){
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.idnbxaz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
        
        app.listen(PORT, () =>{
            console.log(`server started on port ${PORT}`)
        })

        cron.schedule('0 0 */7 * *', () => {
            mainFunc()
            console.log('For check execute cron every 1 minute')
        })
    } catch (error) {
        console.log(error)
    }
}
start()

// sendData()

