import { Router } from 'express'
import { loginUser, registerUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile } from '../controllers/users.js'
import { isAutheticantedUser, authorizeRoles } from '../middleware/auth.js'

const router = new Router()


//  Register User
//  http://localhost:3001/api/user/register
router.post('/register', registerUser)

//  Login User
//  http://localhost:3001/api/user/login
router.post('/login', loginUser)

//  Logout User
//  http://localhost:3001/api/user/logout
router.get('/logout', logoutUser)

//  Forgot Password
//  http://localhost:3001/api/user/password/forgot
router.post('/password/forgot', forgotPassword)

//  Reset Password
//  http://localhost:3001/api/user/password/reset/:token
router.put('/password/reset/:token', resetPassword)

//  Get User Detail
//  http://localhost:3001/api/user/me
router.get('/me', isAutheticantedUser, getUserDetails)

//  Update Password
//  http://localhost:3001/api/user/password/update
router.put('/password/update', isAutheticantedUser, updatePassword)

//  Update Profile
//  http://localhost:3001/api/user/me/update
router.put('/me/update', isAutheticantedUser, updateProfile)


export default router