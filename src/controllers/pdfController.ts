import express from 'express';
import type { Request, Response } from 'express';

export async function minhaFuncao(req: Request, res: Response) {
  res.send('Tudo certo!');
}

import { getDriveItems, getItemsInFolderById, getPdfById } from '../services/graphService.ts';

export async function listarConteudo(req: Request, res: Response) {
  try {
    const arquivos = await getDriveItems();
    res.json(arquivos);
  }
  catch (err: any) {
    debugger
    res.status(500).json({ error: 'Erro ao listar arquivos', details: err.message });
  }
}

export async function listarPorId(req: Request, res: Response): Promise<void> {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'ID da pasta é obrigatório' });
    return;
  }

  try {
    const itens = await getItemsInFolderById(id);
    res.json(itens);
  } catch (err: any) {
    console.error('Erro ao listar itens por ID:', err.message);
    res.status(500).json({ error: 'Erro ao buscar arquivos da pasta' });
  }
}

export async function baixarPdf(req: Request, res: Response): Promise<void> {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'ID é obrigatório' });
    return;
  }

  try {
    const pdfStream = await getPdfById(id as string);
    res.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(res);
  }
  catch (err: any) {
    res.status(500).json({ error: 'Erro ao baixar PDF', details: err.message });
  }
}