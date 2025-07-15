import { PORT } from '../config/env.ts';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API PDFs SharePoint',
        version: '1.0.0',
        description: 'Documentação da API que lista, obtém e retorna PDFs armazenados no SharePoint.'
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Servidor local'
        }
    ]
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts'],   // Caminho dos arquivos com anotações JSDoc
};

export const openapiSpecification = swaggerJSDoc(swaggerOptions);