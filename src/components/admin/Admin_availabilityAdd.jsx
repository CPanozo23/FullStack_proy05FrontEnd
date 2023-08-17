import React, { useContext, useEffect, useState } from "react"
import moment from 'moment-timezone';
//npm install moment-timezone
const Admin_availabilityAdd = ({ onClose })  => {

    const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState(15);

  // Generar opciones de hora (cada 15 minutos)
  const generateTimeOptions = () => {
    const options = [];
    const interval = 15; // Intervalo de minutos
    for (let i = 0; i < 24 * 60; i += interval) {
      const hours = Math.floor(i / 60).toString().padStart(2, "0");
      const minutes = (i % 60).toString().padStart(2, "0");
      options.push(`${hours}:${minutes}`);
    }
    return options;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío de la disponibilidad
    console.log("Fecha:", selectedDate);
    console.log("Hora de inicio:", selectedTime);
    console.log("Duración de cada bloque:", duration);
  };
    

    return (
        <article className='justify-content-center details'>
            <h1>AGREGAR DISPONIBILIDAD</h1>
            <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </div>
        <div>
          <label>Hora de inicio:</label>
          <select value={selectedTime} onChange={handleTimeChange} required>
            <option value="">Seleccione una hora</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Duración de cada bloque:</label>
          <select value={duration} onChange={handleDurationChange} required>
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={45}>45 minutos</option>
            <option value={60}>60 minutos</option>
          </select>
        </div>
        <button type="submit">Guardar Disponibilidad</button>
      </form>
            <button type="button" className="btn btn-primary" onClick={onClose}>Cerrar</button>
        </article>
    )
}
export default Admin_availabilityAdd;
