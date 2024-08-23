import express from 'express';
import * as userController from './controllers/user.controller.js'
import * as bookControoler from './controllers/book.controller.js'
import { authenticateJWT } from './middleware/authmiddleware.js';

const router = express.Router();

router.post('/user/newuser', userController.createUser)
router.post('/user/login', userController.loginUser)

router.get('/user/profile',authenticateJWT, userController.userProfile )
router.get('/user/listusers', authenticateJWT, userController.getUsers)


router.post('/book/newbook', authenticateJWT, bookControoler.createBook)
router.get('/book/listbooks', authenticateJWT, bookControoler.getBooks)
router.get('/book/:id', authenticateJWT, bookControoler.getBookById);
export default router;