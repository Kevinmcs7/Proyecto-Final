import Cita from '../models/cita.model.js'

export const Registrar = async (req, res) => {
    const {nombre,telefono,fecha,hora} = req.body

    try {
        const newCita = new Cita({
            nombre,
            telefono,
            fecha,
            hora
        })
        const citaSaved = await newCita.save()
        res.json(citaSaved)
        
    } catch (error) {
        console.log(error);
    }
};

export const Dashboard = async (req, res) => {
    try {
        // Consultar todas las citas de la base de datos
        const citas = await Cita.find();

        // Enviar las citas como respuesta
        res.json(citas);
    } catch (error) {
        // Manejar cualquier error
        console.error("Error al obtener las citas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
