import { Router } from 'express';
import requestController from '../controllers/request-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';

const router = Router();

router.get('/get-requests', authenticate, authorize(['admin', 'employee']), requestController.getAll);
router.get('/get-request/:id', authenticate, authorize(['admin', 'employee']), requestController.getById);
router.post('/create-request', authenticate, authorize(['admin']), requestController.create);
router.put('/update-request/:id', authenticate, authorize(['admin']), requestController.update);
router.delete('/delete-request/:id', authenticate, authorize(['admin']), requestController.delete);

export default router;
