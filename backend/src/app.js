import express from 'express';
import cors from 'cors';
import createProfessorRoutes from './routes/professorRoutes.js';

/**
 * Clase principal de la aplicación Express
 * Implementa el patrón de configuración modular
 */
class App {
    constructor(professorController) {
        this.app = express();
        this.professorController = professorController;
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    /**
     * Configura los middleware de la aplicación
     */
    configureMiddleware() {
        // CORS
        this.app.use(cors({
            origin: 'https://santiprofessors-fhztleczs-jeancarlos-projects-8f89f917.vercel.app/', // En producción, especificar el dominio de Vercel
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Body parser
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Logger básico
        this.app.use((req, res, next) => {
            console.log(`📨 ${req.method} ${req.path}`);
            next();
        });
    }

    /**
     * Configura las rutas de la aplicación
     */
    configureRoutes() {
        // Ruta de salud
        this.app.get('/health', (req, res) => {
            res.status(200).json({
                success: true,
                message: 'Server is running',
                timestamp: new Date().toISOString()
            });
        });

        // Rutas de API
        const professorRoutes = createProfessorRoutes(this.professorController);
        this.app.use('/api/professors', professorRoutes);

        // Ruta 404
        this.app.use('*', (req, res) => {
            res.status(404).json({
                success: false,
                error: 'Ruta no encontrada',
                path: req.originalUrl
            });
        });
    }

    /**
     * Configura el manejo de errores global
     */
    configureErrorHandling() {
        this.app.use((error, req, res, next) => {
            console.error('❌ Error no manejado:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                message: error.message
            });
        });
    }

    /**
     * Obtiene la instancia de Express
     * @returns {express.Application}
     */
    getExpressApp() {
        return this.app;
    }
}

export default App;
