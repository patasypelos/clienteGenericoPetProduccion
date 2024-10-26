import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Box, Typography, Modal, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import CrearRazaModal from './modales/crearRazaModal';

const MascotaForm = () => {
  const baseUrll = process.env.REACT_APP_API_URL;
  const [NombreVal, setNombreVal] = useState('');
  const [TelefonoVal, setTelefonoVal] = useState('');
  const [telefonodosVal, settelefonodosVal] = useState('');
  const [nombrePropietarioVal, setnombrePropietarioVal] = useState('');
  const [nombrePropietarioDosVal, setnombrePropietarioDosVal] = useState('');
  const [generoVal, setgeneroVal] = useState('');
  const [edadVal, setedadVal] = useState('');
  const [precioBanoVal, setprecioBanoVal] = useState('');
  const [idTipoRazaVal, setidTipoRazaVal] = useState('');
  const [observacionVal, setobservacionVal] = useState('');
  const [eoorro, setError] = useState('');
  const [listarazas, setlistarazas] = useState([]);

  const [imagen, setImagen] = useState(null);
  const [mascotasRegistradas, setMascotasRegistradas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [mascotaId, setMascotaId] = useState(null);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Maneja la respuesta después de crear la raza (puedes actualizar una lista, etc.)
  const handleRazaCreada = (nuevaRaza) => {
    console.log('Raza creada:', nuevaRaza);
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarListaTipoRaza`);

    // Aquí podrías actualizar el estado con la nueva raza o hacer alguna acción adicional
  };

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

  // Manejar registro de nueva mascota

  fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarListaTipoRaza`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => setlistarazas(data))
  .catch(error => {
    setError('Error fetching data');
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('IdAnimalInventario', 0);
    formData.append('Nombre', NombreVal);
    formData.append('Telefono', TelefonoVal);
    formData.append('TelefonoDos', telefonodosVal);
    formData.append('NombrePropietario', nombrePropietarioVal);
    formData.append('NombrePropietarioDos', nombrePropietarioDosVal);
    formData.append('Genero', generoVal);
    formData.append('Edad', edadVal);
    formData.append('PrecioBano', precioBanoVal);
    formData.append('IdTipoRazaInventario', idTipoRazaVal);
    formData.append('Observacion', observacionVal);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    fetch(`${baseUrll}/RegistrarUsuariosMascotas/PostregistrarMascota`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        fetchMascotasRegistradas();
        resetForm();
      })
      .catch((error) => console.error('Error al registrar la mascota:', error));
  };

  // Manejar edición de mascota
  const handleEdit = (id) => {
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarMascotaRegistradasID?idMascota=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNombreVal(data.nombre);
        setTelefonoVal(data.telefono);
        settelefonodosVal(data.telefonoDos);
        setnombrePropietarioVal(data.nombrePropietario);
        setnombrePropietarioDosVal(data.nombrePropietarioDos);
        setgeneroVal(data.genero);
        setedadVal(data.edad);
        setprecioBanoVal(data.precioBano);
        setidTipoRazaVal(data.idTipoRazaInventario);
        setobservacionVal(data.observacion);
        setImagen(data.archivo);
        setMascotaId(id);
        setEditMode(true);
      })
      .catch((error) => console.error('Error al obtener detalles de la mascota:', error));
  };

  // Manejar actualización de mascota
  const handleUpdate = (e) => {
    e.preventDefault();

    const formDataUpdate = new FormData();
    formDataUpdate.append('IdAnimalInventario', mascotaId);
    formDataUpdate.append('Nombre', NombreVal);
    formDataUpdate.append('Telefono', TelefonoVal);
    formDataUpdate.append('TelefonoDos', telefonodosVal);
    formDataUpdate.append('NombrePropietario', nombrePropietarioVal);
    formDataUpdate.append('NombrePropietarioDos', nombrePropietarioDosVal);
    formDataUpdate.append('Genero', generoVal);
    formDataUpdate.append('Edad', edadVal);
    formDataUpdate.append('PrecioBano', precioBanoVal);
    formDataUpdate.append('IdTipoRazaInventario', idTipoRazaVal);
    formDataUpdate.append('Observacion', observacionVal);
    if (imagen) {
      formDataUpdate.append('imagen', imagen);
    }
debugger;
   

  fetch(`${baseUrll}/RegistrarUsuariosMascotas/ActualizarMascotaAsync`, {
    method: 'POST',
    body: formDataUpdate,
  })
    .then(() => {
      fetchMascotasRegistradas();
      resetForm();
    })
    .catch((error) => console.error('Error al registrar la mascota:', error));
};

 
  // Resetear el formulario
  const resetForm = () => {
    setNombreVal('');
    setTelefonoVal('');
    settelefonodosVal('');
    setnombrePropietarioVal('');
    setnombrePropietarioDosVal('');
    setgeneroVal('');
    setedadVal('');
    setprecioBanoVal('');
    setidTipoRazaVal('');
    setobservacionVal('');
    setImagen(null);
    setEditMode(false);
    setMascotaId(null);
  };

  // Manejar cambio en los campos
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
      <Button
       sx={{
        backgroundColor: '#003366', // Azul oscuro por defecto
        color: '#ffffff', // Letras blancas por defecto
        border: '2px solid transparent', // Borde transparente por defecto
        '&:hover': {
          backgroundColor: '#ffffff', // Fondo blanco al pasar el cursor
          color: '#003366', // Letras azules al pasar el cursor
          border: '2px solid #003366' // Borde azul al pasar el cursor
        }
      }}
      variant="contained" color="primary" onClick={handleOpenModal}>
        Crear Tipo de Raza
      </Button>

      <CrearRazaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRazaCreada={handleRazaCreada}
      />
    </div>
      <SoftBox p={1}>
        <SoftTypography variant="h4" gutterBottom>
          {editMode ? 'Editar Mascota' : 'Registrar Mascota'}
        </SoftTypography>
        <Box component="form" onSubmit={editMode ? handleUpdate : handleSubmit}>
          <Grid container spacing={2}>
            {/* Campos de entrada como Nombre, Teléfono, etc. */}
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Nombre"
                  value={NombreVal}
                  onChange={handleInputChange(setNombreVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Teléfono"
                  value={TelefonoVal}
                  onChange={handleInputChange(setTelefonoVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Teléfono Dos"
                  value={telefonodosVal}
                  onChange={handleInputChange(settelefonodosVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Nombre del Propietario"
                  value={nombrePropietarioVal}
                  onChange={handleInputChange(setnombrePropietarioVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Nombre del Propietario Dos"
                  value={nombrePropietarioDosVal}
                  onChange={handleInputChange(setnombrePropietarioDosVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Genero"
                  type="text"
                  value={generoVal}
                  onChange={handleInputChange(setgeneroVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Edad"
                  type="text"
                  value={edadVal}
                  onChange={handleInputChange(setedadVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Precio del Baño"
                  type="text"
                  value={precioBanoVal}
                  onChange={handleInputChange(setprecioBanoVal)}
                  fullWidth
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                

                <select
 value={idTipoRazaVal}
 onChange={handleInputChange(setidTipoRazaVal)}
  className='form-control'
>
  <option value="">Seleccione un tipo</option>
  {listarazas.map((option) => (
    <option key={option.value} value={option.value}>
      {option.text}
    </option>
  ))}
</select>
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <TextField
                  label="Observaciones"
                  value={observacionVal}
                  onChange={handleInputChange(setobservacionVal)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={8}>
              <SoftBox>
            
              {editMode ?   <img
              src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/Documentosmascotas/${imagen}`} // Concatenamos la URL base de la API
             
              style={{ width: "80px", height: "auto" }}
            /> : ''}
              </SoftBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <SoftBox>
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12}>
              <SoftBox>
                <Button
                sx={{
                  backgroundColor: '#003366', // Azul oscuro por defecto
                  color: '#ffffff', // Letras blancas por defecto
                  border: '2px solid transparent', // Borde transparente por defecto
                  '&:hover': {
                    backgroundColor: '#ffffff', // Fondo blanco al pasar el cursor
                    color: '#003366', // Letras azules al pasar el cursor
                    border: '2px solid #003366' // Borde azul al pasar el cursor
                  }
                }}
                type="submit" variant="contained" color="primary">
                  {editMode ? 'Actualizar Mascota' : 'Registrar Mascota'}
                </Button>
              </SoftBox>
            </Grid>
          </Grid>
        </Box>

        {/* Tabla de Mascotas Registradas */}
        <SoftBox mt={4}>
          <SoftTypography variant="h5" gutterBottom>
            Mascotas Registradas
          </SoftTypography>
          <div className="table-responsive">

          <table className="table table-hover">
            <thead>
              <tr>
              <th>Actualizar</th>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Precio baño</th>
                <th>Telefono</th>
                <th>Telefono secundario</th>
                <th>Nombre propietario</th>
                <th>Nombre propietario secundario</th>
                <th>Genero</th>
                <th>Edad</th>
                <th>Raza</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotasRegistradas.map((mascota) => (
                <tr key={mascota.id}>
                   <td>
                    <Button
                       sx={{
                        backgroundColor: '#ffffff', // Fondo blanco por defecto
                        color: '#003366', // Letras azules por defecto
                        border: '2px solid #003366', // Borde azul por defecto
                        '&:hover': {
                          backgroundColor: '#003366', // Fondo azul oscuro al pasar el cursor
                          color: '#ffffff', // Letras blancas al pasar el cursor
                          border: '2px solid #003366' // Borde azul al pasar el cursor
                        }
                      }}
                    variant="contained" color="primary" onClick={() => handleEdit(mascota.idAnimalInventario)}>Editar</Button>
                  </td>
                  <td>  <img
              src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/Documentosmascotas/${mascota.archivo}`} // Concatenamos la URL base de la API
             
              style={{ width: "80px", height: "auto" }}
            /></td>
              <td>{mascota.nombre}</td>
               <td>{mascota.precioBano}</td>
                
                  <td>{mascota.telefono}</td>
                  <td>{mascota.telefonoDos}</td>
                  <td>{mascota.nombrePropietario}</td>
                  <td>{mascota.nombrePropietarioDos}</td>
                  <td>{mascota.genero}</td>
                  <td>{mascota.edad}</td>
                  <td>{mascota.idTipoRazaInventario}</td>
                  <td>{mascota.observacion}</td>
               
                 
                </tr>
              ))}
            </tbody>
          </table>
          </div>

        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
};

export default MascotaForm;