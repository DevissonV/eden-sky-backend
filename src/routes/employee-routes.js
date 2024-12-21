import { Router } from 'express';
import employeeController from '../controllers/employee-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';

const router = Router();

router.get('/get-employees', authenticate, authorize(['admin', 'employee']), employeeController.getAll);
router.get('/get-employee/:id', authenticate, authorize(['admin', 'employee']), employeeController.getById);
router.post('/create-employee', authenticate, authorize(['admin']), employeeController.create);
router.put('/update-employee/:id', authenticate, authorize(['admin']), employeeController.update);
router.delete('/delete-employee/:id', authenticate, authorize(['admin']), employeeController.delete);

export default router;
