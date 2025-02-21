import { Router } from 'express';
import requestController from '../controllers/request-controller.js';
import { authenticate, authorize } from '../../../core/middlewares/auth-middleware.js';
import { envs } from '../../../core/config/envs.js';

const router = Router();

router.get('/', authenticate, authorize([envs.ROLE_ADMIN, envs.ROLE_EMPLOYEE]), requestController.getAll);
router.get('/:id', authenticate, authorize([envs.ROLE_ADMIN, envs.ROLE_EMPLOYEE]), requestController.getById);
router.post('/', authenticate, authorize([envs.ROLE_ADMIN]), requestController.create);
router.patch('/:id', authenticate, authorize([envs.ROLE_ADMIN]), requestController.update);
router.delete('/:id', authenticate, authorize([envs.ROLE_ADMIN]), requestController.delete);

export default router;
