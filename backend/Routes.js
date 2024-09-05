import express from 'express';
import * as userController from './controllers/user.controller.js';
import * as bookControler from './controllers/book.controller.js';
import { authenticateJWT } from './middleware/authmiddleware.js';

const router = express.Router();

router.post('/user/newuser', userController.createUser);
router.post('/user/login', userController.loginUser);
router.get('/user/profile/:id', authenticateJWT, userController.getUser);
router.get('/user/listusers', authenticateJWT, userController.getUsers);
router.patch('/user/update/:id', authenticateJWT, userController.updateUser);
router.delete('/user/delete/:id', authenticateJWT, userController.deleteUser);

router.get('/book/listbooks', authenticateJWT, bookControler.getBooks);
router.get('/book/:id', authenticateJWT, bookControler.getBookById);
router.post('/book/newbook', authenticateJWT, bookControler.createBook);
router.patch('/book/update/:id', authenticateJWT, bookControler.updateBook);
router.delete('/book/delete/:id', authenticateJWT, bookControler.deleteBook);

export default router;
