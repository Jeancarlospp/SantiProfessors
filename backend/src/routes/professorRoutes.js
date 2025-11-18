import express from 'express';

/**
 * Configura las rutas de profesores
 * @param {ProfessorController} professorController
 * @returns {express.Router}
 */
function createProfessorRoutes(professorController) {
    const router = express.Router();

    // GET /api/professors - Obtener todos los profesores
    router.get('/', (req, res) => professorController.getAllProfessors(req, res));

    // GET /api/professors/statistics - Obtener estadísticas
    router.get('/statistics', (req, res) => professorController.getStatistics(req, res));

    // GET /api/professors/experience - Obtener profesores con experiencia
    router.get('/experience', (req, res) => professorController.getProfessorsWithExperience(req, res));

    return router;
}

export default createProfessorRoutes;
