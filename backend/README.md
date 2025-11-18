# Professor Analytics - Backend

Backend API para el sistema de análisis de profesores.

## Desplegar en Render

### Opción 1: Desde el Dashboard de Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Crea un nuevo **Web Service**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name:** professors-backend (o el nombre que prefieras)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. Agrega las variables de entorno:
   - Click en "Environment" tab
   - Agrega:
     - `MONGODB_URI`: `mongodb+srv://jeancarlo:jean12345@cluster0.3ixvnnj.mongodb.net/ExamProfessors?retryWrites=true&w=majority&appName=Cluster0`
     - `PORT`: `3000` (Render lo asignará automáticamente, pero puedes dejarlo)

6. Click en "Create Web Service"

### Opción 2: Desde Git

1. Sube tu código a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

2. Sigue los pasos de la Opción 1

### Después del Deployment

1. Render te dará una URL como: `https://professors-backend.onrender.com`
2. Prueba el endpoint: `https://professors-backend.onrender.com/health`
3. Actualiza la URL del frontend para usar esta URL
4. Actualiza el CORS en `src/app.js` si es necesario:

```javascript
this.app.use(cors({
    origin: 'https://tu-frontend-en-vercel.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Testing en Producción

```bash
# Health check
curl https://tu-backend.onrender.com/health

# Get statistics
curl https://tu-backend.onrender.com/api/professors/statistics

# Get professors
curl https://tu-backend.onrender.com/api/professors/experience
```

## Importante

- Render puede poner tu servicio en "sleep" después de 15 minutos de inactividad en el plan free
- La primera request después del sleep puede tomar 30-60 segundos
- Para mantenerlo activo, considera usar un servicio de ping o actualizar a un plan pagado
