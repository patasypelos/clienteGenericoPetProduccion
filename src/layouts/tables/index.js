import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, MenuItem, Modal, Box, Typography, FormControl, InputLabel, Select } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = process.env.REACT_APP_API_URL;

function ArticuloTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los campos de entrada
  const [precio, setPrecio] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState('');
  const [tipoArticulo, setTipoArticulo] = useState('');
  const [tipoMarca, setTipoMarca] = useState('');

  // Estados para las listas de tipo de artículo y tipo de marca
  const [tiposArticulo, setTiposArticulo] = useState([]);
  const [tiposMarca, setTiposMarca] = useState([]);

  const [imagen, setImagen] = useState(null); // Nuevo estado para la imagen


  // Estados para manejar la edición
  const [showModal, setShowModal] = useState(false);
  const [selectedArticulo, setSelectedArticulo] = useState(null);

  useEffect(() => {
    const baseUrll = process.env.REACT_APP_API_URL; // Verifica que esté definida correctamente

    fetch(`${baseUrll}/Inventario/GetConsultarListaArticulos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        setError('Error fetching data');
      });

    // Cargar tipos de artículo
    fetch(`${baseUrl}/Inventario/GetConsultarListaTipoArticulo`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTiposArticulo(data);
      })
      .catch(error => {
        setError('Error fetching tipos de artículo');
      });

    // Cargar tipos de marca
    fetch(`${baseUrl}/Inventario/GetConsultarListaTipoMarca`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTiposMarca(data);
      })
      .catch(error => {
        setError('Error fetching tipos de marca');
      });
  }, []);

  // const handleCreate = () => {


    const handleCreate = () => {
      // Usar FormData para enviar imagen y datos del artículo
      const formData = new FormData();
      formData.append('Precio', precio);
      formData.append('Cantidad', cantidadDisponible);
      formData.append('TipoArticulo', tipoArticulo);
      formData.append('TipoMarca', tipoMarca);
      if (imagen) {
        formData.append('Imagen', imagen); // Añadir la imagen si está seleccionada
      }
  
      fetch(`${baseUrl}/Inventario/PostAgregarArticuloInventario`, {
        method: 'POST',
        body: formData, // Enviar como FormData
      })
      .then(response => {
              if (!response.ok) {
                throw new Error('Error adding new article');
              }
              // After successful POST request, update the table
              return fetch(`${baseUrl}/Inventario/GetConsultarListaArticulos`);
            })
        .then(response => response.json())
        .then(updatedData => {

          setData(updatedData);
          setPrecio('');
          setCantidadDisponible('');
          setTipoArticulo('');
          setTipoMarca('');
          setImagen(''); // Limpiar el input de la imagen
        })
        .catch(error => setError('Error adding new article'));
    };
  
    const handleFileChange = (e) => {
      setImagen(e.target.files[0]); // Guardar el archivo seleccionado
    };






  //   const newArticulo = {
      
  //     TipoArticulo: tipoArticulo,
  //     TipoMarca: tipoMarca,
  //     Cantidad: cantidadDisponible,
  //     Precio: precio
  //   };

  //   fetch(`${baseUrl}/Inventario/PostAgregarArticuloInventario`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newArticulo),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Error adding new article');
  //       }
  //       // After successful POST request, update the table
  //       return fetch(`${baseUrl}/Inventario/GetConsultarListaArticulos`);
  //     })
  //     .then(response => response.json())
  //     .then(updatedData => {

  //       setData(updatedData);
  //       setPrecio('');
  //       setCantidadDisponible('');
  //       setTipoArticulo('');
  //       setTipoMarca('');
  //     })
  //     .catch(error => {

  //       setError('Error adding new article');
  //     });
  // };

  const handleEditClick = (idArticulo) => {
    fetch(`${baseUrl}/Inventario/GetConsultarArticuloPorId?idArticulo=${idArticulo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching articulo data');
        }
        return response.json();
      })
      .then(data => {
        setSelectedArticulo(data);
        setShowModal(true);
      })
      .catch(error => {
        setError('Error fetching articulo data');
      });
  };

  const handleSave = () => {
    fetch(`${baseUrl}/Inventario/PutActualizarArticuloInventario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedArticulo),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating article');
        }
        setShowModal(false);
        return fetch(`${baseUrl}/Inventario/GetConsultarListaArticulos`);
      })
      .then(response => response.json())
      .then(updatedData => {
        setData(updatedData);
      })
      .catch(error => {
        setError('Error updating article');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedArticulo({
      ...selectedArticulo,
      [name]: value,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SoftTypography variant="h4" fontWeight="medium">
                Crear Nuevo Artículo
              </SoftTypography>
              <SoftBox display="flex" flexWrap="wrap" mt={3}>
                <TextField
                  label="Precio"
                  variant="outlined"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                />
                <TextField
                  label="CANTIDAD DISPONIBLE"
                  variant="outlined"
                  value={cantidadDisponible}
                  onChange={(e) => setCantidadDisponible(e.target.value)}
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                />
                <FormControl variant="outlined" style={{ marginRight: '10px', marginBottom: '10px', width: '150px' }}>
                  <InputLabel>TIPO ARTICULO</InputLabel>
                  <Select
                    value={tipoArticulo}
                    onChange={(e) => setTipoArticulo(e.target.value)}
                    label="TIPO ARTICULO"
                  >
                    {tiposArticulo.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ marginRight: '10px', marginBottom: '10px', width: '150px' }}>
                  <InputLabel>TIPO MARCA</InputLabel>
                  <Select
                    value={tipoMarca}
                    onChange={(e) => setTipoMarca(e.target.value)}
                    label="TIPO MARCA"
                  >
                    {tiposMarca.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: '10px' }}
                />
                <Button variant="contained" 
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
                 onClick={handleCreate} >
                  Crear
                </Button>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Lista de Artículos</h2>
              <div className='table-responsive'>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Número</th>
                      <th>Precio</th>
                      <th>Cantidad Disponible</th>
                      <th>Tipo Artículo</th>
                      <th>Tipo Marca</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td> <img
              src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/DocumentosArticulos/${item.archivoImagen}`} // Concatenamos la URL base de la API
             
              style={{ width: "80px", height: "auto" }}
            /></td>
                          <td>{item.idArticulo}</td>
                          <td>{item.precio}</td>
                          <td>{item.cantidadDisponible}</td>
                          <td>{item.tipoArticulo}</td>
                          <td>{item.tipoMarca}</td>
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
                 onClic onClick={() => handleEditClick(item.idArticulo)}>
                              Editar
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                          No hay datos disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />

      {selectedArticulo && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box sx={{ ...modalStyle }}>
            <Typography variant="h6" component="h2">
              Editar Artículo
            </Typography>
            <TextField
              label="Precio"
              name="precio"
              value={selectedArticulo.precio || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
  label="Cantidad Disponible"
  variant="outlined"
  name="cantidadDisponible"
  value={selectedArticulo.cantidadDisponible || ''}
  onChange={handleChange}
  fullWidth
  margin="normal"
  
/>
            <TextField
              label="Tipo articulo"
              variant="outlined"
              name="tipoArrt"
              value={selectedArticulo.tipoArticulo || ''}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Tipo marca"
              variant="outlined"
              name="tipoMar"
              value={selectedArticulo.tipoMarca || ''}
              fullWidth
              margin="normal"
              disabled
            />
           
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
                 onClic onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Modal>
      )}
    </DashboardLayout>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ArticuloTable;
