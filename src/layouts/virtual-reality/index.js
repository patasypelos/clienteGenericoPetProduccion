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
  const [totalPrecioPurina, setTotalPrecioPurina] = useState(0);
  const [totalPrecioAccesorio, setTotalPrecioAccesorio] = useState(0);
    const [tiposArticulo, setTiposArticulo] = useState([]);

  useEffect(() => {
    // Cargar la lista de tipos de artículo
    fetch(`${baseUrl}/Inventario/GetConsultarListaTipoMarca`)
      .then(response => response.json())
      .then(data => setTiposArticulo(data))
      .catch(error => setError('Error fetching tipos de artículo'));
  }, []);

  const handleFilter = () => {
    debugger;
    let url = `${baseUrl}/VentasController/GetConsultarVentas?fechaInici=${fechaInicio}&fechaFin=${fechaFin}&idArticulo=${articuloSeleccionado}`;
    


    fetch(url)
    .then(response => response.json())
    .then(data => {
      setData(data);

          // Calculate total price for PURINA and ACCESORIO separately
          const totalPurina = data
          .filter(venta => venta.nombreTipoArticulo === 'PURINA')
          .reduce((total, venta) => total + venta.precio, 0);

        const totalAccesorio = data
          .filter(venta => venta.nombreTipoArticulo === 'ACCESORIO')
          .reduce((total, venta) => total + venta.precio, 0);

        setTotalPrecioPurina(totalPurina);
        setTotalPrecioAccesorio(totalAccesorio);
    })
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
           
                 <input
                 label="Fecha Inicio"
                type="date"
                  placeholder="PRECIO"
                  name="precioArti"
                  value={fechaInicio}
                  className='form-control'

                  onChange={(e) => setFechaInicio(e.target.value)}
                  />
            </Grid>
            <Grid item xs={12} md={4}>
            
                  <input
                  label="Fecha Inicio"
                  type="date"
                  className='form-control'
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
              


                <select
  value={articuloSeleccionado}
  onChange={(e) => setArticuloSeleccionado(e.target.value)}
  className='form-control'
>
  <option value="">Seleccione un tipo</option>
  {tiposArticulo.map((option) => (
    <option key={option.value} value={option.value}>
      {option.text}
    </option>
  ))}
</select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
              variant="contained" onClick={handleFilter}>
                Filtrar
              </Button>
            </Grid>
          </Grid>
        </SoftBox>
      
        <SoftBox>
        <Grid  item xs={12} md={4}>
          Total PURINA: {totalPrecioPurina.toFixed(0)}
        </Grid>
        <Grid  item xs={12} md={4}>
          Total ACCESORIO: {totalPrecioAccesorio.toFixed(0)}
        </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className='table-responsive'>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Tipo articulo</th>
                      <th>Nombre</th>
                      <th>Precio venta</th>
                      <th>Fecha registra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((venta, index) => (
                        <tr key={index}>
                          <td>{venta.idIngresaVenta}</td>
                          <td>{venta.nombreTipoArticulo}</td>
                          <td>{venta.nombreArticulo}</td>
                          <td>{venta.precio}</td>
                          <td>{new Date(venta.fechaCreacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
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