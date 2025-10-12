# TcPdfViewer

## Docker container

```bash
sudo docker run -d \
  --name tc-pdf-obtainer \
  -p 3000:3000 \
  -e TENANT_ID='' \
  -e CLIENT_ID='' \
  -e CLIENT_SECRET='' \
  -e SITE_URL='' \
  -e DRIVE_ID='' \
  -e FRONTEND_URL='' \
  tc-pdf-obtainer:latest
```
