import express from 'express';
import cors from 'cors';
import { envs } from './src/config/envs.js';
import { corsOptions } from './src/config/cors-options.js';
import apiRoutes from './src/routes/api-routes.js';

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(envs.APP_PORT, () => {
  console.log(`Server running on port ${envs.APP_PORT}`);
});

export default app;
