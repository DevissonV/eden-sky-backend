import { Router } from 'express';
import employeeRoutes from './employee-routes.js';
import requestRoutes from './request-routes.js';
import userRoutes from './user-routes.js';
import testRoutes from './health-check-routes.js'

const apiRoutes = Router();

apiRoutes.use('/employees', employeeRoutes);
apiRoutes.use('/requests', requestRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/health-checks', testRoutes);

export default apiRoutes;

