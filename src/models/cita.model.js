import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Cita', CitaSchema);
