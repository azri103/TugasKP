import { Hono } from 'hono';
import modbusRoutes from './routes/modbusRoutes';
import docsRoutes from './routes/docsRoutes';

const app = new Hono();

app.route('/', docsRoutes);
app.route('/api', modbusRoutes);

export default app;
