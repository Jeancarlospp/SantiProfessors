import dotenv from 'dotenv';
import Database from './config/Database.js';
import ProfessorRepository from './repositories/ProfessorRepository.js';
import ProfessorService from './services/ProfessorService.js';
import ProfessorController from './controllers/ProfessorController.js';
import App from './app.js';

// Cargar variables de entorno
dotenv.config();

/**
 * Clase principal del servidor
 * Implementa el patrón de Inyección de Dependencias
 */
class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.mongoUri = process.env.MONGODB_URI;
        this.httpServer = null;
    }

    /**
     * Inicializa todas las dependencias
     */
    initializeDependencies() {
        // Crear instancias siguiendo el patrón de inyección de dependencias
        const professorRepository = new ProfessorRepository();
        const professorService = new ProfessorService(professorRepository);
        const professorController = new ProfessorController(professorService);
        
        // Crear aplicación Express
        const app = new App(professorController);
        return app.getExpressApp();
    }

    /**
     * Inicia el servidor
     */
    async start() {
        try {
            console.log('🚀 Iniciando servidor...');

            // Conectar a la base de datos
            await Database.connect(this.mongoUri);

            // Inicializar dependencias y obtener app Express
            const expressApp = this.initializeDependencies();

            // Iniciar servidor HTTP
            this.httpServer = expressApp.listen(this.port, () => {
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log(`✅ Servidor corriendo en puerto ${this.port}`);
                console.log(`🌐 URL: http://localhost:${this.port}`);
                console.log(`📊 API: http://localhost:${this.port}/api/professors`);
                console.log(`💚 Health: http://localhost:${this.port}/health`);
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            });

            // Manejo de señales de terminación
            this.setupGracefulShutdown();

        } catch (error) {
            console.error('❌ Error al iniciar el servidor:', error.message);
            process.exit(1);
        }
    }

    /**
     * Configura el apagado graceful del servidor
     */
    setupGracefulShutdown() {
        const shutdown = async (signal) => {
            console.log(`\n⚠️  Señal ${signal} recibida. Cerrando servidor...`);
            
            if (this.httpServer) {
                this.httpServer.close(async () => {
                    console.log('🔌 Servidor HTTP cerrado');
                    await Database.disconnect();
                    console.log('👋 Proceso terminado correctamente');
                    process.exit(0);
                });
            }
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
}

// Iniciar el servidor
const server = new Server();
server.start();
