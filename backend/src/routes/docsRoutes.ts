import { Hono } from 'hono';

const docsRoutes = new Hono();

docsRoutes.get('/', (c) => {
  return c.json({
    message: 'API Documentation',
    routes: {
      'GET /api': 'Tampilkan semua data modbus',
      'GET /api/limit/10': 'Tampilkan data modbus dengan limit',
      'GET /api/today': 'Tampilkan data modbus hari ini',
      'GET /api/minute/5': 'Tampilkan data modbus menit terakhir',
      'GET /api/range?start=YYYY-MM-DD&end=YYYY-MM-DD': 'Tampilkan data modbus berdasarkan rentang tanggal',
    }
  });
});

export default docsRoutes;
