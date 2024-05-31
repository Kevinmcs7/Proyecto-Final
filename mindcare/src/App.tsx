import React, { useState, useEffect } from "react";
import estresImage from "./assets/estres.png"; // Importa la imagen
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navegation = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setTodayDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { nombre, telefono, fecha, hora } = formData;
    if (!nombre || !telefono || !fecha || !hora) {
      setErrorMessage("Todos los campos son obligatorios.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Cita agendada correctamente."); // Establecer el mensaje de éxito
        setFormData({ // Limpiar el formulario después de una cita exitosa
          nombre: "",
          telefono: "",
          fecha: "",
          hora: "",
        });
      } else {
        setErrorMessage("Error al agendar la cita");
      }
    } catch (error) {
      setErrorMessage("Error de red: " + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      telefono: "",
      fecha: "",
      hora: "",
    });
    setErrorMessage(""); // Limpiar mensaje de error al cancelar
    setSuccessMessage(""); // Limpiar mensaje de éxito al cancelar
  };

  return (
    <div style={styles.pageContainer}>
      {/* Rectangle 1 */}
      <div style={styles.rectangle1}>
        <div style={styles.rectangleContent}>
          <h1 style={styles.headerText}>MindCare</h1>
          <button onClick={() => navegation("/Dashboard")} style={styles.recordsButton}>
            Registros de cita
          </button>
        </div>
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.splitContainer}>
          <div style={styles.imageContainer}>
            {/* Aquí va la imagen */}
            <img src={estresImage} alt="Estres" style={styles.image} />
          </div>
          <div style={styles.formContainer}>
            {/* Aquí va tu formulario */}
            <h2 style={styles.title}>Agendar Cita</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="nombre" style={styles.label}>
                  Nombre
                </label>
                <div style={styles.inputField}>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    style={styles.inputText}
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="telefono" style={styles.label}>
                  Teléfono
                </label>
                <div style={styles.inputField}>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    style={styles.inputText}
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="fecha" style={styles.label}>
                  Fecha
                </label>
                <div style={styles.inputField}>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    style={styles.inputText}
                    placeholder="Fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    min={todayDate} // Establece la fecha mínima a hoy
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="hora" style={styles.label}>
                  Hora
                </label>
                <div style={styles.inputField}>
                  <input
                    type="time"
                    id="hora"
                    name="hora"
                    style={styles.inputText}
                    placeholder="Hora"
                    value={formData.hora}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errorMessage && (
                <div style={styles.errorMessage}>{errorMessage}</div>
              )}
              {successMessage && (
                <div style={styles.successMessage}>{successMessage}</div>
              )}
              <div style={{ ...styles.formButtons, marginTop: "20px" }}>
                <button type="submit" style={styles.acceptButton}>
                  Aceptar
                </button>
                <button type="button" style={styles.cancelButton} onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    overflow: "hidden", // Evitar scroll
  },
  rectangle1: {
    width: '100%',
    height: '100px',
    background: '#2AA486',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  headerText: {
    color: "#ffffff",
    fontSize: "40px",
    fontWeight: "bold",
  },
  recordsButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "#2AA486",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Alineación de los elementos hacia arriba
    paddingTop: "10px", // Espacio entre el rectángulo y el contenido principal
  },
  splitContainer: {
    display: "flex",
    width: "90%",
    height: "80%", // Ajustar la altura para mejor presentación
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "70px", // Ajuste del padding
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: "20px",
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: 800,
    fontSize: "24px",
    lineHeight: "29px",
    color: "#1E1E1E",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: "20px",
    width: "80%",
  },
  label: {
    display: "block",
    marginBottom: "1px",
    fontWeight: "bold",
    fontSize: "16px", // Ajuste del tamaño de fuente
  },
  inputField: {
    width: "100%",
    borderRadius: "25px",
    backgroundColor: "#82D4C0",
  },
  inputText: {
    width: "calc(100% - 20px)", // Resta el padding de 10px en cada lado
    borderRadius: "25px",
    backgroundColor: "#82D4C0",
    color: "#000", // Color de texto negro
    border: "none",
    padding: "10px",
    fontWeight: "bold",
    marginRight: "0", // Elimina el margen derecho
  },
  formButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
  },
  acceptButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#5F72D5",
  },
  cancelButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#CD6E6E",
  },
  imageContainer: {
    flex: 1.6,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "120%",
    borderRadius: "10%", // Ajuste del borde redondeado
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  successMessage: { // Estilo para el mensaje de éxito
    color: "green",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  // Media Queries para hacer el diseño responsivo
  '@media (max-width: 1200px)': {
    splitContainer: {
      flexDirection: 'column',
      height: 'auto',
    },
    formContainer: {
      padding: '40px',
    },
  },
  '@media (max-width: 768px)': {
    rectangle1: {
      height: '80px',
    },
    headerText: {
      fontSize: '30px',
    },
    recordsButton: {
      padding: '8px 16px',
      fontSize: '14px',
    },
    mainContainer: {
      paddingTop: '10px',
    },
    splitContainer: {
      width: '95%',
    },
    formContainer: {
      padding: '20px',
    },
    formGroup: {
      width: '90%',
    },
    formButtons: {
      width: '90%',
    },
  },
  '@media (max-width: 480px)': {
    rectangle1: {
      height: '60px',
    },
    headerText: {
      fontSize: '20px',
    },
    recordsButton: {
      padding: '6px 12px',
      fontSize: '12px',
    },
    formGroup: {
      width: '100%',
    },
    formButtons: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    acceptButton: {
      width: '100%',
      marginBottom: '10px',
    },
    cancelButton: {
      width: '100%',
    },
  },
};

export default App;
