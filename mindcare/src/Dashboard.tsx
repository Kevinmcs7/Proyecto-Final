import React, { useState, useEffect } from "react";
import estresImage from "./assets/estres.png"; // Importa la imagen
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [citas, setCitas] = useState([]); // Estado para almacenar las citas
  const navegation = useNavigate();

  // Función para obtener las citas del backend
  const getCitas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Dashboard");
      if (!response.ok) {
        throw new Error("Error al obtener las citas");
      }
      const data = await response.json();
      setCitas(data); // Almacena las citas en el estado
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  // Llama a la función para obtener las citas cuando el componente se monte
  useEffect(() => {
    getCitas();
  }, []);

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.rectangle}>
          <div style={styles.innerContent}>
            <h1 style={styles.headerText}>MindCare</h1>
          </div>
        </div>
      </div>
      <div style={styles.bottomContainer}>
        <div style={styles.registroCitas}>Registro de Citas</div>
        <div style={styles.citasContainer}>
          {citas.map((cita, index) => (
            <Card key={index} cita={cita} index={index} />
          ))}
        </div>
        <button onClick={() => navegation("/")} style={styles.button}>
          Registrar Cita
        </button>
      </div>
    </div>
  );
};

const Card = ({ cita, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardContent}>
        <p style={styles.cardInfo}>Cita {index + 1}</p>
        <img src={estresImage} alt="Estres" style={styles.estres} />
        <p style={styles.cardInfo}>Nombre: {cita.nombre}</p>
        <p style={styles.cardInfo}>Teléfono: {cita.telefono}</p>
        <p style={styles.cardInfo}>Fecha: {new Date(cita.fecha).toLocaleDateString()}</p>
        <p style={styles.cardInfo}>Hora: {cita.hora}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100px",
    background: "rgb(42, 164, 134)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: "40px",
    fontWeight: "bold",
    margin: 0,
  },
  bottomContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "0px",
    marginTop: "0px",
    paddingTop: "150px", // Espacio para el título
    position: "relative",
  },
  registroCitas: {
    position: "absolute",
    width: "320px",
    height: "45px",
    left: "50%",
    transform: "translateX(-50%)",
    top: "20px",
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: 800,
    fontSize: "36px",
    lineHeight: "44px",
    color: "#000000",
  },
  citasContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    width: "190px", // Tamaño reducido
    height: "260px", // Tamaño reducido
    background: "linear-gradient(145deg, #82d4c0, #64b8a7)", // Gradiente de fondo
    border: "2px solid #2AA486", // Borde más oscuro
    borderRadius: "15px", // Borde más redondeado
    padding: "15px", // Padding ajustado
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    transition: "transform 0.3s, box-shadow 0.3s", // Efecto de transición
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  estres: {
    width: "80px", // Tamaño reducido
    height: "80px", // Tamaño reducido
    transform: "rotate(-0.22deg)",
    marginBottom: "10px",
  },
  cardInfo: {
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "12px", // Tamaño reducido
    lineHeight: "14px",
    color: "#000000",
    marginBottom: "5px",
    textAlign: "center",
  },
  button: {
    width: "322px",
    height: "58px",
    margin: "20px auto", // Espacio por arriba y por abajo
    background: "#2AA486",
    borderRadius: "25px",
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: 800,
    fontSize: "24px",
    lineHeight: "29px",
    color: "#1E1E1E",
    border: "none",
    cursor: "pointer",
    display: "block",
  },
};

export default Dashboard;
