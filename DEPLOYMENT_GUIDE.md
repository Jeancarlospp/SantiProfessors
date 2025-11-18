# 🎓 Professor Analytics Dashboard - Guía Completa

## ✅ Proyecto Completado

Se ha creado exitosamente un sistema completo de análisis de profesores con:
- ✅ Backend Node.js con arquitectura limpia y POO
- ✅ Frontend HTML/CSS/JS con diseño empresarial moderno
- ✅ Conexión a MongoDB Atlas
- ✅ Lógica de negocio implementada
- ✅ Archivos de deployment preparados

---

## 🚀 Cómo Probar Localmente

### Paso 1: Iniciar Backend

```bash
# Abrir terminal 1
cd "c:\Users\Sjean\Desktop\Universidad ESPE\Quinto Semestre Ing.Software\Web Avanzada\SantiExam\backend"
npm start
```

Deberías ver:
```
✅ Conectado exitosamente a MongoDB
📦 Base de datos: ExamProfessors
✅ Servidor corriendo en puerto 3000
```

### Paso 2: Abrir Frontend

Simplemente abre el archivo en tu navegador:
```
c:\Users\Sjean\Desktop\Universidad ESPE\Quinto Semestre Ing.Software\Web Avanzada\SantiExam\frontend\index.html
```

O desde PowerShell:
```bash
cd "c:\Users\Sjean\Desktop\Universidad ESPE\Quinto Semestre Ing.Software\Web Avanzada\SantiExam\frontend"
start index.html
```

### Paso 3: Verificar Funcionamiento

Deberías ver:
- ✅ Indicador de conexión en verde
- ✅ 4 tarjetas de estadísticas con datos
- ✅ Top 5 profesores mejor pagados
- ✅ Estadísticas por departamento
- ✅ Profesores más experimentados
- ✅ Tabla completa de profesores

---

## 📊 Lógica de Negocio Implementada

### 1. Cálculo de Experiencia
```javascript
experiencia = añoActual - añoContratación
// Ejemplo: 2025 - 2003 = 22 años
```

### 2. Estadísticas por Departamento
- Promedio de salario por departamento
- Conteo de profesores por departamento
- Total de cursos por departamento

### 3. Rankings
- Top 5 mejores salarios (ordenado descendente)
- Top 5 más experimentados (ordenado por años)

### 4. Métricas Generales
- Salario promedio global
- Experiencia promedio global
- Rango salarial (min/max)
- Total de profesores y departamentos

---

## 🎨 Características del Diseño

### Colores
- **Principal:** #8B1538 (Concho de vino)
- **Secundario:** #1A1A1A (Negro profundo)
- **Acentos:** #2C2C2C (Gris oscuro)

### Características
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves
- ✅ Estados de carga y error
- ✅ Hover effects en tarjetas
- ✅ Scrollbar personalizada
- ✅ Iconos SVG personalizados

---

## 🏗️ Arquitectura del Backend

```
Capas (Clean Architecture):
┌─────────────────────────────────┐
│  Presentation Layer             │
│  (Controllers, Routes)          │
├─────────────────────────────────┤
│  Business Logic Layer           │
│  (Services)                     │
├─────────────────────────────────┤
│  Data Access Layer              │
│  (Repositories)                 │
├─────────────────────────────────┤
│  Database Layer                 │
│  (Models, MongoDB)              │
└─────────────────────────────────┘
```

### Patrones Implementados
1. **Singleton** - `Database.js`
2. **Repository** - `ProfessorRepository.js`
3. **Service Layer** - `ProfessorService.js`
4. **Dependency Injection** - `server.js`
5. **MVC** - Separación completa de responsabilidades

---

## 🌐 Endpoints Disponibles

### 1. Health Check
```http
GET http://localhost:3000/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-17T..."
}
```

### 2. Obtener Profesores
```http
GET http://localhost:3000/api/professors
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### 3. Estadísticas Completas
```http
GET http://localhost:3000/api/professors/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProfessors": 5,
    "averageSalary": 66000,
    "averageExperience": 16,
    "departmentStats": [...],
    "topEarners": [...],
    "mostExperienced": [...],
    "salaryRange": { "min": 50000, "max": 80000 }
  }
}
```

### 4. Profesores con Experiencia
```http
GET http://localhost:3000/api/professors/experience
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "name": "Dr. María González",
      "department": "Computer Science",
      "salary": 75000,
      "hireYear": 2003,
      "coursesCount": 6,
      "experience": 22,
      "salaryPerCourse": 12500
    }
  ]
}
```

---

## 🚀 Deployment a la Nube

### Backend en Render

1. **Crear cuenta en Render.com**
   - Ir a https://render.com
   - Crear cuenta gratuita

2. **Subir código a GitHub** (si no lo has hecho):
   ```bash
   cd "c:\Users\Sjean\Desktop\Universidad ESPE\Quinto Semestre Ing.Software\Web Avanzada\SantiExam"
   git init
   git add .
   git commit -m "Initial commit - Professor Analytics"
   git branch -M main
   # Crear repo en GitHub y luego:
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

3. **Crear Web Service en Render:**
   - Click en "New +" → "Web Service"
   - Conectar tu repositorio de GitHub
   - Configurar:
     - **Name:** `professors-backend`
     - **Root Directory:** `backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** `Free`

4. **Agregar Variables de Entorno:**
   - En "Environment" tab, agregar:
   ```
   MONGODB_URI = mongodb+srv://jeancarlo:jean12345@cluster0.3ixvnnj.mongodb.net/ExamProfessors?retryWrites=true&w=majority&appName=Cluster0
   ```

5. **Deploy:**
   - Click en "Create Web Service"
   - Esperar a que termine el deployment
   - Copiar la URL generada (ej: `https://professors-backend-xxxx.onrender.com`)

