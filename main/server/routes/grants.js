import {Router} from 'express'
import {createGrant, getAllGrants, removeGrants } from '../controllers/grants.js'

const router = new Router()

//  Get all grant
//  http://localhost:3001/api/grants
router.get('/', getAllGrants)

//  Create grant
//  http://localhost:3001/api/grants/createGrant
router.post('/createGrant', createGrant)

//  Delete all grants
//  http://localhost:3001/api/grants/removeGrants
router.delete('/removeGrants', removeGrants)



export default router