import {Router} from 'express'
import {createGrant, getAll, removeGrants } from '../controllers/grants.js'
// import {getParse } from '../controllers/grants.js'

const router = new Router()

//  Get all grant
//  http://localhost:3001/api/grants
router.get('/', getAll)

//  Create grant
//  http://localhost:3001/api/grants/createGrant
router.post('/createGrant', createGrant)

//  Delete all grants
//  http://localhost:3001/api/grants
router.delete('/removeGrants', removeGrants)



export default router