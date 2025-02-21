import { Router } from 'express';
import employeeController from '../controllers/employee-controller.js';
import { authenticate, authorize } from '../../../core/middlewares/auth-middleware.js';
import { envs } from '../../../core/config/envs.js';

const router = Router();

router.get('/', authenticate, authorize([envs.ROLE_ADMIN, envs.ROLE_EMPLOYEE]), employeeController.getAll);
router.get('/:id', authenticate, authorize([envs.ROLE_ADMIN, envs.ROLE_EMPLOYEE]), employeeController.getById);
router.post('/', authenticate, authorize([envs.ROLE_ADMIN]), employeeController.create);
router.patch('/:id', authenticate, authorize([envs.ROLE_ADMIN]), employeeController.update);
router.delete('/:id', authenticate, authorize([envs.ROLE_ADMIN]), employeeController.delete);

export default router;
