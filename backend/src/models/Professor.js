import mongoose from 'mongoose';

/**
 * Schema de Mongoose para Profesores
 */
const professorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    hireYear: {
        type: Number,
        required: true
    },
    coursesCount: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    collection: 'professors',
    timestamps: false
});

/**
 * Modelo de Profesor
 */
const ProfessorModel = mongoose.model('Professor', professorSchema);

export default ProfessorModel;
