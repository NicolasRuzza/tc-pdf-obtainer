import express from 'express';
import { PORT } from './config/env.ts';
import pdfRoutes from './routes/pdfRoute.ts';
import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from './config/swagger.ts';

const app = express();
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use('/api/pdf', pdfRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`🔎 Swagger disponível em http://localhost:${PORT}/api/docs`);
});