import axios from "axios";
import { env } from "../config/env.js";

export async function getToken(): Promise<string> {
    const res = await axios.post(
        `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/token`
        , new URLSearchParams({
            grant_type: "client_credentials",
            client_id: env.CLIENT_ID!,
            client_secret: env.CLIENT_SECRET!,
            scope: "https://graph.microsoft.com/.default"
        })
        , { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return res.data.access_token;
}
