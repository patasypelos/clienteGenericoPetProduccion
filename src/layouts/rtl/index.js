import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, Modal } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';


const MascotaForm = () => {
  const baseUrll = process.env.REACT_APP_API_URL;
  const [NombreVal, setNombreVal] = useState('');
  const [TelefonoVal, setTelefonoVal] = useState('');
  const [telefonodosVal, settelefonodosVal] = useState('');
  const [nombrePropietarioVal, setnombrePropietarioVal] = useState('');
  const [nombrePropietarioDosVsal, setnombrePropietarioDosVsal] = useState('');
  const [generoVal, setgeneroVal] = useState('');
  const [edadVal, setedadVal] = useState('');
  const [precioBanoVal, setprecioBanoVal] = useState('');
  const [idTipoRazaVal, setidTipoRazaVal] = useState('');
  const [observacionVal, setobservacionVal] = useState('');
  const [seleccionarMascota, setseleccionarMascota] = useState(null);

  
  const [showModal, setShowModal] = useState(false);


  const [tipoRaza, setTipoRaza] = useState([]);
  const [mascotasRegistradas, setMascotasRegistradas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [mascotaId, setMascotaId] = useState(null);
  const [imagen, setImagen] = useState(null); // Nuevo estado para la imagen

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





  // Manejar registro de nueva mascota
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('IdAnimalInventario', 0);
    formData.append('Nombre', NombreVal);
    formData.append('Telefono', TelefonoVal);
    formData.append('TelefonoDos', telefonodosVal);
    formData.append('NombrePropietario', nombrePropietarioVal);
    formData.append('NombrePropietarioDos', nombrePropietarioDosVsal);
    formData.append('Genero', generoVal);
    formData.append('Edad', edadVal);
    formData.append('PrecioBano', precioBanoVal);
    formData.append('IdTipoRazaInventario', idTipoRazaVal);
    formData.append('Observacion', observacionVal);
    if (imagen) {
      formData.append('imagen', imagen); // Añadir la imagen si está seleccionada
    }
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/PostregistrarMascota`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {

        fetchMascotasRegistradas();
       
      })
      .catch((error) => console.error('Error al registrar la mascota:', error));
  };

  const handleFileChangeMascota = (e) => {
    setImagen(e.target.files[0]); // Guardar el archivo seleccionado
  };

  // Manejar edición de mascota
  const handleEdit = (id) => {
    fetch(`${baseUrll}/RegistrarUsuariosMascotas/GetConsultarMascotaRegistradasID?idMascota=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setseleccionarMascota(data);
        setShowModal(true);
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
      body: JSON.stringify(seleccionarMascota),
    })
      .then(() => {
        fetchMascotasRegistradas();
        setEditMode(false);
        setMascotaId(null);
      })
      .catch((error) => console.error('Error al actualizar la mascota:', error));
  };




  const handleChangeSS = (e) => {
    const { name, value } = e.target;
    setseleccionarMascota((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
    <SoftBox p={1}>
      <SoftTypography variant="h4" gutterBottom>
        {editMode ? 'Editar Mascota' : 'Registrar Mascota'}
      </SoftTypography>
      <Box component="form" onSubmit={editMode ? handleUpdate : handleSubmit}>
  <Grid container spacing={2}>
    {/* Nombre */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Nombre"
          name="nombre"
          value={NombreVal}
          className="form-control"
          onChange={(e) => setNombreVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Telefono */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Telefono"
          name="telefono"
          value={TelefonoVal}
          className="form-control"
          onChange={(e) => setTelefonoVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Telefono dos */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Telefono dos"
          name="telefonoDos"
          value={telefonodosVal}
          className="form-control"
          onChange={(e) => settelefonodosVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Nombre Propietario */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Nombre propietario"
          name="nombrePropietario"
          value={nombrePropietarioVal}
          className="form-control"
          onChange={(e) => setnombrePropietarioVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Nombre Propietario Dos */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Nombre propietario dos"
          name="nombrePropietarioDos"
          value={nombrePropietarioDosVsal}
          className="form-control"
          onChange={(e) => setnombrePropietarioDosVsal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Genero */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Género"
          name="genero"
          value={generoVal}
          className="form-control"
          onChange={(e) => setgeneroVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Edad mascota */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Edad mascota"
          name="edad"
          value={edadVal}
          className="form-control"
          onChange={(e) => setedadVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Precio baño */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          type="number"
          placeholder="Precio baño"
          name="precioBano"
          value={precioBanoVal}
          className="form-control"
          onChange={(e) => setprecioBanoVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Tipo Raza */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <select
          value={idTipoRazaVal}
          onChange={(e) => setidTipoRazaVal(e.target.value)}
          className="form-control"
        >
          <option value="">Seleccione un raza</option>
          {tipoRaza.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </SoftBox>
    </Grid>
    
    {/* Observación */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          placeholder="Observación"
          name="observacion"
          value={observacionVal}
          className="form-control"
          onChange={(e) => setobservacionVal(e.target.value)}
        />
      </SoftBox>
    </Grid>
    
    {/* Imagen */}
    <Grid item xs={12} md={4}>
      <SoftBox>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChangeMascota}
          style={{ marginBottom: '10px' }}
        />
      </SoftBox>
    </Grid>
    
    {/* Botón Crear */}
    <Grid item xs={12} md={12}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#003366',
          color: '#ffffff',
          border: '2px solid transparent',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#003366',
            border: '2px solid #003366',
          },
        }}
        onClick={handleSubmit}
      >
        Crear
      </Button>
    </Grid>
  </Grid>
</Box>

      <SoftTypography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Mascotas Registradas
      </SoftTypography>
      <Box>
        <table className="table">
          <thead>
            <tr>
              <th>Foto</th>
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
              <td> <img
              src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/Documentosmascotas/${mascota.archivo}`} // Concatenamos la URL base de la API
             
              style={{ width: "80px", height: "auto" }}
            /></td>
              <td>{mascota.nombre}</td>
              <td>{mascota.nombrePropietario}</td>
              <td>{mascota.telefono}</td>
              <td>{mascota.genero}</td>
              <td>{mascota.edad}</td>
              <td>
                            <Button variant="contained"  
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
                 onClic onClick={() => handleEdit(mascota.idAnimalInventario)}>
                              Editar
                            </Button>
                          </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Box>

      </SoftBox>
      
      {seleccionarMascota && (
  <Modal open={showModal} onClose={() => setShowModal(false)}>
    <Box sx={{ ...modalStyle }}>
      <Typography variant="h6" component="h2">
        Editar mascota
      </Typography>

      {/* Contenedor con grid de 12 columnas */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
        {/* Cada campo ocupará 4 espacios (o columnas) */}
        <TextField
          label="Nombre"
          name="precio"
          value={seleccionarMascota.nombre || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="telefono"
          variant="outlined"
          name="cantidadDisponible"
          value={seleccionarMascota.telefono || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Telefono dos"
          variant="outlined"
          name="cantidadDisponible"
          value={seleccionarMascota.telefonoDos || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Nombre propietario"
          variant="outlined"
          name="tipoArrt"
          value={seleccionarMascota.nombrePropietario || ''}
          onChange={handleChangeSS}

          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Nombre propietario dos"
          variant="outlined"
          name="tipoMar"
          value={seleccionarMascota.nombrePropietarioDos || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Genero"
          variant="outlined"
          name="tipoMar"
          value={seleccionarMascota.genero || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Edad"
          variant="outlined"
          name="tipoMar"
          value={seleccionarMascota.edad || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Precio baño"
          variant="outlined"
          name="tipoMar"
          value={seleccionarMascota.precioBano || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 4' }} // Ocupar 4 espacios
        />
        <TextField
          label="Observación"
          variant="outlined"
          name="tipoMar"
          value={seleccionarMascota.observacion || ''}
          onChange={handleChangeSS}
          fullWidth
          margin="normal"
          sx={{ gridColumn: 'span 12' }} // Ocupar todo el ancho
        />
      </Box>

      {/* Imagen */}
      <img
        src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/Documentosmascotas/${seleccionarMascota.archivo}`}
        style={{ width: '80px', height: 'auto', marginTop: '16px' }}
        alt="Imagen de la mascota"
      />

      {/* Botón Guardar */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ffffff',
          color: '#003366',
          border: '2px solid #003366',
          '&:hover': {
            backgroundColor: '#003366',
            color: '#ffffff',
            border: '2px solid #003366',
          },
          marginTop: '16px',
        }}
        onClick={handleUpdate}
      >
        Guardar
      </Button>
    </Box>
  </Modal>
)}
       </DashboardLayout>
    );
};
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,  // Aumenta el ancho para que quepan tres campos
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default MascotaForm;