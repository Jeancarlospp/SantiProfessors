import ProfessorModel from '../models/Professor.js';

/**
 * Repositorio para operaciones de base de datos de Profesores
 * Implementa el patrón Repository
 */
class ProfessorRepository {
    /**
     * Obtiene todos los profesores de la base de datos
     * @returns {Promise<Array>} Lista de profesores
     */
    async findAll() {
        try {
            const professors = await ProfessorModel.find({}).lean();
            return professors;
        } catch (error) {
            console.error('❌ Error en ProfessorRepository.findAll:', error.message);
            throw new Error('Error al obtener profesores de la base de datos');
        }
    }

    /**
     * Cuenta el total de profesores
     * @returns {Promise<number>}
     */
    async count() {
        try {
            return await ProfessorModel.countDocuments();
        } catch (error) {
            console.error('❌ Error en ProfessorRepository.count:', error.message);
            throw new Error('Error al contar profesores');
        }
    }
}

export default ProfessorRepository;
