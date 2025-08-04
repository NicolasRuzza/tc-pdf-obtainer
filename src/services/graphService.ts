import axios from "axios";
import axiosRetry from "axios-retry";
import { getToken } from "./authService.ts";
import { env } from "../config/env.ts";

axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

export async function getDriveItems() {
    const token = await getToken();

    const res = await axios.get(
        `https://graph.microsoft.com/v1.0/drives/${env.DRIVE_ID}/root/children`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return res.data.value;
}

export async function getItemsInFolderById(folderId: string) {
    const token = await getToken();
  
    const res = await axios.get(
        `https://graph.microsoft.com/v1.0/drives/${env.DRIVE_ID}/items/${folderId}/children`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return res.data.value;
}

export async function getPdfById(pdfId: string) {
    const token = await getToken();

    const resRedirect = await axios.get(
        `https://graph.microsoft.com/v1.0/drives/${env.DRIVE_ID}/items/${pdfId}/content`,
        {
            headers: { Authorization: `Bearer ${token}` },
            maxRedirects: 0,
            validateStatus: status => status === 302 // Não deixa seguir automaticamente
        }
    );

    const redirectUrl = resRedirect.headers.location;
    if (!redirectUrl) {
        throw new Error("Link de redirecionamento não encontrado");
    }

    try {
        const pdfResponse = await axios.get(redirectUrl, {
            responseType: "arraybuffer",
            timeout: 10000,
        });

        const buffer = Buffer.from(pdfResponse.data);
        return buffer.toString("base64");
    }
    catch (err: any) {
        console.error("Erro ao baixar PDF: ", err.message || err);
        throw new Error(`Erro ao baixar PDF: ${err.message || "Erro desconhecido"}`);
    }
}