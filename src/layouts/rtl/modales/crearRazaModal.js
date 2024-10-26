import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, TextField } from '@mui/material';

const CrearRazaModal = ({ isOpen, onClose, onRazaCreada }) => {
  const [nombreRaza, setNombreRaza] = useState('');
  const [error, setError] = useState('');

  const handleCrearRaza = async () => {
    if (!nombreRaza) {
      setError('Por favor, ingresa el nombre de la raza.');
      return;
    }
    const formDatasd = new FormData();
    formDatasd.append('Nombre', nombreRaza);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/RegistrarUsuariosMascotas/PosAgregarTiporaza`, {
        method: 'POST',
        body:formDatasd,
      });

        onRazaCreada("Exitoso"); // Notifica que la raza fue creada
        setNombreRaza(''); // Limpia el campo
        onClose(); // Cierra la modal
   
    } catch (error) {
      console.error("Error al crear la raza", error);
      setError('Hubo un error al crear la raza.');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', backgroundColor: 'white', margin: '100px auto', maxWidth: '400px', textAlign: 'center' }}>
        <h2>Crear Nueva Raza</h2>
        <TextField
          label="Nombre de la Raza"
          value={nombreRaza}
          onChange={(e) => setNombreRaza(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="contained" color="primary" onClick={handleCrearRaza}>
          Crear Raza
        </Button>
      </div>
    </Modal>
  );
};

// Agrega la validación de PropTypes
CrearRazaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRazaCreada: PropTypes.func.isRequired,
};

export default CrearRazaModal;