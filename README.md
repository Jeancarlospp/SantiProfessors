# Professor Analytics Dashboard

Sistema de análisis y estadísticas para profesores universitarios con arquitectura limpia y POO.

## 🚀 Tecnologías

### Backend
- **Node.js** con ES Modules
- **Express.js** - Framework web
- **MongoDB** con Mongoose - Base de datos
- **Arquitectura:** Clean Architecture con patrones Repository, Service y Dependency Injection

### Frontend
- **HTML5, CSS3, JavaScript** vanilla
- **Diseño empresarial** con colores negro y concho de vino
- **Responsive Design**

## 📁 Estructura del Proyecto

```
SantiExam/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── Database.js          # Conexión a MongoDB (Singleton)
│   │   ├── models/
│   │   │   └── Professor.js         # Modelo de datos
│   │   ├── repositories/
│   │   │   └── ProfessorRepository.js  # Patrón Repository
│   │   ├── services/
│   │   │   └── ProfessorService.js    # Lógica de negocio
│   │   ├── controllers/
│   │   │   └── ProfessorController.js # Controladores HTTP
│   │   ├── routes/
│   │   │   └── professorRoutes.js    # Definición de rutas
│   │   ├── app.js                    # Configuración de Express
│   │   └── server.js                 # Punto de entrada
│   ├── .env                          # Variables de entorno
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── index.html                    # Página principal
    ├── styles.css                    # Estilos empresariales
    └── app.js                        # Lógica de la aplicación

```

## 🎯 Características

### Lógica de Negocio Implementada

1. **Estadísticas Generales:**
   - Total de profesores
   - Salario promedio
   - Experiencia promedio (años desde contratación)
   - Rango salarial (mínimo y máximo)

2. **Análisis por Departamento:**
   - Cantidad de profesores por departamento
   - Salario promedio por departamento
   - Total de cursos por departamento
   - Lista de profesores en cada departamento

3. **Rankings:**
   - Top 5 profesores mejor pagados
   - Top 5 profesores más experimentados

4. **Datos Enriquecidos:**
   - Cálculo de años de experiencia desde año de contratación
   - Salario por curso (salary/coursesCount)

## 🛠️ Instalación y Uso Local

### Backend

1. **Instalar dependencias:**
```bash
cd backend
npm install
```

2. **Configurar variables de entorno:**
El archivo `.env` ya está configurado con:
```
PORT=3000
MONGODB_URI=mongodb+srv://jeancarlo:jean12345@cluster0.3ixvnnj.mongodb.net/ExamProfessors?retryWrites=true&w=majority&appName=Cluster0
```

3. **Iniciar servidor:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

### Frontend

1. **Abrir en el navegador:**
```bash
cd frontend
start index.html
```

O simplemente abre el archivo `index.html` en tu navegador.

## 📡 Endpoints de la API

### GET /health
Verifica el estado del servidor
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-17T..."
}
```

### GET /api/professors
Obtiene todos los profesores
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### GET /api/professors/statistics
Obtiene estadísticas completas con lógica de negocio aplicada
```json
{
  "success": true,
  "data": {
    "totalProfessors": 5,
    "averageSalary": 65000,
    "averageExperience": 15,
    "departmentStats": [...],
    "topEarners": [...],
    "mostExperienced": [...],
    "salaryRange": { "min": 50000, "max": 80000 }
  }
}
```

### GET /api/professors/experience
Obtiene profesores con información calculada de experiencia
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

## 🏗️ Patrones de Diseño Implementados

1. **Singleton** - Database connection
2. **Repository Pattern** - Abstracción de acceso a datos
3. **Service Layer** - Lógica de negocio separada
4. **Dependency Injection** - Inyección de dependencias
5. **MVC** - Separación de responsabilidades

## 🎨 Diseño Frontend

- **Colores principales:** Negro (#1A1A1A) y Concho de vino (#8B1538)
- **Tipografía:** Inter (Google Fonts)
- **Componentes:**
  - Tarjetas de resumen con iconos
  - Rankings interactivos
  - Estadísticas por departamento
  - Tabla responsive de profesores
  - Estados de carga y error

## 🚀 Deployment

### Backend en Render

1. Crear nuevo Web Service en Render
2. Conectar repositorio
3. Configurar:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `MONGODB_URI`: (tu URI de MongoDB)
     - `PORT`: 3000

### Frontend en Vercel

1. Crear nuevo proyecto en Vercel
2. Seleccionar carpeta `frontend`
3. Deploy automático

## 📊 Base de Datos

**Colección:** `professors` en base de datos `ExamProfessors`

**Estructura:**
```javascript
{
  name: String,
  department: String,
  salary: Number,
  hireYear: Number,
  coursesCount: Number
}
```

## ✅ Testing Local

1. Inicia el backend: `cd backend && npm start`
2. Abre el frontend: Abre `frontend/index.html` en el navegador
3. Verifica que:
   - Se muestren las estadísticas
   - Los rankings estén ordenados correctamente
   - La tabla muestre todos los profesores
   - El indicador de conexión esté en verde

## 👨‍💻 Autor

Proyecto para Universidad ESPE - Web Avanzada
Quinto Semestre Ing. Software

---

**Nota:** Este proyecto implementa solo operaciones de lectura (READ) según lo solicitado. No incluye operaciones de creación, actualización o eliminación de datos.
