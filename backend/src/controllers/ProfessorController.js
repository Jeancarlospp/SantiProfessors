/**
 * Controlador para manejar las peticiones HTTP relacionadas con profesores
 */
class ProfessorController {
    constructor(professorService) {
        this.professorService = professorService;
    }

    /**
     * GET /api/professors
     * Obtiene todos los profesores
     */
    async getAllProfessors(req, res) {
        try {
            const professors = await this.professorService.getAllProfessors();
            
            res.status(200).json({
                success: true,
                count: professors.length,
                data: professors
            });
        } catch (error) {
            console.error('❌ Error en getAllProfessors:', error.message);
            res.status(500).json({
                success: false,
                error: 'Error al obtener los profesores',
                message: error.message
            });
        }
    }

    /**
     * GET /api/professors/statistics
     * Obtiene estadísticas generales de los profesores
     */
    async getStatistics(req, res) {
        try {
            const statistics = await this.professorService.getStatistics();
            
            res.status(200).json({
                success: true,
                data: statistics
            });
        } catch (error) {
            console.error('❌ Error en getStatistics:', error.message);
            res.status(500).json({
                success: false,
                error: 'Error al calcular estadísticas',
                message: error.message
            });
        }
    }

    /**
     * GET /api/professors/experience
     * Obtiene profesores con información de experiencia
     */
    async getProfessorsWithExperience(req, res) {
        try {
            const professors = await this.professorService.getProfessorsWithExperience();
            
            res.status(200).json({
                success: true,
                count: professors.length,
                data: professors
            });
        } catch (error) {
            console.error('❌ Error en getProfessorsWithExperience:', error.message);
            res.status(500).json({
                success: false,
                error: 'Error al obtener profesores con experiencia',
                message: error.message
            });
        }
    }
}

export default ProfessorController;
