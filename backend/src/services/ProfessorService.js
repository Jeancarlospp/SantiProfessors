/**
 * Servicio que contiene la lógica de negocio para profesores
 */
class ProfessorService {
    constructor(professorRepository) {
        this.professorRepository = professorRepository;
    }

    /**
     * Obtiene todos los profesores
     * @returns {Promise<Array>}
     */
    async getAllProfessors() {
        return await this.professorRepository.findAll();
    }

    /**
     * Calcula estadísticas generales de todos los profesores
     * @returns {Promise<Object>}
     */
    async getStatistics() {
        const professors = await this.professorRepository.findAll();
        
        if (professors.length === 0) {
            return {
                totalProfessors: 0,
                averageSalary: 0,
                averageExperience: 0,
                departmentStats: [],
                topEarners: [],
                message: 'No hay profesores en la base de datos'
            };
        }

        // Calcular año actual para experiencia
        const currentYear = new Date().getFullYear();

        // Estadísticas generales
        const totalProfessors = professors.length;
        const totalSalary = professors.reduce((sum, prof) => sum + prof.salary, 0);
        const averageSalary = Math.round(totalSalary / totalProfessors);

        // Calcular experiencia promedio
        const totalExperience = professors.reduce((sum, prof) => {
            return sum + (currentYear - prof.hireYear);
        }, 0);
        const averageExperience = Math.round(totalExperience / totalProfessors);

        // Estadísticas por departamento
        const departmentMap = {};
        professors.forEach(prof => {
            if (!departmentMap[prof.department]) {
                departmentMap[prof.department] = {
                    department: prof.department,
                    count: 0,
                    totalSalary: 0,
                    totalCourses: 0,
                    professors: []
                };
            }
            departmentMap[prof.department].count++;
            departmentMap[prof.department].totalSalary += prof.salary;
            departmentMap[prof.department].totalCourses += prof.coursesCount;
            departmentMap[prof.department].professors.push(prof.name);
        });

        const departmentStats = Object.values(departmentMap).map(dept => ({
            department: dept.department,
            totalProfessors: dept.count,
            averageSalary: Math.round(dept.totalSalary / dept.count),
            totalCourses: dept.totalCourses,
            professors: dept.professors
        })).sort((a, b) => b.averageSalary - a.averageSalary);

        // Top 5 profesores mejor pagados
        const topEarners = professors
            .map(prof => ({
                name: prof.name,
                department: prof.department,
                salary: prof.salary,
                experience: currentYear - prof.hireYear,
                coursesCount: prof.coursesCount
            }))
            .sort((a, b) => b.salary - a.salary)
            .slice(0, 5);

        // Profesores más experimentados
        const mostExperienced = professors
            .map(prof => ({
                name: prof.name,
                department: prof.department,
                experience: currentYear - prof.hireYear,
                hireYear: prof.hireYear,
                salary: prof.salary
            }))
            .sort((a, b) => b.experience - a.experience)
            .slice(0, 5);

        return {
            totalProfessors,
            averageSalary,
            averageExperience,
            departmentStats,
            topEarners,
            mostExperienced,
            salaryRange: {
                min: Math.min(...professors.map(p => p.salary)),
                max: Math.max(...professors.map(p => p.salary))
            }
        };
    }

    /**
     * Obtiene profesores enriquecidos con años de experiencia
     * @returns {Promise<Array>}
     */
    async getProfessorsWithExperience() {
        const professors = await this.professorRepository.findAll();
        const currentYear = new Date().getFullYear();

        return professors.map(prof => ({
            ...prof,
            experience: currentYear - prof.hireYear,
            salaryPerCourse: prof.coursesCount > 0 ? Math.round(prof.salary / prof.coursesCount) : 0
        }));
    }
}

export default ProfessorService;
