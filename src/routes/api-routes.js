import { Router } from 'express';
import employeeRoutes from '../features/employees/api/employee-routes.js';
import requestRoutes from '../features/requests/api/request-routes.js';
import userRoutes from '../features/users/api/user-routes.js';
import healthCheckRoutes from '../features/health-checks/api/health-check-routes.js';

const apiRoutes = Router();

apiRoutes.use('/employees', employeeRoutes);
apiRoutes.use('/requests', requestRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/health-checks', healthCheckRoutes);

export default apiRoutes;
