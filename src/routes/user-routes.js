import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';
import { envs } from '../config/envs.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/delete',authenticate, authorize([envs.ROLE_ADMIN]), userController.delete);

export default router;
