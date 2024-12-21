import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/delete',authenticate, authorize(['admin']), userController.delete);

export default router;
