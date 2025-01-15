import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Billing() {
  const [formData, setFormData] = useState({
    tipoPurina: "",
    tipoArticulo: "",
    tipoBanio: "",
    precio: "",
    mascota: "",
  });



  const [articulos, setArticulos] = useState([]);
  const [articulosTabla, setArticulosTabla] = useState([]);
  const [articulosTablaEnviar, setArticulosTablaEnviar] = useState([]);
  const [banios, setBanios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [arfticuloSeleccionado, setArticuloSeleccionado] = useState([]);
  const [animalSeleccionadoInfo, setanimalSeleccionadoInfo] = useState([]);
  const [purinas, setPurinas] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(''); // Para mostrar el mensaje de venta registrada

  

  const baseUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
   
    $('#tipoPurina').select2();
    $('#articuloSelect').select2();
    $('#bañoSelect').select2();
    $('#mascotaSelect').select2();

    fetch(`${baseUrl}/VentasController/GetConsultarListaPurinas`)
      .then(response => response.json())
      .then(data => setPurinas(data))
      .catch(error => setError('Error al consultar la lista de purinas'));

    fetch(`${baseUrl}/VentasController/GetConsultarListaAccesoriosMedicamentos`)
      .then(response => response.json())
      .then(data => setArticulos(data))
      .catch(error => setError('Error al consultar la lista de artículos'));

    fetch(`${baseUrl}/VentasController/GetConsultarListaTipoBaño`)
      .then(response => response.json())
      .then(data => setBanios(data))
      .catch(error => setError('Error al consultar la lista de baños'));

    fetch(`${baseUrl}/VentasController/GetConsultarListaAnimales`)
      .then(response => response.json())
      .then(data => setMascotas(data))
      .catch(error => setError('Error al consultar la lista de mascotas'));
  }, []);

  useEffect(() => {
    // Sumar los precios cada vez que cambien los artículos en la tabla
    const total = articulosTabla.reduce((acc, item) => acc + parseFloat(item.precio || 0), 0);
    setTotalVenta(total);
  }, [articulosTabla]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,  // Updates the correct field in formData based on the input's name attribute
    });
    // Optionally trigger the select handler when an input changes
    handleSelectArticulo(value,name);
  

  };

  const handleSelectArticulo = (value,name) => {
    
    if (value != '' && (name === "tipoArticulo" || name === "tipoPurina") ) {
      fetch(`${baseUrl}/VentasController/GetConsultarArticuloPorId?idArticulo=${value}`)
        .then(response => response.json())
        .then(data => setArticuloSeleccionado(data))
        .catch(error => setError('Error al consultar la lista de mascotas'));
        setanimalSeleccionadoInfo([]);
    }
    else if (value != '' && (name === "mascota") ) {
      fetch(`${baseUrl}/RegistrarUsuariosMascotas/GetConsultarMascotaPorId?idmascota=${value}`)
      .then(response => response.json())
      .then(data => setanimalSeleccionadoInfo(data))
      .catch(error => setError('Error al consultar la lista de mascotas'));
      setArticuloSeleccionado([]);
    }
  };


  const handleAddArticulo = () => {
    debugger;
    console.log("Valor del select directamente:", document.querySelector("select[name='tipoPurina']").value);

//original

    const purinaSeleccionada = purinas.find(p => p.value === formData.tipoPurina)?.text || '';
    const articuloSeleccionado = articulos.find(a => a.value === formData.tipoArticulo)?.text || '';
    const banioSeleccionado = banios.find(b => b.value === formData.tipoBanio)?.text || '';
    const mascotaSeleccionada = mascotas.find(m => m.value === formData.mascota)?.text || '';
    const purinaSeleccionadaEnviar = purinas.find(p => p.value === formData.tipoPurina)?.value || '';
    const articuloSeleccionadoEnviar = articulos.find(a => a.value === formData.tipoArticulo)?.value || '';
    const banioSeleccionadoEnviar = banios.find(b => b.value === formData.tipoBanio)?.value || '';
    const mascotaSeleccionadaEnviar = mascotas.find(m => m.value === formData.mascota)?.value || '';

    setArticulosTabla([...articulosTabla, {
      tipoPurina: purinaSeleccionada,
      tipoArticulo: articuloSeleccionado,
      tipoBanio: banioSeleccionado,
      precio: formData.precio,
      mascota: mascotaSeleccionada,
    }]);

    setArticulosTablaEnviar([...articulosTablaEnviar, {
      tipoPurina: purinaSeleccionadaEnviar,
      tipoAccesorio: articuloSeleccionadoEnviar,
      tipoBano: banioSeleccionadoEnviar,
      precio: formData.precio,
      animal: mascotaSeleccionadaEnviar,
      code: purinaSeleccionadaEnviar !== "" 
      ? "PURINA" 
      : articuloSeleccionadoEnviar !== "" 
        ? "ACCESORIO" 
        : banioSeleccionadoEnviar !== "" 
          ? "BAÑO" 
          : ""    }]);

    setFormData({ tipoPurina: "", tipoArticulo: "", tipoBanio: "", precio: "", mascota: "" });
  };

  const handleDelete = (index) => {
    setArticulosTabla((prevArticulos) => prevArticulos.filter((_, i) => i !== index));
    setArticulosTablaEnviar((prevArticulosA) => prevArticulosA.filter((_, i) => i !== index));
  };

  const handleRegisterSale = () => {
   


    
    fetch(`${baseUrl}/VentasController/PostregistrarVenta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Asegura que el contenido es JSON
    },
    body: JSON.stringify(articulosTablaEnviar),
    })
    .then(response => {
            if (!response.ok) {
              throw new Error('Error adding new article');
            }

          })
      .then(updatedData => {

          // Limpiar la lista de artículos y el artículo seleccionado
        setArticuloSeleccionado([]);
        setArticulosTablaEnviar([]);
        setArticulosTabla([]);

      // Mostrar mensaje de venta registrada
      setMensaje('Venta registrada con éxito');
      })
      .catch(error => setError('Error adding new article'));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox>
              <SoftTypography variant="h6">Registrar Artículo</SoftTypography>
              <select
                className="form-select"
                name="tipoPurina"
                id="tipoPurina"
                value={formData.tipoPurina}
                // onChange={handleInputChange}
                onChange={(e) => {
                  console.log("Evento onChange:", e.target.name, e.target.value);
                  handleInputChange(e);
                }}
              >
                <option value="">Seleccione una purina</option>
                {purinas.map((purina) => (
                  <option key={purina.value} value={purina.value}>
                    {purina.text}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <select
                className="form-select"
                name="tipoArticulo"
                value={formData.tipoArticulo}
                onChange={handleInputChange}
              >
                <option value="">Seleccione artículo o medicamento</option>
                {articulos.map((articulo) => (
                  <option key={articulo.value} value={articulo.value}>
                    {articulo.text}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <select
                className="form-select"
                name="tipoBanio"
                value={formData.tipoBanio}
                onChange={handleInputChange}
              >
                <option value="">Seleccione tipo de baño</option>
                {banios.map((banio) => (
                  <option key={banio.value} value={banio.value}>
                    {banio.text}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Precio"
                  name="precio"
                  value={formData.precio}
                  required
                  onChange={handleInputChange}
                />
              </SoftBox>
              <select
                className="form-select"
                name="mascota"
                value={formData.mascota}
                onChange={handleInputChange}
              >
                <option value="">Seleccione mascota</option>
                {mascotas.map((mascota) => (
                  <option key={mascota.value} value={mascota.value}>
                    {mascota.text}
                  </option>
                ))}
              </select>
              <br />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
  <SoftBox
    sx={{
      border: "2px solid #007BFF", // Marco azul
      borderRadius: "8px", // Bordes redondeados
      padding: "20px", // Espaciado interior
      textAlign: "center", // Centrar el texto
      boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.2)", // Sombra sutil
      backgroundColor: "#f9f9f9", // Color de fondo suave
      width: "600px", // Ancho del cuadro
      height: "370px", // Altura del cuadro
    }}
  >
    <SoftTypography variant="h6" color="black">
      Información general
    </SoftTypography>
    {arfticuloSeleccionado.tipoMarca ? (
  <div className="row">
    <SoftBox className="col-12 col-md-6">
      <img
        src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/DocumentosArticulos/${arfticuloSeleccionado.archivoImagen}`}
        alt="Imagen del artículo"
        style={{ width: "100%", height: "310px", objectFit: "cover", borderRadius: "8px" }} // Imagen con borde redondeado y ocupa el ancho completo de la columna
      />
    </SoftBox>
    <SoftBox className="col-12 col-md-6">
    <br />
      <br />
      <SoftTypography variant="body2" sx={{ marginTop: "10px" }}>
        <strong>Nombre:</strong> {arfticuloSeleccionado.tipoMarca}
      </SoftTypography>
      <SoftTypography variant="body2" sx={{ marginTop: "10px" }}>
        <strong>Cantidad disponible:</strong> {arfticuloSeleccionado.cantidadDisponible}
      </SoftTypography>
      <SoftTypography variant="body2" sx={{ marginTop: "10px" }}>
        <strong>Precio:</strong> {arfticuloSeleccionado.precio}
      </SoftTypography>
    </SoftBox>
  </div>
) : (
  <SoftTypography variant="body2">Selecciona un artículo o una mascota</SoftTypography>
)}
  
  {animalSeleccionadoInfo.nombre ? (
  <div className="row">
    <SoftBox className="col-12 col-md-6">
      <img
        src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/Documentosmascotas/${animalSeleccionadoInfo.archivoImagen}`}
        alt="Imagen del artículo"
        style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "8px" }} // Imagen con borde redondeado y ocupa el ancho completo de la columna
      />
    </SoftBox>
    <SoftBox className="col-12 col-md-6">
      <br />
      <br />
      <SoftTypography variant="body2" sx={{ marginTop: "5px" }}>
        <strong>Nombre:</strong> {animalSeleccionadoInfo.nombre}
      </SoftTypography>
      <SoftTypography variant="body2" sx={{ marginTop: "5px" }}>
        <strong>Nombre propietario:</strong> {animalSeleccionadoInfo.nombrePropietario}
      </SoftTypography>
      <SoftTypography variant="body2" sx={{ marginTop: "5px" }}>
        <strong>Precio:</strong> {animalSeleccionadoInfo.precioBano}
      </SoftTypography>
      <SoftTypography variant="body2" sx={{ marginTop: "5px" }}>
        <strong>Observación:</strong> {animalSeleccionadoInfo.observacion}
      </SoftTypography>
    </SoftBox>
  </div>
) : ("")}
    
  </SoftBox>
</Grid>
        </Grid>
        <SoftBox mt={4} display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="gradient" color="info" 
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
              onClick={handleAddArticulo}>
                Agregar Artículo
              </Button>
              Total de la venta: {totalVenta.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              <Button variant="gradient" color="success"
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
        onClick={handleRegisterSale}>
          Registrar Venta
        </Button>
      </SoftBox>
      </SoftBox>
      <br />
       <div>
    {mensaje && <div style={{ color: 'green' }}>{mensaje}</div>}
  </div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Tipo purina</th>
            <th>Tipo Artículo</th>
            <th>Tipo baño</th>
            <th>Precio</th>
            <th>Mascota</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {articulosTabla.length > 0 ? (
            articulosTabla.map((item, index) => (
              <tr key={index}>
                <td>{item.tipoPurina}</td>
                <td>{item.tipoArticulo}</td>
                <td>{item.tipoBanio}</td>
                <td>{Number(item.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>{item.mascota}</td>
                <td>
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
                  onClick={() => handleDelete(index)} color="error">
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay artículos agregados.</td>
            </tr>
          )}
        </tbody>
      </table>

    

      <Footer />
    </DashboardLayout>
  );
}

export default Billing;