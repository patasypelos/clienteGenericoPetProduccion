import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const baseUrl = process.env.REACT_APP_API_URL;

function MarcaYArticuloForm() {
  // Estados para los campos de entrada de Marca
  const [nombreMarca, setNombreMarca] = useState('');
  const [descripcionMarca, setDescripcionMarca] = useState('');

  // Estados para los campos de entrada de Tipo Artículo
  const [nombreTipoArticulo, setNombreTipoArticulo] = useState('');
  const [descripcionTipoArticulo, setDescripcionTipoArticulo] = useState('');

  // Estados para el manejo del Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Función para manejar la creación de Marca
  const handleCreateMarca = () => {
    const nuevaMarca = {
      nombreMarca: nombreMarca,
      descripcionMarca: descripcionMarca,
    };

    fetch(`${baseUrl}/Inventario/PostCrearMarcaInventario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaMarca),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error creating brand');
        }
        return response.json();
      })
      .then(() => {
        setNombreMarca('');
        setDescripcionMarca('');
        setSnackbarMessage('Marca creada con éxito');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setNombreMarca('');
        setDescripcionMarca('');
        setSnackbarMessage('Marca creada con éxito');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      });
  };

  // Función para manejar la creación de Tipo Artículo
  const handleCreateTipoArticulo = () => {
    const nuevoTipoArticulo = {
      nombreArticulo: nombreTipoArticulo,
      descripcionArticulo: descripcionTipoArticulo,
    };

    fetch(`${baseUrl}/Inventario/PostCrearTipoArticuloInventario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoTipoArticulo),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error creating article type');
        }
        return response.json();
      })
      .then(() => {
        setNombreTipoArticulo('');
        setDescripcionTipoArticulo('');
        setSnackbarMessage('Tipo de artículo creado con éxito');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setNombreTipoArticulo('');
        setDescripcionTipoArticulo('');
        setSnackbarMessage('Tipo de artículo creado con éxito');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <SoftBox py={3}>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <SoftTypography variant="h4" fontWeight="medium" gutterBottom>
                Crear Marca
              </SoftTypography>
              <SoftBox mb={2}>
                <TextField
                  label="Nombre de la Marca"
                  variant="outlined"
                  fullWidth
                  value={nombreMarca}
                  onChange={(e) => setNombreMarca(e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
                <TextField
                  label="Descripción de la Marca"
                  variant="outlined"
                  fullWidth
                  value={descripcionMarca}
                  onChange={(e) => setDescripcionMarca(e.target.value)}
                />
              </SoftBox>
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
                onClick={handleCreateMarca}
              >
                Crear Marca
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <SoftTypography variant="h4" fontWeight="medium" gutterBottom>
                Crear Tipo de Artículo
              </SoftTypography>
              <SoftBox mb={2}>
                <TextField
                  label="Nombre del Tipo de Artículo"
                  variant="outlined"
                  fullWidth
                  value={nombreTipoArticulo}
                  onChange={(e) => setNombreTipoArticulo(e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
                <TextField
                  label="Descripción del Tipo de Artículo"
                  variant="outlined"
                  fullWidth
                  value={descripcionTipoArticulo}
                  onChange={(e) => setDescripcionTipoArticulo(e.target.value)}
                />
              </SoftBox>
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
                onClick={handleCreateTipoArticulo}
              >
                Crear Tipo de Artículo
              </Button>
            </Paper>
          </Grid>
        </Grid>
       
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MarcaYArticuloForm;