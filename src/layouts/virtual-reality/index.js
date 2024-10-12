import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel, Modal, Box, Typography } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = process.env.REACT_APP_API_URL;

function ReporteVentas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [articuloSeleccionado, setArticuloSeleccionado] = useState('');

  const [tiposArticulo, setTiposArticulo] = useState([]);

  useEffect(() => {
    // Cargar la lista de tipos de artículo
    fetch(`${baseUrl}/Inventario/GetConsultarListaTipoArticulo`)
      .then(response => response.json())
      .then(data => setTiposArticulo(data))
      .catch(error => setError('Error fetching tipos de artículo'));
  }, []);

  const handleFilter = () => {
    let url = `${baseUrl}/Ventas/GetReporteVentas?`;
    
    if (fechaInicio) {
      url += `fechaInicio=${fechaInicio}&`;
    }
    if (fechaFin) {
      url += `fechaFin=${fechaFin}&`;
    }
    if (articuloSeleccionado) {
      url += `idArticulo=${articuloSeleccionado}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError('Error fetching sales report'));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftTypography variant="h4" fontWeight="medium">
          Reporte de Ventas
        </SoftTypography>
        
        {/* Filtros */}
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Fecha Inicio"
                type="date"
                variant="outlined"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Fecha Fin"
                type="date"
                variant="outlined"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Artículo</InputLabel>
                <Select
                  value={articuloSeleccionado}
                  onChange={(e) => setArticuloSeleccionado(e.target.value)}
                  label="Artículo"
                >
                  {tiposArticulo.map((articulo) => (
                    <MenuItem key={articulo.idArticulo} value={articulo.idArticulo}>
                      {articulo.nombreArticulo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleFilter}>
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </SoftBox>

        {/* Tabla de Reporte de Ventas */}
        <SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className='table-responsive'>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Artículo</th>
                      <th>Cantidad Vendida</th>
                      <th>Precio Unitario</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((venta, index) => (
                        <tr key={index}>
                          <td>{venta.fecha}</td>
                          <td>{venta.nombreArticulo}</td>
                          <td>{venta.cantidadVendida}</td>
                          <td>{venta.precioUnitario}</td>
                          <td>{venta.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
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
    </DashboardLayout>
  );
}

export default ReporteVentas;