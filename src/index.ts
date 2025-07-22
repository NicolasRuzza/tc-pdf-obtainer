import express from "express";
import cors from "cors";
import { env } from "./config/env.ts";
import pdfRoutes from "./routes/pdfRoute.ts";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "./config/swagger.ts";

const app = express();
app.use(cors({
    origin: env.FRONTEND_URL,
    methods: ["GET"],
}));
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api/pdf", pdfRoutes);

app.listen(env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${env.PORT}/api/pdf`);
    console.log(`🔎 Swagger disponível em http://localhost:${env.PORT}/api/docs`);
});