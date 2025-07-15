import axios from 'axios';
import { getToken } from './authService.ts';
import { DRIVE_ID } from '../config/env.ts';

export async function getDriveItems() {
  const token = await getToken();
  const res = await axios.get(
    `https://graph.microsoft.com/v1.0/drives/${DRIVE_ID}/root/children`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.value;
}

export async function getItemsInFolderById(folderId: string) {
  const token = await getToken();
  const res = await axios.get(
    `https://graph.microsoft.com/v1.0/drives/${DRIVE_ID}/items/${folderId}/children`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data.value;
}

export async function getPdfById(id: string) {
  const token = await getToken();
  const res = await axios.get(
    `https://graph.microsoft.com/v1.0/drives/${DRIVE_ID}/items/${id}/content`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'stream'
    }
  );
  return res.data;
}
