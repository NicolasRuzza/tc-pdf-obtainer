import express from 'express';
import { listarConteudo, baixarPdf, listarPorId } from '../controllers/pdfController.ts';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: Endpoints para buscar e listar PDFs
 */

/**
 * @swagger
 * /api/pdf/listar:
 *   get:
 *     summary: Lista arquivos na raiz do SharePoint
 *     tags: [PDF]
 *     responses:
 *       200:
 *         description: Lista de arquivos
 *       500:
 *         description: Erro ao buscar arquivos
 */

router.get('/listar', listarConteudo);

/**
 * @swagger
 * /api/pdf/listar-por-id:
 *   get:
 *     summary: Lista arquivos e subpastas dentro de uma pasta do SharePoint usando o ID da pasta
 *     tags: [PDF]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da pasta no SharePoint
 *     responses:
 *       200:
 *         description: Lista de arquivos e subpastas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do item
 *                   name:
 *                     type: string
 *                     description: Nome do item (arquivo ou pasta)
 *                   folder:
 *                     type: object
 *                     nullable: true
 *                   file:
 *                     type: object
 *                     nullable: true
 *       400:
 *         description: ID da pasta não fornecido
 *       500:
 *         description: Erro ao buscar conteúdo
 */

router.get('/listar-por-id', listarPorId);

/**
 * @swagger
 * /api/pdf/baixar:
 *   get:
 *     summary: Baixa o PDF pelo ID
 *     tags: [PDF]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do arquivo no SharePoint
 *     responses:
 *       200:
 *         description: Arquivo PDF
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: ID ausente
 *       500:
 *         description: Erro no download
 */
router.get('/baixar', baixarPdf);

export default router;