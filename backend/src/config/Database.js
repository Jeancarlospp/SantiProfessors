import mongoose from 'mongoose';

/**
 * Clase para manejar la conexión a la base de datos MongoDB
 * Implementa el patrón Singleton
 */
class Database {
    constructor() {
        this.connection = null;
    }

    /**
     * Establece la conexión con MongoDB
     * @param {string} uri - URI de conexión de MongoDB
     * @returns {Promise<void>}
     */
    async connect(uri) {
        try {
            if (this.connection) {
                console.log('✅ Ya existe una conexión activa a MongoDB');
                return this.connection;
            }

            this.connection = await mongoose.connect(uri);
            console.log('✅ Conectado exitosamente a MongoDB');
            console.log(`📦 Base de datos: ${this.connection.connection.name}`);
            
            return this.connection;
        } catch (error) {
            console.error('❌ Error al conectar a MongoDB:', error.message);
            throw error;
        }
    }

    /**
     * Cierra la conexión con MongoDB
     * @returns {Promise<void>}
     */
    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.disconnect();
                this.connection = null;
                console.log('🔌 Desconectado de MongoDB');
            }
        } catch (error) {
            console.error('❌ Error al desconectar de MongoDB:', error.message);
            throw error;
        }
    }

    /**
     * Obtiene el estado de la conexión
     * @returns {boolean}
     */
    isConnected() {
        return mongoose.connection.readyState === 1;
    }
}

export default new Database();
