import { Router } from 'express'
import { loginUser, registerUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, deleteUser, updateRole } from '../controllers/users.js'
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

//  Get All Users   -   Admin
//  http://localhost:3001/api/user/users
router.get('/users', isAutheticantedUser, authorizeRoles('admin'), getAllUsers)

//  Get Single User   -   Admin
//  http://localhost:3001/api/user/:id
router.get('/:id', isAutheticantedUser, authorizeRoles('admin'), getSingleUser)

//  Update User Role
//  http://localhost:3001/api/user/:id
router.put('/:id', isAutheticantedUser, authorizeRoles('admin'), updateRole)

//  Delete User
//  http://localhost:3001/api/user/:id
router.delete('/:id', isAutheticantedUser, authorizeRoles('admin'), deleteUser)


export default router