### Frontend en Vercel

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login en Vercel:**
   ```bash
   vercel login
   ```

3. **Actualizar URL del Backend:**
   Editar `frontend/app.js` línea 6:
   ```javascript
   const CONFIG = {
       API_URL: 'https://TU-URL-DE-RENDER.onrender.com/api',
       // ...
   };
   ```

4. **Deploy:**
   ```bash
   cd "c:\Users\Sjean\Desktop\Universidad ESPE\Quinto Semestre Ing.Software\Web Avanzada\SantiExam\frontend"
   vercel
   ```
   
   - Seleccionar opciones:
     - Set up and deploy? → **Yes**
     - Which scope? → Tu cuenta
     - Link to existing project? → **No**
     - Project name? → `professor-analytics`
     - Directory? → `./`
     - Override settings? → **No**

5. **Deploy a Producción:**
   ```bash
   vercel --prod
   ```

6. **Actualizar CORS en Backend:**
   Editar `backend/src/app.js` línea 17:
   ```javascript
   this.app.use(cors({
       origin: 'https://TU-URL-DE-VERCEL.vercel.app',
       methods: ['GET', 'POST', 'PUT', 'DELETE'],
       allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

7. **Re-deploy backend** en Render (se hace automático con git push)

---

## 🧪 Testing

### Probar Backend Localmente
```bash
# Health check
curl http://localhost:3000/health

# Estadísticas
curl http://localhost:3000/api/professors/statistics

# Profesores
curl http://localhost:3000/api/professors/experience
```

### Probar Backend en Producción
```bash
# Health check
curl https://TU-URL.onrender.com/health

# Estadísticas
curl https://TU-URL.onrender.com/api/professors/statistics
```

---

## 📁 Estructura de Archivos Completa

```
SantiExam/
├── README.md                        ← Documentación principal
├── DEPLOYMENT_GUIDE.md              ← Esta guía
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── Database.js          # Singleton para MongoDB
│   │   ├── models/
│   │   │   └── Professor.js         # Schema de Mongoose
│   │   ├── repositories/
│   │   │   └── ProfessorRepository.js  # Data access layer
│   │   ├── services/
│   │   │   └── ProfessorService.js  # Business logic
│   │   ├── controllers/
│   │   │   └── ProfessorController.js  # HTTP handlers
│   │   ├── routes/
│   │   │   └── professorRoutes.js   # Route definitions
│   │   ├── app.js                   # Express config
│   │   └── server.js                # Entry point
│   ├── .env                         # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── index.html                   # Main page
    ├── styles.css                   # Estilos empresariales
    ├── app.js                       # Application logic
    ├── vercel.json                  # Vercel config
    ├── .gitignore
    └── README.md
```

---

## 🎯 Checklist de Funcionalidades

### Backend
- ✅ Conexión a MongoDB Atlas
- ✅ Modelo de datos (Professor)
- ✅ Repository pattern implementado
- ✅ Service layer con lógica de negocio
- ✅ Controladores REST
- ✅ Rutas configuradas
- ✅ CORS habilitado
- ✅ Manejo de errores
- ✅ Clean architecture
- ✅ POO implementada

### Frontend
- ✅ Diseño responsive
- ✅ Colores empresariales (negro + concho de vino)
- ✅ Estados de carga y error
- ✅ Consumo de API
- ✅ Tarjetas de estadísticas
- ✅ Rankings interactivos
- ✅ Tabla de profesores
- ✅ Animaciones y transiciones
- ✅ POO en JavaScript

### Lógica de Negocio
- ✅ Cálculo de experiencia
- ✅ Estadísticas por departamento
- ✅ Top 5 mejor pagados
- ✅ Top 5 más experimentados
- ✅ Promedios salariales
- ✅ Rangos salariales
- ✅ Conteo de profesores
- ✅ Total de cursos

### Deployment
- ✅ Archivos de configuración para Render
- ✅ Archivos de configuración para Vercel
- ✅ Documentación de deployment
- ✅ Variables de entorno configuradas
- ✅ package.json con engines especificado

---

## 🎓 Conceptos Aplicados

### Clean Code
- Nombres descriptivos
- Funciones pequeñas y específicas
- Comentarios JSDoc
- Separación de responsabilidades
- DRY (Don't Repeat Yourself)

### POO
- Clases bien definidas
- Encapsulación
- Singleton pattern
- Dependency Injection
- Abstracción

### Arquitectura
- Capas separadas
- Repository pattern
- Service layer
- MVC pattern
- RESTful API

---

## 🆘 Solución de Problemas

### El backend no se conecta a MongoDB
- Verificar que la URI en `.env` sea correcta
- Verificar conexión a internet
- Verificar IP whitelist en MongoDB Atlas

### El frontend no muestra datos
- Verificar que el backend esté corriendo
- Verificar la URL en `app.js`
- Abrir DevTools (F12) y revisar console
- Verificar CORS en el backend

### Error CORS en producción
- Actualizar `origin` en `backend/src/app.js`
- Poner la URL exacta de Vercel
- Re-deploy backend

---

## 📞 Soporte

Para más información, revisar:
- `README.md` - Documentación general
- `backend/README.md` - Guía de backend
- `frontend/README.md` - Guía de frontend

---

**¡Proyecto listo para probar localmente y desplegar a producción!** 🚀
