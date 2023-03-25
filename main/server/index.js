import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cron from "node-cron"
import fileUpload from "express-fileupload"
import grantRoute from './routes/grants.js'
import productRoute from './routes/product.js'
import userRoute from './routes/users.js'
import { mainFunc } from "./parse/parse.js"
import errorMiddleware from './middleware/error.js'
import cookieParser from "cookie-parser"

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
app.use(errorMiddleware)
app.use(cookieParser())


//  Routes
// http://localhost:3001/api/grants
app.use('/api/grants', grantRoute)

// http://localhost:3001/api/product
app.use('/api/product', productRoute)

// http://localhost:3001/api/user
app.use('/api/user', userRoute)


async function start(){
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.idnbxaz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
        console.log('Server connected with DataBase!')
        app.listen(PORT, () =>{
            console.log(`server started on port ${PORT}`)
        })

        //mainFunc()

        // cron.schedule('0 0 */7 * *', () => {
        //     mainFunc()
        //     console.log('For check execute cron every 1 minute')
        // })
    } catch (error) {
        console.log(error)
    }
}
start()

// sendData()

