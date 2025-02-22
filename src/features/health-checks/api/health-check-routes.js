import { Router } from 'express';
import {
  testResponseSuccess,
  testResponseError,
} from '../controllers/health-check-controller.js';

const router = Router();

router.get('/test-response-success', testResponseSuccess);
router.get('/test-response-error', testResponseError);

export default router;
