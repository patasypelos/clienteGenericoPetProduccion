import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, Modal } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';


const MascotaForm = () => {
  const baseUrll = process.env.REACT_APP_API_URL;

  const [mascota, setMascota] = useState({
    nombre: '',
    Telefono: '',
    telefonoDos: '',
    nombrePropietario: '',
    nombrePropietarioDos: '',
    genero: '',
    edad: '',
    precioBano: '',
    idTipoRaza: '',
    observacion: '',
    imagen: null,
  });

  const [tipoRaza, setTipoRaza] = useState([]);
  const [mascotasRegistradas, setMascotasRegistradas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [mascotaId, setMascotaId] = useState(null);

  // Obtener lista de tipos de raza
  useEffect(() => {
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarListaTipoRaza`)
      .then((response) => response.json())
      .then((data) => setTipoRaza(data))
      .catch((error) => console.error('Error al obtener las razas:', error));
  }, [baseUrll]);

  // Obtener lista de mascotas registradas
  const fetchMascotasRegistradas = () => {
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarListaMascotaRegistradas`)
      .then((response) => response.json())
      .then((data) => setMascotasRegistradas(data))
      .catch((error) => console.error('Error al obtener mascotas:', error));
  };

  useEffect(() => {
    fetchMascotasRegistradas();
  }, [baseUrll]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMascota((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar carga de imagen
  const handleImageChange = (e) => {
    setMascota((prevState) => ({
      ...prevState,
      imagen: e.target.files[0],
    }));
  };

  // Manejar registro de nueva mascota
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in mascota) {
      formData.append(key, mascota[key]);
    }

    fetch(`${baseUrll}/RegistrarUsuariosMascotas/PostregistrarMascota`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchMascotasRegistradas();
        setMascota({
          nombre: '',
          telefono: '',
          telefonoDos: '',
          nombrePropietario: '',
          nombrePropietarioDos: '',
          genero: '',
          edad: '',
          precioBano: '',
          idTipoRaza: '',
          observacion: '',
          imagen: null,
        });
      })
      .catch((error) => console.error('Error al registrar la mascota:', error));
  };

  // Manejar edición de mascota
  const handleEdit = (id) => {
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarMascotaPorId/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMascota(data);
        setEditMode(true);
        setMascotaId(id);
      })
      .catch((error) => console.error('Error al obtener detalles de la mascota:', error));
  };

  // Manejar actualización de mascota
  const handleUpdate = () => {
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/ActualizarMascota/${mascotaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascota),
    })
      .then(() => {
        fetchMascotasRegistradas();
        setEditMode(false);
        setMascotaId(null);
        setMascota({
          nombre: '',
          telefono: '',
          telefonoDos: '',
          nombrePropietario: '',
          nombrePropietarioDos: '',
          genero: '',
          edad: '',
          precioBano: '',
          idTipoRaza: '',
          observacion: '',
          imagen: null,
        });
      })
      .catch((error) => console.error('Error al actualizar la mascota:', error));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
    <SoftBox p={2}>
      <SoftTypography variant="h4" gutterBottom>
        {editMode ? 'Editar Mascota' : 'Registrar Mascota'}
      </SoftTypography>
      <Box component="form" onSubmit={editMode ? handleUpdate : handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={mascota.nombre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={mascota.telefono}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono Secundario"
              name="telefonoDos"
              value={mascota.telefonoDos}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre del Propietario"
              name="nombrePropietario"
              value={mascota.nombrePropietario}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre Secundario del Propietario"
              name="nombrePropietarioDos"
              value={mascota.nombrePropietarioDos}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Género"
              name="genero"
              value={mascota.genero}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              type="number"
              name="edad"
              value={mascota.edad}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Precio del Baño"
              type="number"
              name="precioBano"
              value={mascota.precioBano}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="tipoRaza-label">Raza</InputLabel>
              <Select
                labelId="tipoRaza-label"
                name="idTipoRaza"
                value={mascota.idTipoRaza}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Seleccionar Raza</em>
                </MenuItem>
                {tipoRaza.map((raza) => (
                  <MenuItem key={raza.value} value={raza.value}>
                    {raza.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observación"
              name="observacion"
              value={mascota.observacion}
              onChange={handleChange}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Subir Imagen
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {editMode ? 'Actualizar Mascota' : 'Registrar Mascota'}
        </Button>
      </Box>

      <SoftTypography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Mascotas Registradas
      </SoftTypography>
      <Box>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Propietario</th>
              <th>Teléfono</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotasRegistradas.map((mascota) => (
            <tr key={mascota.id}>
              <td>{mascota.nombre}</td>
              <td>{mascota.nombrePropietario}</td>
              <td>{mascota.telefono}</td>
              <td>{mascota.genero}</td>
              <td>{mascota.edad}</td>
              <td>
                <button onClick={() => handleEdit(mascota.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Box>

      </SoftBox>
       </DashboardLayout>
    );
};

export default MascotaForm;