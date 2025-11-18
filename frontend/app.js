/**
 * Configuración de la aplicación
 */
const CONFIG = {
    API_URL: 'https://santiprofessors.onrender.com/api',
    ENDPOINTS: {
        STATISTICS: '/professors/statistics',
        PROFESSORS: '/professors/experience'
    }
};

/**
 * Clase principal de la aplicación
 * Implementa el patrón Singleton y manejo de estado
 */
class ProfessorApp {
    constructor() {
        this.state = {
            statistics: null,
            professors: [],
            isLoading: false,
            error: null
        };
        
        this.elements = {
            loading: document.getElementById('loading-container'),
            error: document.getElementById('error-container'),
            errorMessage: document.getElementById('error-message'),
            mainContent: document.getElementById('main-content'),
            connectionStatus: document.getElementById('connection-status')
        };
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        console.log('🚀 Iniciando aplicación...');
        await this.loadData();
    }

    /**
     * Carga todos los datos necesarios
     */
    async loadData() {
        this.showLoading();
        
        try {
            // Cargar datos en paralelo
            const [statistics, professors] = await Promise.all([
                this.fetchStatistics(),
                this.fetchProfessors()
            ]);

            this.state.statistics = statistics;
            this.state.professors = professors;
            this.state.error = null;

            this.hideLoading();
            this.render();
            this.updateConnectionStatus(true);
            
            console.log('✅ Datos cargados exitosamente');
        } catch (error) {
            console.error('❌ Error al cargar datos:', error);
            this.state.error = error.message;
            this.showError(error.message);
            this.updateConnectionStatus(false);
        }
    }

    /**
     * Obtiene las estadísticas del backend
     */
    async fetchStatistics() {
        const response = await fetch(`${CONFIG.API_URL}${CONFIG.ENDPOINTS.STATISTICS}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Error al obtener estadísticas');
        }
        
        return result.data;
    }

    /**
     * Obtiene la lista de profesores con experiencia
     */
    async fetchProfessors() {
        const response = await fetch(`${CONFIG.API_URL}${CONFIG.ENDPOINTS.PROFESSORS}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Error al obtener profesores');
        }
        
        return result.data;
    }

    /**
     * Muestra el estado de carga
     */
    showLoading() {
        this.elements.loading.style.display = 'flex';
        this.elements.error.style.display = 'none';
        this.elements.mainContent.style.display = 'none';
    }

    /**
     * Oculta el estado de carga
     */
    hideLoading() {
        this.elements.loading.style.display = 'none';
    }

    /**
     * Muestra un error
     */
    showError(message) {
        this.elements.error.style.display = 'flex';
        this.elements.errorMessage.textContent = message;
        this.elements.mainContent.style.display = 'none';
        this.hideLoading();
    }

    /**
     * Actualiza el indicador de conexión
     */
    updateConnectionStatus(isConnected) {
        const statusIndicator = this.elements.connectionStatus.querySelector('.status-indicator');
        
        if (isConnected) {
            this.elements.connectionStatus.innerHTML = `
                <span class="status-indicator"></span>
                Conectado
            `;
        } else {
            this.elements.connectionStatus.innerHTML = `
                <span class="status-indicator error"></span>
                Desconectado
            `;
        }
    }

    /**
     * Renderiza toda la interfaz
     */
    render() {
        this.elements.mainContent.style.display = 'block';
        
        this.renderSummaryCards();
        this.renderTopEarners();
        this.renderDepartmentStats();
        this.renderMostExperienced();
        this.renderProfessorsTable();
    }

    /**
     * Renderiza las tarjetas de resumen
     */
    renderSummaryCards() {
        const stats = this.state.statistics;
        
        document.getElementById('total-professors').textContent = stats.totalProfessors;
        document.getElementById('average-salary').textContent = this.formatCurrency(stats.averageSalary);
        document.getElementById('average-experience').textContent = `${stats.averageExperience} años`;
        document.getElementById('total-departments').textContent = stats.departmentStats.length;
    }

    /**
     * Renderiza el top 5 de profesores mejor pagados
     */
    renderTopEarners() {
        const container = document.getElementById('top-earners-list');
        const topEarners = this.state.statistics.topEarners;
        
        container.innerHTML = topEarners.map((prof, index) => `
            <div class="ranking-item">
                <div class="ranking-number">${index + 1}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${prof.name}</div>
                    <div class="ranking-details">
                        ${prof.department} • ${prof.experience} años de experiencia • ${prof.coursesCount} cursos
                    </div>
                </div>
                <div class="ranking-salary">${this.formatCurrency(prof.salary)}</div>
            </div>
        `).join('');
    }

    /**
     * Renderiza las estadísticas por departamento
     */
    renderDepartmentStats() {
        const container = document.getElementById('department-stats');
        const departments = this.state.statistics.departmentStats;
        
        container.innerHTML = departments.map(dept => `
            <div class="department-item">
                <div class="department-header">
                    <div class="department-name">${dept.department}</div>
                    <div class="department-count">${dept.totalProfessors} profesor${dept.totalProfessors > 1 ? 'es' : ''}</div>
                </div>
                <div class="department-stats">
                    <div class="stat-item">
                        <span class="stat-item-label">Salario Promedio</span>
                        <span class="stat-item-value">${this.formatCurrency(dept.averageSalary)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-item-label">Total Cursos</span>
                        <span class="stat-item-value">${dept.totalCourses}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Renderiza los profesores más experimentados
     */
    renderMostExperienced() {
        const container = document.getElementById('experienced-list');
        const experienced = this.state.statistics.mostExperienced;
        
        container.innerHTML = experienced.map(prof => `
            <div class="experience-item">
                <div class="experience-name">${prof.name}</div>
                <div class="experience-department">${prof.department}</div>
                <div class="experience-details">
                    <div class="experience-badge">
                        <span class="experience-badge-label">Experiencia</span>
                        <span class="experience-badge-value">${prof.experience} años</span>
                    </div>
                    <div class="experience-badge">
                        <span class="experience-badge-label">Desde</span>
                        <span class="experience-badge-value">${prof.hireYear}</span>
                    </div>
                    <div class="experience-badge">
                        <span class="experience-badge-label">Salario</span>
                        <span class="experience-badge-value">${this.formatCurrency(prof.salary)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Renderiza la tabla de todos los profesores
     */
    renderProfessorsTable() {
        const tbody = document.getElementById('professors-table-body');
        
        // Ordenar por nombre
        const sortedProfessors = [...this.state.professors].sort((a, b) => 
            a.name.localeCompare(b.name)
        );
        
        tbody.innerHTML = sortedProfessors.map(prof => `
            <tr>
                <td>${prof.name}</td>
                <td>${prof.department}</td>
                <td><span class="badge badge-salary">${this.formatCurrency(prof.salary)}</span></td>
                <td>${prof.hireYear}</td>
                <td><span class="badge badge-experience">${prof.experience} años</span></td>
                <td>${prof.coursesCount}</td>
            </tr>
        `).join('');
    }

    /**
     * Formatea un número como moneda
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new ProfessorApp();
    app.init();
});

// Exponer app globalmente para poder llamar loadData desde el botón de reintentar
window.app = app;
