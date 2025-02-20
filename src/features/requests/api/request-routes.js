import { Router } from 'express';
import requestController from '../controllers/request-controller.js';
import { authenticate, authorize } from '../../../core/middlewares/auth-middleware.js';
import { envs } from '../../../core/config/envs.js';

const router = Router();

router.get('/get-requests', authenticate, authorize([envs.ROLE_ADMIN, envs.ROLE_EMPLOYEE]), requestController.getAll);
router.get('/get-request/:id', authenticate, authorize([envs.ROLE_ADMIN, envs.ROLE_EMPLOYEE]), requestController.getById);
router.post('/create-request', authenticate, authorize([envs.ROLE_ADMIN]), requestController.create);
router.put('/update-request/:id', authenticate, authorize([envs.ROLE_ADMIN]), requestController.update);
router.delete('/delete-request/:id', authenticate, authorize([envs.ROLE_ADMIN]), requestController.delete);

export default router;
