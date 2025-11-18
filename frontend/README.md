# Professor Analytics - Frontend

Frontend del sistema de análisis de profesores.

## Desplegar en Vercel

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Inicia sesión:
```bash
vercel login
```

3. Despliega:
```bash
vercel
```

4. Producción:
```bash
vercel --prod
```

## Configuración

Después del deployment, actualiza la URL del backend en `app.js`:

```javascript
const CONFIG = {
    API_URL: 'https://tu-backend-en-render.com/api',
    // ...
};
```
