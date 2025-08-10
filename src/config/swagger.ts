import { env } from "../config/env.js";
import swaggerJSDoc from "swagger-jsdoc";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API PDFs SharePoint",
        version: "1.0.0",
        description: "Documentação da API que lista, obtém e retorna PDFs armazenados no SharePoint."
    },
    servers: [{
        url: `http://localhost:${env.PORT}`,
        description: "Servidor local"
    }],
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: [path.join(__dirname, "../routes/pdfRoute.*")],   // Caminho dos arquivos com anotações JSDoc
};

export const openapiSpecification = swaggerJSDoc(swaggerOptions);