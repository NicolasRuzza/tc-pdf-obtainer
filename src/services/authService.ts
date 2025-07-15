import axios from 'axios';
import { TENANT_ID, CLIENT_ID, CLIENT_SECRET } from '../config/env.ts';

export async function getToken(): Promise<string> {
  const res = await axios.post(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`
    , new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      scope: 'https://graph.microsoft.com/.default'
    })
    , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return res.data.access_token;
}
